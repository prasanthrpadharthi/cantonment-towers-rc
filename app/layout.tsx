import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cantonment Towers - Resident Community',
  description: 'A vibrant community platform for Cantonment Towers residents',
  generator: 'Prasanth',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Cantonment Towers Community</title>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#e11d48" />
            <link rel="apple-touch-icon" href="/placeholder-logo.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="mobile-web-app-capable" content="yes" />
          </head>
          <body>
            {children}
            <script dangerouslySetInnerHTML={{
              __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', function() { navigator.serviceWorker.register('/service-worker.js'); }); }`
            }} />
          </body>
        </html>
      )
}
