import type { Metadata } from 'next'
import './globals.css'
import QueryProviderLayout from '@/layout/QueryProviderLayout'




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProviderLayout>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </QueryProviderLayout>
  )
}
