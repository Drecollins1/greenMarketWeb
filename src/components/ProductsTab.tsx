import React from "react";
import { ProductData } from "@/types/product";
import Image from "next/image";

interface Props {
  products: ProductData | null;
  isLoading: boolean;
}

const ProductsTab: React.FC<Props> = ({ products, isLoading }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Products</h2>

      {isLoading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.data?.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg">
              <Image
                src={product.images?.[0]}
                className="h-32 w-full object-cover rounded-lg"
                width={60}
                height={60}
                alt={product.name}
              />
              <h3 className="mt-2 font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          )) || "No products"}
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
