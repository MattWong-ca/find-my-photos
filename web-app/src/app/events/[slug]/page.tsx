'use client'

import { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BrowserProvider, JsonRpcProvider, Contract } from "ethers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Loader2, Download } from "lucide-react"
import Webcam from "react-webcam"

// const CONTRACT_ADDRESS = "0xf46E84BDA472F1C9bA77017cCc97FD7a710A872e" // "0x16C31f51D2648f5942DeC7d779369aA09A72d827" // PhotoFinder2 address
const CONTRACT_ADDRESS = "0x16C31f51D2648f5942DeC7d779369aA09A72d827"

interface FaceMatch {
  Face: {
    FaceId: string
    ExternalImageId: string
  }
  Similarity: number
}

interface SearchResults {
  FaceMatches: FaceMatch[]
}

export default function EventPage() {
  const params = useParams()
  const [eventName, setEventName] = useState('')
  const [eventYear, setEventYear] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [isNFTHolder, setIsNFTHolder] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  const checkNFTHolder = async (address: string) => {
    try {
      // Check if it's the whitelisted address
      if (address.toLowerCase() === '0xB68918211aD90462FbCf75b77a30bF76515422CE'.toLowerCase()) {
        console.log(`${address} is whitelisted`)
        setIsNFTHolder(true)
        return
      }

      const provider = new JsonRpcProvider('https://mainnet.optimism.io')
      // List of NFT contracts to check
      const contracts = [
        {
          address: '0x69B4e2BD6D5c5eeeB7E152FB9bc9b6c4364fA410',
          name: 'Pioneer Pack'
        },
        {
          address: '0xe600A7AD9B86A2D949069A6092b7b5a1Dae50e20',
          name: 'Builder Pack'
        },
        {
          address: '0x32382a82d9faDc55f971f33DaEeE5841cfbADbE0',
          name: 'Hacker Pack'
        },
        {
          address: '0x5CF3C75E0036f76bB7BE1815F641DDd57Fd54feb',
          name: 'Supporter Pack'
        },
        {
          address: '0x27479dd41a85002F5987B8C7E999ca0e07Dba817',
          name: 'Partner Pack'
        },
        {
          address: '0x37C6fe4049c95f80e18C9cDDaA8481742456520B',
          name: 'OG Pack'
        }
      ]

      const abi = ['function balanceOf(address owner) view returns (uint256)']

      // Check all contracts
      for (const contract of contracts) {
        const nftContract = new Contract(contract.address, abi, provider)
        const balance = await nftContract.balanceOf(address)

        if (Number(balance) > 0) {
          console.log(`${address} is a ${contract.name} holder`)
          setIsNFTHolder(true)
          return // Exit early if we find any valid NFT
        }
      }

      // If we get here, no NFTs were found
      console.log(`${address} is not a holder of any eligible NFTs`)
      setIsNFTHolder(false)
    } catch (error) {
      console.error('Error checking NFT balances:', error)
      setIsNFTHolder(false)
    }
  }

  useEffect(() => {
    if (params?.slug) {
      const [city, year] = (params.slug as string).split('-')
      setEventName(city.toLowerCase() === 'sf' ? 'SF' : city.charAt(0).toUpperCase() + city.slice(1))
      setEventYear(year)
    }
  }, [params])

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        try {
          const signer = await provider.getSigner()
          const address = await signer.getAddress()
          await checkNFTHolder(address)
        } catch (error) {
          console.error('No wallet connected:', error)
        }
      }
    }

    checkWallet()

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
          await checkNFTHolder(accounts[0])
        } else {
          setIsNFTHolder(false)
        }
      })
    }

    return () => {
      // Cleanup listener
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => { })
      }
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setPreview(imageSrc)
      // Create a dummy file from the base64 string
      const dummyFile = new File([imageSrc], 'webcam-capture.jpg', { type: 'image/jpeg' })
      setSelectedImage(dummyFile)
    }
  }, [])

  const handleSearch = async () => {
    if (!selectedImage) return

    setLoading(true)
    try {
      const base64Image = preview.split(',')[1]
      const response = await fetch('/api/faces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'search',
          collectionId: `${eventName.toLowerCase()}-${eventYear}`,
          image: base64Image,
        }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    setLoading(true)
    try {
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(CONTRACT_ADDRESS, [
        "function payForSearch() public payable"
      ], signer)

      // Make payment based on NFT holder status
      const tx = await contract.payForSearch({
        value: isNFTHolder ?
          BigInt("10000000000000000") // 0.01 ETH for NFT holders
          : BigInt("1000000000000000000") // 1 ETH for non-holders
      })

      // Wait for payment confirmation
      await tx.wait()
      setHasPaid(true)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Error processing payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (imageId: string) => {
    try {
      const response = await fetch(`https://live.staticflickr.com/65535/${imageId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ethglobal-${eventName}-${eventYear}-${imageId}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const handleDownloadAll = async () => {
    if (!results?.FaceMatches) return
    setLoading(true)
    try {
      for (const match of results.FaceMatches) {
        await handleDownload(match.Face.ExternalImageId)
        // Small delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.error('Error downloading all images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    const tweetText = `Just found my @ethglobal ${eventName} photos using FindMyPhotos(.)app! 📸\n\n<PASTE DOWNLOADED PHOTO HERE>`
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, '_blank')
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Photos</h1>
            <p className="text-gray-600 mb-2">
              Upload your photo to find yourself in pictures from ETHGlobal {eventName} {eventYear}
            </p>
            <p className="text-gray-600 mb-8">
              {isNFTHolder ? (
                <span>
                  <span className="line-through">1 ETH</span>{" "}
                  <span className="text-green-600 font-bold">0.01 ETH</span> (Pack Holder Discount!)
                </span>
              ) : (
                <span>Price: 1 ETH</span>
              )}
            </p>

            {!hasPaid ? (
              <Button
                size="lg"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay to Search'
                )}
              </Button>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="upload" className="w-full max-w-md mx-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Camera
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <div className="flex flex-col items-center gap-4">
                      {!preview ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload">
                            <Button size="lg" asChild>
                              <span>Choose Photo</span>
                            </Button>
                          </label>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative w-64 h-64 mx-auto">
                            <Image
                              src={preview}
                              alt="Preview"
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setPreview('')
                                setSelectedImage(null)
                                setResults(null)
                              }}
                            >
                              Retake
                            </Button>
                            <Button
                              onClick={handleSearch}
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Searching...
                                </>
                              ) : (
                                'Find Photos'
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="camera" className="mt-4">
                    <div className="flex flex-col items-center gap-4">
                      {!preview ? (
                        <div className="space-y-4">
                          <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-64 h-64 rounded-lg border"
                            mirrored={true}
                          />
                          <Button size="lg" onClick={handleCapture}>
                            Take Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative w-64 h-64 mx-auto">
                            <Image
                              src={preview}
                              alt="Preview"
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setPreview('')
                                setSelectedImage(null)
                                setResults(null)
                              }}
                            >
                              Retake
                            </Button>
                            <Button
                              onClick={handleSearch}
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Searching...
                                </>
                              ) : (
                                'Find Photos'
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {results && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold">Found Photos</h2>
                      <Button
                        onClick={handleDownloadAll}
                        disabled={loading || !results.FaceMatches?.length}
                        className="flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download All
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.FaceMatches?.map((match: FaceMatch, index: number) => (
                        <div key={match.Face.FaceId} className="border rounded-lg p-4">
                          <div className="relative aspect-video w-full mb-2">
                            <Image
                              src={`https://live.staticflickr.com/65535/${match.Face.ExternalImageId}`}
                              alt={`Matched face ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              {match.Similarity.toFixed(1)}% match
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(match.Face.ExternalImageId)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleShare}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                  fill="currentColor"
                                >
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  We&apos;ll scan all photos from this event to find matches
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 