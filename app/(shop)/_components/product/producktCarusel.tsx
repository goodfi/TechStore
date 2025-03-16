'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

// Product type definition
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  isNew?: boolean;
  slug: string;
};

interface ProductCarouselProps {
  title: string;
  products: Product[];
  className?: string;
  id?: string;
}

export function ProductCarousel({
  title,
  products,
  className,
  id,
}: ProductCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [count, setCount] = useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    return () => {
      api?.off('select', onSelect);
      setCurrent(api.selectedScrollSnap());
    };
  }, [api, onSelect]);

  return (
    <div
      className={cn('w-full py-8 flex justify-center items-center', className)}
      id={id}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                api?.scrollPrev();
              }}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Poprzedni</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Następny</span>
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full overflow-hidden group">
                  <Link href={`/product/${product.slug}`} className=" ">
                    <div className="relative block overflow-hidden pt-[100%]">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform scale-95 group-hover:scale-100"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          Nowość
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 left-2"
                        >
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          %
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base line-clamp-[1] mb-1">
                        {product.name}
                      </h3>
                      {product.rating && (
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-4 h-4',
                                //@ts-expect-error
                                i < Math.floor(product.rating)
                                  ? 'fill-primary text-primary'
                                  : 'fill-muted text-muted'
                              )}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-start justify-end w-full flex-col gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold">
                          {product.price.toFixed(2)} zł
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toFixed(2)} zł
                          </span>
                        )}
                      </div>
                      <Button className="w-full">Buy now</Button>
                    </CardFooter>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === current ? 'bg-primary' : 'bg-muted'
              )}
              onClick={() => api?.scrollTo(index)}
            >
              <span className="sr-only">Slajd {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
