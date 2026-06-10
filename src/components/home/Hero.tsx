'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

const wideBanner = '/images/pc-home-hero.jpg'
const mobileBanner = '/images/mobile-home-hero.jpg'

export default function Hero() {
  const t = useTranslations('home.hero')
  const pathname = usePathname()
  const locale = pathname.startsWith('/en') ? 'en' : 'ar'
  const isRtl = locale === 'ar'
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const words = t('subtitle').split(' ')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } },
  }

  const wordVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={wideBanner} alt="Atlas Albany" fill priority className="object-cover object-center hidden md:block" />
        <Image src={mobileBanner} alt="Atlas Albany" fill priority className="object-cover object-center md:hidden" />

        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-brand-black/60" />

        {/* Desktop directional gradient — behind text side */}
        <div className={`absolute inset-0 hidden md:block ${isRtl ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-brand-black/80 via-brand-black/40 to-transparent`} />

        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-brand-black/70 md:hidden" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />
      </div>

      {/* Red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent origin-left"
      />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl pt-24 pb-20">
        {/*
          flex-row: logo first in JSX = LEFT in LTR (EN), RIGHT in RTL (AR)
          text second in JSX = RIGHT in LTR (EN), LEFT in RTL (AR)
          No conditional ordering needed — dir="rtl/ltr" handles the flip automatically.
        */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Logo — desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-shrink-0 items-center justify-center"
          >
            <div className="relative w-36 h-36 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 drop-shadow-2xl">
              <Image src="/images/logo.png" alt="Atlas Albany" fill className="object-contain" priority />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-start">

            {/* Tagline badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/40 bg-brand-red/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-sm text-brand-red font-medium">{t('tagline')}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white mb-6 leading-none"
            >
              {t('title').split(' ')[0]}{' '}
              <span className="text-brand-red">{t('title').split(' ')[1]}</span>
            </motion.h1>

            {/* Subtitle — word by word */}
            <motion.p
              variants={container}
              initial="hidden"
              animate={controls}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block me-1">
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link
                href={`/${locale}/contact`}
                className="group relative px-8 py-4 bg-brand-red text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 hover:scale-105"
              >
                <span className="relative z-10">{t('cta1')}</span>
                <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="px-8 py-4 border border-white/30 text-white/80 font-semibold rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300"
              >
                {t('cta2')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-brand-red" />
        </motion.div>
      </motion.div>
    </section>
  )
}
