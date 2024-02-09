import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const rubik = Rubik({ subsets: ['latin'] })


const title = 'tapped data'
const description = 'predicting the future of live music'
export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
        <meta
          name="description"
          content={description}
        />
        <meta property="og:site_name" content="tapped.ai" />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:title"
          content={title}
        />
        <meta property="og:image" content="https://data.tapped.ai/og.png"></meta>
        <meta property="og:url" content="https://tapped.ai"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={title}
        />
        <meta
          name="twitter:description"
          content={description}
        />
        <meta property="twitter:image" content="https://data.tapped.ai/og.png"></meta>
      </head>
      <body className={rubik.className}>
          {children}
        <Analytics />
      </body>
    </html>
  )
}
