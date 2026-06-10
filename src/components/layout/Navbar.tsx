'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale } from '@/i18n'

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isRtl = locale === 'ar'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      const header = document.querySelector('header')
      if (header && !header.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const otherLocale = locale === 'ar' ? 'en' : 'ar'
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full ring-2 ring-brand-red/50 group-hover:ring-brand-red transition-[box-shadow] duration-300">
              <Image
                src="/images/logo.png"
                alt="Atlas Albany Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <span className="block text-lg font-bold tracking-wide text-white leading-none">ATLAS</span>
              <span className="block text-sm font-bold tracking-widest text-brand-red leading-none">ALBANY</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 group ${
                  isActive(link.href) ? 'text-brand-red' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red transition-transform duration-300 origin-center ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side: Lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={otherPath}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-sm text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              {otherLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2 bg-brand-red text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              {t('getStarted')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-transform"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-brand-dark border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-white/5 ${
                    isActive(link.href) ? 'text-brand-red' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href={otherPath}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-sm text-white/70"
                >
                  {otherLocale === 'ar' ? 'العربية' : 'English'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-2 bg-brand-red text-white text-sm font-semibold rounded-full"
                >
                  {t('getStarted')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
