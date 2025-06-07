import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Contacts App",
  description: "A modern, responsive contacts application built with Next.js",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f8fcfa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
