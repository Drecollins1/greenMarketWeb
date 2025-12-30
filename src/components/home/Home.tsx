"use client";

import ProductCard from "@/components/products/ProductCard";
import React from "react";
import Hero from "./Hero";
import Image from "next/image";
import { UIProduct } from "@/types/product";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

type Category = {
  label: string;
  icon: string;
  color?: string;
  slug: string;
  id: number;
};

type HomeProps = {
  products: UIProduct[];
  categories: Category[];
  loading?: boolean;
  currentPage: number;
  lastPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export default function Home({
  products,
  categories,
  loading,
  currentPage,
  lastPage,
  onNextPage,
  onPrevPage,
}: HomeProps) {
  return (
    <div className="space-y-8">
      <Hero />

      {/* Mobile categories */}
      <div className="lg:hidden -mx-4 px-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
          {categories.slice(0, 16).map((c) => (
            <button
              key={c.id}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 text-xs"
            >
              <Image src={c.icon} alt={c.label} width={16} height={16} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-lg my-5 font-semibold">Popular Products</h2>

{loading ? (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, idx) => (
      <ProductCardSkeleton key={idx} />
    ))}
  </div>
) : products.length === 0 ? (
  <p className="text-center text-gray-500 py-10">
    No products available
  </p>
) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* ✅ Pagination UI */}
            {lastPage > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={onPrevPage}
                  disabled={currentPage === 1}
                  className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm font-medium">
                  Page {currentPage} of {lastPage}
                </span>

                <button
                  onClick={onNextPage}
                  disabled={currentPage === lastPage}
                  className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
