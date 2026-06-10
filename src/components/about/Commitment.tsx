'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function Commitment() {
  const t = useTranslations('about.commitment')
  const nav = useTranslations('nav')
  const pathname = usePathname()
  const locale = pathname.startsWith('/en') ? 'en' : 'ar'

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.8 }}
          >
            <ImagePlaceholder
              label="Team / Office Photo"
              recommendedSize="800×600"
              className="w-full h-80 lg:h-96"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t('text1')}</p>
            <p className="text-gray-600 leading-relaxed mb-10">{t('text2')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-300"
            >
              {nav('contact')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
