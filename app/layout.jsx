import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'BD Open Data Visualizer',
  description: 'Access, visualize, and analyze comprehensive datasets from across Bangladesh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}