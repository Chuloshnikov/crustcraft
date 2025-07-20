'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BestSellersCard from './BestSellersCard';
import Link from 'next/link';
import { getProducts } from '@/helpers';
import { IMenuItem } from '@/models/MenuItem';


const getRandomItems = (arr: IMenuItem[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const BestSellersSection = () => {
  const [products, setProducts] = useState<IMenuItem[]>([]);
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        const randomFour = getRandomItems(allProducts, 4);
        setProducts(randomFour);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold mb-2">CHECK OUT</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pizzas, crafted with the finest ingredients and perfected over years of culinary
            expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <BestSellersCard key={index} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/menu"}>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border-orange-200 text-orange-600 hover:bg-orange-50 px-8"
            >
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;