import ProductCard, { Product } from "@/components/products/ProductCard";
import React from "react";
import Hero from "./Hero";

type Category = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Home({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="space-y-8">
      <Hero />

      {/* Mobile categories chips */}
      <div className="lg:hidden -mx-4 px-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
          {categories.slice(0, 12).map((c) => (
            <button key={c.label} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 text-xs">
              <c.icon className="size-3 text-emerald-600" /> {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Trending Products</h2>
          <a href="#" className="text-sm text-emerald-700">See all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg my-5 font-semibold">Popular Products</h2>
          <a href="#" className="text-sm text-emerald-700">See all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
