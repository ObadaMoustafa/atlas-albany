'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

const wideBanner = '/images/pc-about-hero.jpg'
const mobileBanner = '/images/mobile-about-hero.jpg'

export default function AboutHero() {
  const t = useTranslations('about.hero')

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={wideBanner}
          alt="Atlas Albany"
          fill
          priority
          className="object-cover object-center hidden md:block"
        />
        <Image
          src={mobileBanner}
          alt="Atlas Albany"
          fill
          priority
          className="object-cover object-center md:hidden"
        />
        <div className="absolute inset-0 bg-brand-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/60" />
      </div>

      {/* Red accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent origin-left"
      />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/40 bg-brand-red/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-sm text-brand-red font-medium">{t('tagline')}</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none">
            {t('title').split(' ')[0]}{' '}
            <span className="text-brand-red">{t('title').split(' ')[1]}</span>
          </h1>
          <p className="text-xl text-white/70">{t('subtitle')}</p>
        </motion.div>
      </div>
    </section>
  )
}
