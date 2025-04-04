import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">FindMyPhotos.app</span>
        </Link>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <Link href="/events" className="transition-colors hover:text-foreground/80">
            Events
          </Link>
          <Button variant="outline">Connect Wallet</Button>
        </nav>
      </div>
    </header>
  )
} 