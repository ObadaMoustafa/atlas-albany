'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ContactForm() {
  const t = useTranslations('contact.form')
  const services = t.raw('services') as string[]
  const placeholders = {
    name: t('placeholders.name'),
    email: t('placeholders.email'),
    phone: t('placeholders.phone'),
    service: t('placeholders.service'),
    message: t('placeholders.message'),
  }

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const body = new URLSearchParams({
      'form-name': 'contact',
      ...formData,
    })

    try {
      const res = await fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/20 transition-all duration-200 text-sm'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('successTitle')}</h3>
        <p className="text-gray-500 leading-relaxed max-w-sm">{t('successMessage')}</p>
        <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/5 border border-brand-red/20">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="text-sm text-brand-red font-medium">Atlas Albany</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      <AnimatedSection direction="right">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t('title')}</h2>
      </AnimatedSection>

      {/* Hidden Netlify form for build detection */}
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <select name="service"><option /></select>
        <textarea name="message" />
      </form>

      <AnimatedSection direction="right" delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">{t('name')}</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={placeholders.name}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={placeholders.email}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={placeholders.phone}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">{t('service')}</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="" disabled>{placeholders.service}</option>
                {services.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">{t('message')}</label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={placeholders.message}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/20"
          >
            {status === 'sending' ? t('sending') : t('submit')}
          </button>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/30 text-red-400 text-sm text-center"
              >
                {t('error')}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </AnimatedSection>
    </div>
  )
}
