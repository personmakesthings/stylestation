// STYLES
import "./globals.css"
import { Montserrat } from "next/font/google"
const primaryFont = Montserrat({ subsets: ["latin"], weight: "400"})

// METADATA
export const metadata = {
  title: "StyleStation | Discover Your Perfect Outfit",
  description: "Fashion, outfits, discussion and more at StyleStation!",
}

// MODULES
import {ClerkProvider} from "@clerk/nextjs"

// COMPONENTS
import Header from "@/components/Header"
import Footer from "@/components/Footer"


// LAYOUT
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={primaryFont.className}>
            <Header />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
    </ClerkProvider>
  )
}
