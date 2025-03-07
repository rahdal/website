import type React from "react"
import type { Metadata } from "next"
import { Averia_Serif_Libre, EB_Garamond, Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import RainbowString from "./components/RainbowString"

// Initialize Inter font with proper subsets and display settings
const inter = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body className={`bg-black text-white ${inter.className}`}>
        <RainbowString />
        {children}
      </body>
    </html>
  )
}