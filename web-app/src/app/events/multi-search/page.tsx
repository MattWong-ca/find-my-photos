'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

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
    name: "ETHGlobal SF", 
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
  },
  { 
    id: 5, 
    name: "ETHGlobal Sydney", 
    year: "Coming soon!", 
    slug: "sydney-2024",
    image: "https://i.imgur.com/pw5agXi.jpeg"
  }
]

export default function MultiSearchPage() {
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const handleEventToggle = (eventId: number) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId)
      } else {
        return [...prev, eventId]
      }
    })
  }

  const handleSearch = () => {
    // This would be implemented to search across multiple events
    setLoading(true)
    console.log("Searching in events:", selectedEvents)
    // Implement actual search logic here
    setTimeout(() => setLoading(false), 1000) // Simulated loading
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Multi-Event Search</h1>
              <p className="text-gray-600">
                Select the events you want to search through
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {EVENTS.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Checkbox
                        id={`event-${event.id}`}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleEventToggle(event.id)}
                        className="h-6 w-6 border-2 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.year}</p>
                      </div>
                      <Checkbox
                        id={`event-${event.id}-mobile`}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleEventToggle(event.id)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={loading || selectedEvents.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  `Search ${selectedEvents.length} Event${selectedEvents.length !== 1 ? 's' : ''}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 