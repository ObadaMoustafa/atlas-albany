'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CallToAction() {
  const t = useTranslations('home.cta')
  const pathname = usePathname()
  const locale = pathname.startsWith('/en') ? 'en' : 'ar'

  return (
    <section className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-red/5" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('title')}</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">{t('subtitle')}</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-10 py-4 bg-brand-red text-white font-bold text-lg rounded-full hover:bg-red-700 hover:shadow-xl hover:shadow-brand-red/30 hover:scale-105 transition-all duration-300"
            >
              {t('button')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
