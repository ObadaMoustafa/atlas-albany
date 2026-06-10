'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function VisionMission() {
  const vision = useTranslations('about.vision')
  const mission = useTranslations('about.mission')

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <AnimatedSection direction="left" className="relative p-8 md:p-10 rounded-2xl bg-white border border-gray-200 group overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-0 start-0 w-1 h-full bg-brand-red rounded-s-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{vision('title')}</h3>
              <p className="text-gray-600 leading-relaxed">{vision('text')}</p>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection direction="right" delay={0.1} className="relative p-8 md:p-10 rounded-2xl bg-white border border-gray-200 group overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-0 start-0 w-1 h-full bg-brand-red rounded-s-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{mission('title')}</h3>
              <p className="text-gray-600 leading-relaxed">{mission('text')}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
