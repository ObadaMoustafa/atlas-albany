'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WhyUs() {
  const t = useTranslations('home.whyUs')
  const items = t.raw('items') as string[]
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-brand-red text-sm font-semibold uppercase tracking-widest mb-4">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {t('title')}
            </h2>
            <div className="mt-8 w-16 h-1 bg-brand-red rounded-full" />
          </motion.div>

          <motion.div
            ref={ref}
            className="space-y-4"
            variants={listContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={listItem}
                className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-brand-red/30 hover:shadow-sm transition-[border-color,box-shadow] duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors duration-300">
                  <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
