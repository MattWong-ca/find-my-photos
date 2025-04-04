import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "../../components/Navbar"

const events = [
  { id: 1, name: "ETHGlobal Bangkok", year: "2024", slug: "bangkok-2024" },
  { id: 2, name: "ETHGlobal San Francisco", year: "2024", slug: "sanfrancisco-2024" },
  { id: 3, name: "ETHGlobal Singapore", year: "2024", slug: "singapore-2024" },
  { id: 4, name: "ETHGlobal Brussels", year: "2024", slug: "brussels-2024" },
  { id: 5, name: "ETHGlobal Sydney", year: "2024", slug: "sydney-2024" }
]

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">ETHGlobal Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id}>
                <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="aspect-video w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
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
      </main>
    </div>
  )
} 