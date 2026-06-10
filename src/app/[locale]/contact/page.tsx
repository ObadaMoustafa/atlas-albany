import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'
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
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ar: '/ar/contact',
        en: '/en/contact',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/contact`,
      type: 'website',
    },
  }
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Atlas Albany - Contact',
    url: 'https://atlas-albany.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Atlas Albany',
      telephone: '+35568946140',
      email: 'Khaled.sh@atlas-albany.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rruga Don Bosko',
        addressLocality: 'Tiranë',
        postalCode: '1000',
        addressCountry: 'AL',
      },
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactHero />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
