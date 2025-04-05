'use client'

import { useState } from 'react'
import { BrowserProvider } from 'ethers'
import Link from "next/link"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export function Navbar() {
  const [address, setAddress] = useState<string>('')

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        // Request account access
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address.slice(0, 6) + '...' + address.slice(-4))
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

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
          <Button onClick={connectWallet}>
            {address || 'Connect Wallet'}
          </Button>
        </nav>
      </div>
    </header>
  )
} 