'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Typ dla pojedynczej kampanii promocyjnej
interface PromotionCampaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
}

// Przykładowe dane kampanii
const demoPromotions: PromotionCampaign[] = [
  {
    id: '1',
    slug: 'wiosenna-wyprzedaz',
    title: 'Wiosenna wyprzedaż',
    description: 'Skorzystaj z rabatów do 50% na wszystkie produkty wiosenne',
    imageUrl: '/img/auth-img.jpg',
    buttonText: 'Zobacz ofertę',
  },
  {
    id: '2',
    slug: 'nowa-kolekcja',
    title: 'Nowa kolekcja już dostępna',
    description: 'Odkryj najnowsze trendy w naszym sklepie',
    imageUrl: '/img/auth-img.jpg',
    buttonText: 'Sprawdź teraz',
  },
  {
    id: '3',
    slug: 'darmowa-dostawa',
    title: 'Darmowa dostawa',
    description: 'Przy zakupach powyżej 200 zł dostawa gratis',
    imageUrl: '/img/auth-img.jpg',
    buttonText: 'Dowiedz się więcej',
  },
];

interface PromotionSliderProps {
  promotions?: PromotionCampaign[];
  autoplaySpeed?: number;
  className?: string;
}

export default function PromotionSlider({
  promotions = demoPromotions,
  autoplaySpeed = 5000,
  className,
}: PromotionSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Funkcja do przechodzenia do następnego slajdu
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
  };

  // Funkcja do przechodzenia do poprzedniego slajdu
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  // Funkcja do wyboru konkretnego slajdu
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    // Wznów autoplay po 10 sekundach bezczynności
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  // Automatyczne przełączanie slajdów
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoplay, autoplaySpeed]);

  // Zatrzymaj autoplay przy interakcji użytkownika
  const handleInteraction = () => {
    setIsAutoplay(false);
    // Wznów autoplay po 10 sekundach bezczynności
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  return (
    <div
      className={cn('relative w-full overflow-hidden ', className)}
      onMouseEnter={handleInteraction}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promotion) => (
          <Link
            key={promotion.id}
            href={`/promotion/${promotion.slug}`}
            className="relative min-w-full h-[300px] md:h-[400px] lg:h-[500px] cursor-pointer"
          >
            <Image
              src={promotion.imageUrl || '/placeholder.svg'}
              alt={promotion.title}
              fill
              className="object-cover"
              priority={currentSlide === promotions.indexOf(promotion)}
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-6 md:p-12">
              <div className="max-w-xl text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {promotion.title}
                </h2>
                <p className="text-sm md:text-base mb-4">
                  {promotion.description}
                </p>
                {promotion.buttonText && (
                  <Button variant="default" className="mt-4">
                    {promotion.buttonText}
                  </Button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Przyciski nawigacyjne */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
          handleInteraction();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        aria-label="Poprzedni slajd"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
          handleInteraction();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        aria-label="Następny slajd"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Wskaźniki slajdów */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToSlide(index);
            }}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              currentSlide === index
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Przejdź do slajdu ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
