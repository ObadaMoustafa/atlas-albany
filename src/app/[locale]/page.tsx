import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import WhyUs from '@/components/home/WhyUs'
import CallToAction from '@/components/home/CallToAction'
import JsonLd from '@/components/ui/JsonLd'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      type: 'website',
    },
  }
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Atlas Albany',
    description: 'Visa, tourism, study residence, and residence permit services in Albania for Arabic-speaking clients.',
    telephone: '+35568946140',
    email: 'Khaled.sh@atlas-albany.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rruga Don Bosko',
      addressLocality: 'Tiranë',
      postalCode: '1000',
      addressCountry: 'AL',
    },
    url: 'https://atlas-albany.com',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Services />
      <WhyUs />
      <CallToAction />
    </>
  )
}
