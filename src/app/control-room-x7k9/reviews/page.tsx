'use client';

import React, { useState, useEffect } from 'react';
import { Review } from '@/types';
import { Star, Check, Trash2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = () => {
    fetch('/api/reviews?all=true')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setReviews(data));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Customer Reviews Moderation
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Review customer feedback, ratings, and testimonials.
        </p>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{rev.customer_name}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-400">{new Date(rev.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex text-neutral-900 dark:text-neutral-100">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {rev.comment}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-900 text-[11px]">
              <span className="font-mono text-neutral-400">Target Product: {rev.product_id}</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-semibold">
                Approved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
