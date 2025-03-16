'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  CreditCard,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  Informacje: [
    { name: 'O nas', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'Kariera', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  'Obsługa klienta': [
    { name: 'Dostawa', href: '/shipping' },
    { name: 'Zwroty i reklamacje', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Status zamówienia', href: '/order-status' },
  ],
  Kategorie: [
    { name: 'Laptopy', href: '/category/laptops' },
    { name: 'Smartfony', href: '/category/smartphones' },
    { name: 'Telewizory', href: '/category/tvs' },
    { name: 'Audio', href: '/category/audio' },
    { name: 'Akcesoria', href: '/category/accessories' },
  ],
};

const paymentMethods = [
  { name: 'Visa', image: '/placeholder.svg?height=30&width=40' },
  { name: 'Mastercard', image: '/placeholder.svg?height=30&width=40' },
  { name: 'PayPal', image: '/placeholder.svg?height=30&width=40' },
  { name: 'BLIK', image: '/placeholder.svg?height=30&width=40' },
  { name: 'Przelewy24', image: '/placeholder.svg?height=30&width=40' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would normally send the email to your API
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-background border-t">
      {/* Main footer content */}
      <div className="container px-4 py-12 md:py-16 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="ElektroShop"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground max-w-xs">
                Twój zaufany sklep z elektroniką. Oferujemy najnowsze produkty w
                konkurencyjnych cenach z szybką dostawą.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <Phone className="h-4 w-4" />
                  <span>+48 123 456 789</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <Mail className="h-4 w-4" />
                  <span>kontakt@elektroshop.pl</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <MapPin className="h-4 w-4" />
                  <span>ul. Elektroniczna 42, 00-000 Warszawa</span>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="group"
                aria-label="Facebook"
              >
                <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/5">
                  <Facebook className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
              </Link>

              <Link
                href="https://instagram.com"
                className="group"
                aria-label="Instagram"
              >
                <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/5">
                  <Instagram className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
              </Link>

              <Link
                href="https://twitter.com"
                className="group"
                aria-label="Twitter"
              >
                <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/5">
                  <Twitter className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
              </Link>

              <Link
                href="https://youtube.com"
                className="group"
                aria-label="YouTube"
              >
                <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/5">
                  <Youtube className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-medium text-base">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-0 mr-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:mr-1 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Zapisz się, aby otrzymywać informacje o promocjach i nowościach.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Twój adres email"
                  className="pr-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {subscribed && (
                <p className="text-xs text-primary animate-fade-in">
                  Dziękujemy za zapisanie się do newslettera!
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Zapisując się, akceptujesz naszą{' '}
                <Link
                  href="/privacy"
                  className="underline hover:text-foreground transition-colors"
                >
                  Politykę Prywatności
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-border">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Akceptujemy:
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {paymentMethods.map((method) => (
                <div key={method.name} className="h-8 flex items-center">
                  <Image
                    src={method.image || '/placeholder.svg'}
                    alt={method.name}
                    width={40}
                    height={30}
                    className="h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-muted">
        <div className="container px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} ElektroShop. Wszystkie prawa
              zastrzeżone.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors duration-200"
              >
                Regulamin
              </Link>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors duration-200"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/cookies"
                className="hover:text-foreground transition-colors duration-200"
              >
                Polityka cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
