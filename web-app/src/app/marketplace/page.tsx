'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Loader2, DollarSign } from "lucide-react"

interface Photo {
  id: string
  url: string
  event: string
  uploadedBy: string
  earnings: number
  searches: number
  matches: number
}

// Mock data for demonstration
const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://i.imgur.com/0KddMdj.jpeg',
    event: 'ETHGlobal SF 2024',
    uploadedBy: '0x1234...5678',
    earnings: 0.5,
    searches: 25,
    matches: 3
  },
  {
    id: '2',
    url: 'https://i.ytimg.com/vi/WYS4V181S7g/maxresdefault.jpg',
    event: 'ETHGlobal Bangkok 2024',
    uploadedBy: '0x8765...4321',
    earnings: 0.8,
    searches: 42,
    matches: 5
  }
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('upload')
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState('')
  const [myPhotos, setMyPhotos] = useState<Photo[]>(MOCK_PHOTOS)

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

  const handleUpload = async () => {
    if (!selectedImage || !selectedEvent) return
    
    setLoading(true)
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add to my photos (in real app, this would be an API call)
      const newPhoto: Photo = {
        id: Math.random().toString(),
        url: preview,
        event: selectedEvent,
        uploadedBy: '0x1234...5678', // Would be actual wallet address
        earnings: 0,
        searches: 0,
        matches: 0
      }
      
      setMyPhotos(prev => [newPhoto, ...prev])
      setSelectedImage(null)
      setPreview('')
      setSelectedEvent('')
      setActiveTab('my-photos')
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Photo Marketplace</h1>
              <p className="text-gray-600">
                Upload your event photos and earn when people find themselves
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photos
                </TabsTrigger>
                <TabsTrigger value="my-photos" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  My Earnings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    {!preview ? (
                      <div className="flex flex-col items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <span className="text-gray-500">Click to upload event photos</span>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative aspect-video w-full">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="event">Event</Label>
                            <select
                              id="event"
                              value={selectedEvent}
                              onChange={(e) => setSelectedEvent(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="">Select an event</option>
                              <option value="ETHGlobal SF 2024">ETHGlobal SF 2024</option>
                              <option value="ETHGlobal Bangkok 2024">ETHGlobal Bangkok 2024</option>
                              <option value="ETHGlobal Singapore 2024">ETHGlobal Singapore 2024</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setPreview('')
                                setSelectedImage(null)
                                setSelectedEvent('')
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpload}
                              disabled={loading || !selectedEvent}
                              className="flex-1"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                'Upload Photo'
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="my-photos">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {myPhotos.map((photo) => (
                      <Card key={photo.id}>
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-48 h-48">
                            <Image
                              src={photo.url}
                              alt={photo.event}
                              fill
                              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <CardContent className="p-6 flex-1">
                            <div className="flex flex-col h-full">
                              <h3 className="font-semibold mb-2">{photo.event}</h3>
                              <div className="flex-1 space-y-2">
                                <p className="text-sm text-gray-500">
                                  Uploaded by: {photo.uploadedBy}
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-2xl font-bold text-green-600">
                                      {photo.earnings} ETH
                                    </p>
                                    <p className="text-sm text-gray-500">Earned</p>
                                  </div>
                                  <div>
                                    <p className="text-2xl font-bold">{photo.searches}</p>
                                    <p className="text-sm text-gray-500">Searches</p>
                                  </div>
                                  <div>
                                    <p className="text-2xl font-bold">{photo.matches}</p>
                                    <p className="text-sm text-gray-500">Matches</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
} 