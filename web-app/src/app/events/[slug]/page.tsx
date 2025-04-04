// import { Button } from "@/components/ui/button"
import { Navbar } from "../../../components/Navbar"

export default function EventPage({ params }: { params: { slug: string } }) {
//   const handleFindPhotos = () => {
//     // This is where you'll use the params.slug to make your API call
//     console.log(`Finding photos for event: ${params.slug}`)
//   }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Photos</h1>
            <p className="text-gray-600 mb-8">
              Upload your photo to find yourself in pictures from {params.slug}
            </p>
            
            <div className="space-y-6">
              {/* <Button size="lg" onClick={handleFindPhotos}>
                Upload Your Photo
              </Button> */}
              
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