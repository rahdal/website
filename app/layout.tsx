import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RainbowString from "./components/RainbowString"

// Initialize Inter font with proper subsets and display settings
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Shashank Vemuri",
  description: "Personal website",
  generator: 'v0dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`bg-black text-white ${inter.className}`}>
        <RainbowString />
        {children}
      </body>
    </html>
  )
}