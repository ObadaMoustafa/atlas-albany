import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import AboutHero from '@/components/about/AboutHero'
import Story from '@/components/about/Story'
import VisionMission from '@/components/about/VisionMission'
import ServicesOverview from '@/components/about/ServicesOverview'
import WhyAtlas from '@/components/about/WhyAtlas'
import Commitment from '@/components/about/Commitment'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        ar: '/ar/about',
        en: '/en/about',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/about`,
      type: 'website',
    },
  }
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <>
      <AboutHero />
      <Story />
      <VisionMission />
      <ServicesOverview />
      <WhyAtlas />
      <Commitment />
    </>
  )
}
