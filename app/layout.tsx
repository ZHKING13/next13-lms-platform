

import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Suspense } from "react";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import Head from "next/head";
import Script from 'next/script'
import { FacebookPixelEvents } from '@/components/pixel-events';
const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cobalt invest Ltd',
  description: 'cobalt invest LTD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
          <html lang="fr">
              <body className={manrope.className}>
                  <ConfettiProvider />
                  <ToastProvider />
                  {children}
                  <Suspense fallback={null}>
                      <FacebookPixelEvents />
                  </Suspense>
              </body>
          </html>
      </ClerkProvider>
  );
}
