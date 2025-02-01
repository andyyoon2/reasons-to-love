import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './Header';
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reasons to Love',
  description: 'Share the reasons that make your partner special.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} dark:bg-zinc-900 dark:text-slate-50 flex min-h-400 flex-col items-center justify-start`}>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
