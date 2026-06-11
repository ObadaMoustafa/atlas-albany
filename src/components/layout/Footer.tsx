'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact.info');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ];

  const services = t.raw('servicesList') as string[];

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 mb-4 w-fit"
            >
              <div className="relative w-12 h-12 rounded-full ring-2 ring-brand-red/50">
                <Image
                  src="/images/logo.png"
                  alt="Atlas Albany Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block text-lg font-bold text-white leading-none">
                  ATLAS
                </span>
                <span className="block text-sm font-bold text-brand-red leading-none tracking-widest">
                  ALBANY
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={`https://wa.me/${contact('whatsapp').replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-red/20 flex items-center justify-center transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Atlas-Albany/61587833050969/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-red/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
              {t('links')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-red transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
              {t('services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-white/70 hover:text-brand-red transition-colors duration-200 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div dir="ltr" className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <p className="text-white/20 text-xs">
              Rruga Don Bosko, Tiranë 1000, Albania
            </p>
            <a
              href="https://www.linkedin.com/in/obada-moustafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 text-xs hover:text-white/50 transition-colors duration-200"
            >
              This website is built by <span className="font-playfair text-white/50 font-semibold italic hover:text-brand-red transition-colors duration-200">Obada Moustafa</span>
            </a>
          </div>
          <p className="text-white/30 text-sm">
            © {currentYear} {t('company')}. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
