import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL('https://atlas-albany.com'),
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    siteName: 'Atlas Albany',
    images: [{ url: '/images/pc-home-hero.jpg' }],
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/ar" />
      </head>
      <body className="bg-brand-black text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Navbar locale={locale as Locale} />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
