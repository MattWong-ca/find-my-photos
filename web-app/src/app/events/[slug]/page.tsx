'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"

export default function EventPage() {
  const params = useParams()
  const [eventName, setEventName] = useState('')
  const [eventYear, setEventYear] = useState('')

  useEffect(() => {
    if (params?.slug) {
      const [city, year] = (params.slug as string).split('-')
      setEventName(city.toLowerCase() === 'sf' ? 'SF' : city.charAt(0).toUpperCase() + city.slice(1))
      setEventYear(year)
    }
  }, [params])

  const handleFindPhotos = () => {
    // Now you can use eventSlug when needed
    console.log(`Finding photos for event: ${eventName} ${eventYear}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Photos</h1>
            <p className="text-gray-600 mb-8">
              Upload your photo to find yourself in pictures from ETHGlobal {eventName} {eventYear}
            </p>
            
            <div className="space-y-6">
              <Button size="lg" onClick={handleFindPhotos}>
                Upload Your Photo
              </Button>
              
              <div className="text-sm text-gray-500">
                We&apos;ll scan all photos from this event to find matches
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 