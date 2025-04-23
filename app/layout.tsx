import type React from "react"
import type { Metadata } from "next"
import { Syne } from "next/font/google"
import "./globals.css"
import RainbowString from "./components/RainbowString"

// Initialize Syne font with proper subsets and display settings
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "Rahul Dalvi",
  description: "Personal website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={syne.variable}>
      <body className={`bg-black text-white ${syne.className}`}>
        <RainbowString />
        {children}
      </body>
    </html>
  )
}