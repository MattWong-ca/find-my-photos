'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Search } from "lucide-react"
import { BrowserProvider } from "ethers"

const EVENTS = [
  {
    id: 1,
    name: "ETHGlobal Bangkok",
    year: "2024",
    slug: "bangkok-2024",
    image: "https://i.ytimg.com/vi/WYS4V181S7g/maxresdefault.jpg"
  },
  {
    id: 2,
    name: "ETHGlobal San Francisco",
    year: "2024",
    slug: "sf-2024",
    image: "https://i.imgur.com/0KddMdj.jpeg"
  },
  {
    id: 3,
    name: "ETHGlobal Singapore",
    year: "2024",
    slug: "singapore-2024",
    image: "https://i.ytimg.com/vi/zwwyBTOO-NM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA3MmJmGXVxlV5i1eivhTrcDPDeKw"
  },
  {
    id: 4,
    name: "ETHGlobal Brussels",
    year: "2024",
    slug: "brussels-2024",
    image: "https://miro.medium.com/v2/resize:fit:1600/1*31T3DlAEZumtGqX06wccRg.jpeg"
  }
];

const NETWORK_CONFIG = {
  // Sepolia
  "0xaa36a7": {
    name: "Sepolia",
    symbol: "ETH",
    normalPrice: "1000000000000000000", // 1 ETH
    discountPrice: "10000000000000000",  // 0.01 ETH
    contractAddress: "0x16C31f51D2648f5942DeC7d779369aA09A72d827"
  },
    // Flow EVM Testnet
    "0x221": {
      name: "Flow EVM Testnet",
      symbol: "FLOW",
      normalPrice: "1000000000000000000",
      discountPrice: "10000000000000000",
      contractAddress: "0x8a204761fFb6eDD676eC28849De46D5e59F87fE1"
    },
  // Polygon Amoy
  "0x13882": {
    name: "Polygon Amoy",
    symbol: "POL",
    normalPrice: "1000000000000000000",
    discountPrice: "10000000000000000",
    contractAddress: "0xfF70C3ae45022AE728b62c90d0c14D526560e9Cf"
  },
  // Zircuit Garfield
  "0xbf02": {
    name: "Zircuit Garfield",
    symbol: "ETH",
    normalPrice: "1000000000000000000",
    discountPrice: "10000000000000000",
    contractAddress: "0xb861d6d79123ADa308E5F4030F458b402E2D131A"
  },
    // Base Sepolia
    "0x14a34": {
      name: "Base Sepolia",
      symbol: "ETH",
      normalPrice: "1000000000000000000",
      discountPrice: "10000000000000000",
      contractAddress: "0xf46E84BDA472F1C9bA77017cCc97FD7a710A872e"
    }
}

export default function Home() {
  const [networkConfig, setNetworkConfig] = useState<typeof NETWORK_CONFIG["0xaa36a7"] | null>(null)

  useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        try {
          const network = await provider.getNetwork()
          const chainId = "0x" + network.chainId.toString(16)
          const config = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG]
          
          if (config) {
            setNetworkConfig(config)
          }
        } catch (error) {
          console.error('Error checking network:', error)
        }
      }
    }

    checkNetwork()

    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [])

  const getPriceDisplay = (isDiscounted: boolean) => {
    if (networkConfig) {
      return `${isDiscounted ? '0.01' : '1'} ${networkConfig.symbol}`
    }
    return isDiscounted ? '0.01 ETH' : '1 ETH'
  }

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  FindMyPhotos.app
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  ⚡Instantly find photos you&apos;re in from ETHGlobal events using AI facial recognition tech
                </p>
                <div>
                  <Link href="/events">
                    <Button size="lg" className="mt-4">
                      Try Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src="/landing.png"
                  alt="Hero Image"
                  width={5000}
                  height={5000}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find your photos from ETHGlobal events
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Access all your memories in one place.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {EVENTS.map((event) => (
                <Link href={`/events/${event.slug}`} key={event.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full">
                      <Image
                        src={event.image}
                        alt={event.name}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-gray-500">{event.year}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How it works</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                3 simple steps to find all your photos.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1. Upload your image</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Upload a profile picture or take a live photo to help us identify you.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2. Matching</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI scans through thousands of event photos to find matches.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-primary"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">3. Share photos!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Download, share, or save your photos directly!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Testimonials & Success Stories
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                See what our users are saying about FindMyPhotos.app.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={`https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg`}
                        alt={`User ${i}`}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{i === 1 ? "Gwen" : "Sarah"}</h3>
                        <p className="text-sm text-gray-500">
                          {i === 1 ? "ETHGlobal Mentor" : "ETHGlobal Paris Attendee"}
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          {i === 1
                            ? "A very useful app to find all your photos, I'm spending at least half a day after every event searching through photos to find mine. This app is a life saver!"
                            : "As a speaker, I was too busy to take photos. FindMyPhotos.app helped me discover all the moments I missed. Incredible service!"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that works best for you.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold">Normies</h3>
                    <div className="mt-4 text-4xl font-bold">{getPriceDisplay(false)}</div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Those who&apos;ve never been</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>One time use</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Standard resolution downloads</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Basic sharing options</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/events">
                    <Button className="mt-6">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold">ETHGlobal Pack Holders</h3>
                    <div className="mt-4 text-4xl font-bold">{getPriceDisplay(true)}</div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Any past ETHGlobal event attendee</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Hackers, Judges, Partners, Volunteers, Mentors</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>High-resolution downloads</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Advanced sharing options</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/events">
                    <Button className="mt-6" variant="default">
                      Try Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 FindMyPhotos.app. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}