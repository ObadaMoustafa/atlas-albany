'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: 'easeOut' })
    }
  }, [inView, count, value])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Story() {
  const t = useTranslations('about.story')

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Stat column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 text-center lg:text-start">
              <div className="inline-block">
                <p className="text-7xl md:text-8xl font-black text-brand-red leading-none mb-2">
                  <CountUp value={7} suffix="+" />
                </p>
                <p className="text-gray-500 text-lg font-medium">{t('statLabel')}</p>
              </div>
              <div className="mt-8 hidden lg:block">
                <div className="w-16 h-1 bg-brand-red rounded-full mb-4" />
                <p className="text-gray-400 text-sm">Atlas Albany</p>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('title')}</h2>
            <p className="text-gray-600 leading-relaxed text-base">{t('paragraph1')}</p>
            <p className="text-gray-600 leading-relaxed text-base">{t('paragraph2')}</p>
            <p className="text-gray-600 leading-relaxed text-base">{t('paragraph3')}</p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
