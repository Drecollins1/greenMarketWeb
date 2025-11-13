// components/newsletter/Newsletter.tsx
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add your newsletter subscription logic here
    console.log("Subscribing email:", email);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className=" px-4 md:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  Buy and Sell Fresh Farm Products Anytime, Anywhere.
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Don't Miss Out! Get Daily Agro Updates from GreenMarket.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#39B54A] hover:bg-emerald-700 text-white font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Image - Hide on mobile, show on large screens */}
            <div className="relative h-[300px] lg:h-[250px] hidden lg:block">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/newsletter.png"
                  alt="Delivery person with fresh produce"
                  fill
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}