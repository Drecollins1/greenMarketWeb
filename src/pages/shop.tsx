"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Newsletter from "@/components/newsletter/Newsletter";
import { getProducts } from "@/services/products";
import ProductCard from "@/components/products/ProductCard";
import { UIProduct } from "@/types/product";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

const PER_PAGE = 24;

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // -----------------------------
  // FETCH PRODUCTS
  // -----------------------------
  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
  
      const res = await getProducts({
        page,
        per_page: PER_PAGE,
      });
  
      // Check if res is null or undefined
      if (!res) {
        console.error("No products data received");
        return;
      }
  
      // Check if res.data exists and is an array
      const productsArray = Array.isArray(res.data) ? res.data : [];
  
      // ✅ CRITICAL FIX: map API → UI product
      const formattedProducts: UIProduct[] = productsArray.map((p: any) => ({
        id: p.id,
        name: p.title,
        price: p.price,
        image: p.thumbnail || p.images?.[0] || "/placeholder.png",
        vendor: p.business?.name || p.user?.name || "Unknown",
        rating: p.business?.rating ?? 0,
      }));
  
      console.log("Formatted products:", formattedProducts); // Debug log
  
      setProducts(formattedProducts);
      setCurrentPage(res.current_page || 1);  // Use res.current_page instead of res.data.current_page
      setLastPage(res.last_page || 1);        // Use res.last_page instead of res.data.last_page
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + category change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [categoryParam]);

  // -----------------------------
  // PAGINATION HANDLERS
  // -----------------------------
  const nextPage = () => {
    if (currentPage < lastPage) {
      fetchProducts(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section
        className="relative bg-cover bg-center py-16 px-4 mb-10"
        style={{ backgroundImage: "url('/assets/Footer.png')" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-emerald-600 font-bold text-3xl">Shop</p>
          <p className="text-gray-600 text-sm mt-2">
            Showing products from marketplace
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
              <div className="flex justify-center items-center gap-4 mb-12">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm font-medium">
                  Page {currentPage} of {lastPage}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === lastPage}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
