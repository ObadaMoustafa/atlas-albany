'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <section className="relative py-32 pt-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact-us-banner.jpg"
          alt="Contact Atlas Albany"
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-brand-gray/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/60" />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent origin-left"
      />

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/40 bg-brand-red/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-sm text-brand-red font-medium">
              {t('tagline')}
            </span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
