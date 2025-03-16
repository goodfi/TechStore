'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
// import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Products = ({
  product,
}: {
  product: {
    desc: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    price: number;
    lowestPrice: number;
    reductionPrice: number;
    quantity: number;
    variants: {
      id: string;
      title: string;
      productId: string | null;
      variantTabs: {
        id: string;
        values: string;
      }[];
    }[];
  };
}) => {
  return (
    <div className="flex  gap-4 max-md:flex-col relative  ">
      <div className="flex-1 bg-background border-2 md:min-h-[500px] flex max-md:flex-col justify-center gap-4 p-4 rounded-md ">
        <div className="h-[400px] md:w-[60%] w-full md:h-full ">
          <div className="overflow-hidden relative h-[70%] mt-4  ">
            <Image
              src={'/placeholder.svg'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div>silder zdjec</div>
        </div>

        <div className=" md:w-[40%] w-full">
          <div className="flex justify-end">
            <Button variant="link">Dodaj do porwnania</Button>
          </div>

          <div>
            {/* {product.rating && (
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',

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
            )} */}
          </div>
          <div className="flex justify-between gap-2 text-muted-foreground text-xs">
            {/* <p>{product.buy} osob kupilo</p> */}
            {/* <p>pytania ({product.questions})</p> */}
          </div>

          <div className="pt-8">
            {product.variants.map((e) => {
              return (
                <div key={e.id} className="pt-2">
                  <h4>{e.title}</h4>
                  <div className="flex items-center gap-2">
                    {e.variantTabs.map((v) => {
                      return (
                        <Badge
                          className="bg-accent cursor-pointer text-dark hover:bg-primary hover:text-white px-4 py-2 rounded-md"
                          key={v.values}
                        >
                          <p>{v.values}</p>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-background border-2  flex flex-col justify-between gap-8  p-4 rounded-md  py-8">
        <div>
          <h2 className="text-center font-bold text-4xl">
            {product.lowestPrice} zł
          </h2>
          <p className="text-center text-foreground line-through font-light">
            {product.price} zł
          </p>
        </div>

        <div className="flex flex-col gap-3 text-muted-foreground  text-center">
          <div className="border-b-2">Darmowa dostawa od 300zł</div>
          <div className="border-b-2">Leasing i rata już od 99 zł</div>
          <div className="border-b-2">u ciebie już jutro</div>
        </div>

        <div className="flex gap-4 w-full justify-center items-center ">
          <Input
            type="number"
            className="w-[60px]"
            value={1}
            max={product.quantity}
          />
          <Button>Dodaj do Koszyka</Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
