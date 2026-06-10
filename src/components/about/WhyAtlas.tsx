'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function WhyAtlas() {
  const t = useTranslations('about.whyUs')
  const items = t.raw('items') as string[]
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t('title')}</h2>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={gridItem}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-brand-red/20 hover:shadow-sm transition-[border-color,box-shadow] duration-300 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold">
                {i + 1}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300 pt-1">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
