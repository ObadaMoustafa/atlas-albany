'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

const icons = [
  <svg key="v" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" /></svg>,
  <svg key="t" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
  <svg key="s" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84 51.394 51.394 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
  <svg key="r" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
]

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesOverview() {
  const t = useTranslations('about.services')
  const items = t.raw('items') as Array<{ title: string; description: string }>
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={gridItem}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-brand-red/30 hover:shadow-md transition-[border-color,box-shadow] duration-300 group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red mx-auto mb-5 group-hover:bg-brand-red/20 transition-colors duration-300">
                {icons[i]}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
