import Navbar from '@/components/navbar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Geist } from 'next/font/google'
import React from 'react'
import './styles.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  description: 'AI Powered Content Publishing System',
  title: 'AI Nextpress',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={geist.className}>
        <main>
          <div className="min-h-screen flex flex-col p-6 justify-center items-center max-w-xl mx-auto">
            <Card className="w-full">
              <CardHeader>
                <Navbar />
              </CardHeader>
              <CardContent className="">{children}</CardContent>
            </Card>
          </div>
        </main>
      </body>
    </html>
  )
}
