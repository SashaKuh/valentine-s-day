import React from "react"
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Nunito } from 'next/font/google'

import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
})

const nunito = Nunito({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'For You, Киця',
  description: 'Happy Valentine\'s Day',
}

export const viewport: Viewport = {
  themeColor: '#f5dce5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
