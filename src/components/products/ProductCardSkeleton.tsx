import React from "react";
const ProductCardSkeleton = () => (
  <div className="animate-pulse rounded-lg p-4 bg-white shadow-md">
    <div className="h-32 bg-gray-200 rounded mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export default ProductCardSkeleton;

