import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flowcus - Employee Progress Tracker',
  description: 'Track employee progress and deadlines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  )
}

