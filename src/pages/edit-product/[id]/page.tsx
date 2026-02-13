'use client';

import EditProductForm from '@/components/EditProductForm';
import { useParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EditProductPage() {
  const params = useParams();
  console.log("EditProductPage reached, params:", params);

  const productId =
    typeof params?.id === 'string' ? params.id : null;

  if (!productId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Invalid product ID</p>
      </div>
    );
  }

  return <EditProductForm productId={productId} />;
}
