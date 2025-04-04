import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FindMyPhotos.app</span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link href="#events" className="transition-colors hover:text-foreground/80">
              Events
            </Link>
            <Button variant="outline">Connect Wallet</Button>
          </nav>
        </div>
      </header>

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
                  <Button size="lg" className="mt-4">
                    Try Now
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Hero Image"
                  width={500}
                  height={500}
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
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      alt={`Event ${i}`}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">
                      ETHGlobal {i === 1 ? "London" : i === 2 ? "Paris" : i === 3 ? "New York" : "Tokyo"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {i === 1 ? "2023" : i === 2 ? "2022" : i === 3 ? "2023" : "2022"}
                    </p>
                  </CardContent>
                </Card>
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
                  Upload a clear selfie or profile picture to help us identify you.
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
                  Download, share, or save your photos directly to your wallet.
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
                        src={`/placeholder.svg?height=60&width=60`}
                        alt={`User ${i}`}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{i === 1 ? "Alex Johnson" : "Sarah Williams"}</h3>
                        <p className="text-sm text-gray-500">
                          {i === 1 ? "ETHGlobal London Attendee" : "ETHGlobal Paris Speaker"}
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          {i === 1
                            ? "I found over 20 photos of myself that I didn't know existed! The app is incredibly fast and accurate."
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
                    <div className="mt-4 text-4xl font-bold">$420.69</div>
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
                  <Button className="mt-6">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-bold">ETHGlobal Pack Holders</h3>
                    <div className="mt-4 text-4xl font-bold">FREE</div>
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
                  <Button className="mt-6" variant="default">
                    Try Now
                  </Button>
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