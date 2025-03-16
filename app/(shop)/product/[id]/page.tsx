import React from 'react';
import Products from '../_components/Products';
import NavProduct from '../_components/NavProduct';
import { ProductCarousel } from '../../_components/product/producktCarusel';
import ContentWrapper from '../_components/ContentWrapper';
import { TableData } from '@/components/Table';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { Product } from '@/db/schema';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await db.query.Product.findFirst({
    where: eq(Product.slug, id),
    with: {
      specifications: {
        with: {
          specTabs: true,
        },
      },
      variants: {
        with: {
          variantTabs: true,
        },
      },
      productCategories: true,
    },
  });

  if (!product) return <div>Not Found</div>;

  const exampleProducts = [
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
      <h2 className="my-4">{product?.name}</h2>
      <Products product={product} />
      <NavProduct />

      <ProductCarousel title="Podobne produkty" products={exampleProducts} />

      <ContentWrapper title="Opis Produktu" className="" hack="opis">
        <p>{product.desc}</p>
      </ContentWrapper>
      <ContentWrapper title="Specyfikacja" className="" hack="specyfikacja">
        {product.specifications.map((tab) => {
          return (
            <div
              key={tab.id}
              className="flex max-md:flex-col justify-between gap-8 mb-[100px]"
            >
              <h4 className=" text-2xl font-bold md:w-[50%]">{tab.title}</h4>

              <TableData data={tab.specTabs} />
            </div>
          );
        })}

        {/* <TableData data={invoices} /> */}
      </ContentWrapper>

      <ProductCarousel
        title="Akcesoria"
        products={exampleProducts}
        id="Akcesoria"
      />

      <ContentWrapper title="opinie" className="" hack="opinie">
        <p>
          Samsung Galaxy A55 to rewolucyjny smartfon, który wyznacza nowe trendy
          w branży mobilnej. Jego innowacyjny ekran Infinity-O oparty na
          technologii Super AMOLED oferuje oszałamiającą częstotliwość
          odświeżania wynoszącą 120Hz, co gwarantuje niezrównaną jakość obrazu i
          płynność działania interfejsu. Solidna metalowa konstrukcja
          spełniająca normę IP67 zapewnia nie tylko niezawodność, ale także
          odporność na działanie wody, co przekłada się na bezpieczeństwo
          użytkowania w różnych warunkach. Dzięki funkcji optycznej stabilizacji
          obrazu (OIS), użytkownik może cieszyć się niezwykle ostrościami i
          detalami na swoich zdjęciach, nawet przy trudnych warunkach
          oświetleniowych. Dodatkowo, wbudowana bateria o pojemności 5000 mAh
          zapewnia długotrwałą pracę urządzenia, eliminując konieczność częstego
          ładowania.
        </p>
      </ContentWrapper>
    </>
  );
};

export default page;
