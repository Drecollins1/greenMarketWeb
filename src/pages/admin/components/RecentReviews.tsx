import React from 'react';
import ReviewCard from './ReviewCard';

export default function RecentReviews() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
      </div>
      <div className="space-y-4">
        <ReviewCard
          name="Johneth Sidesley"
          rating={4}
          comment="Very nice glasses, I ordered for my friend."
        />
        <ReviewCard
          name="Sarah Mitchell"
          rating={5}
          comment="Excellent quality products and fast delivery!"
        />
        <ReviewCard
          name="Michael Chen"
          rating={4}
          comment="Good service overall, would recommend."
        />
      </div>
    </div>
  );
}
