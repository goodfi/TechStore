import React from 'react';
import PromotionSlider from './_components/Hero';
import {
  Product,
  ProductCarousel,
} from './_components/product/producktCarusel';

const page = () => {
  const exampleProducts: Product[] = [
    {
      id: '1',
      name: 'Smartfon Samsung Galaxy A55 5G 8/128GB Black - Awesome Navy (SM-A556BZK)ą',
      price: 999,
      originalPrice: 1518.5,
      image: '/product/phone.png',
      rating: 4.5,
      isNew: true,
      slug: 'samsung-galaxy-a55',
    },
    {
      id: '2',
      name: 'Klasyczna koszula w kratę',
      price: 89.99,
      image: '/placeholder.svg?height=400&width=400',
      rating: 4.2,
      slug: 'klasyczna-koszula-w-krate',
    },
    {
      id: '3',
      name: 'Spodnie jeansowe slim fit',
      price: 149.99,
      originalPrice: 179.99,
      image: '/placeholder.svg?height=400&width=400',
      rating: 4.7,
      slug: 'spodnie-jeansowe-slim-fit',
    },
    {
      id: '4',
      name: 'Kurtka zimowa z kapturem',
      price: 299.99,
      image: '/placeholder.svg?height=400&width=400',
      rating: 4.8,
      isNew: true,
      slug: 'kurtka-zimowa-z-kapturem',
    },
    {
      id: '5',
      name: 'Buty sportowe do biegania',
      price: 219.99,
      originalPrice: 249.99,
      image: '/placeholder.svg?height=400&width=400',
      rating: 4.6,
      slug: 'buty-sportowe-do-biegania',
    },
    {
      id: '6',
      name: 'Torba na ramię ze skóry ekologicznej',
      price: 159.99,
      image: '/placeholder.svg?height=400&width=400',
      rating: 4.3,
      slug: 'torba-na-ramie-ze-skory-ekologicznej',
    },
  ];

  return (
    <>
      <div className="w-[95%] flex justify-center items-center mx-auto">
        <PromotionSlider className="rounded-md my-3 " />
      </div>
      <ProductCarousel title="Polecane produkty" products={exampleProducts} />
      <ProductCarousel title="Komputer" products={exampleProducts} />
      <ProductCarousel title="Ostatnio oglądane" products={exampleProducts} />
    </>
  );
};

export default page;
