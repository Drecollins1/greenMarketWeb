import React from 'react';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
}

export default function ReviewCard({ name, rating, comment }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <span className="text-green-600 font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{comment}</p>
        </div>
      </div>
    </div>
  );
}
