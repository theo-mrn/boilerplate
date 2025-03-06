import type React from "react"
import type { Metadata } from "next"
import '../globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/settings'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "Theo MORIN | Développeur Web",
  description: "Portfolio de Théo MORIN, développeur web spécialisé en React et Next.js",
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    return {}
  }
}

export default async function LocaleLayout(props: Props) {
  const { locale } = await props.params

  // Enable static rendering
  await unstable_setRequestLocale(locale)

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    return null
  }

  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon/image.png" />
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
} 