// components/about/HowToSellBuy.tsx
import Image from "next/image";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const sellSteps = [
  {
    number: "1",
    title: "Sign Up",
    description:
      "Register using your correct e-mail and phone number. It's important to enter your correct phone number, so your clients could reach you!",
    icon: "/assets/user.png",
  },
  {
    number: "2",
    title: "Take clear photos of your item",
    description:
      "Make a lot of photos using your smartphone. Make sure they show your item in the best light.",
    icon: "/assets/camera.png",
  },
  {
    number: "3",
    title: "Press POST AD",
    description:
      "Select a correct category, upload your photos and write a clear title and full description of your item. Enter a fair price, and send your advert to us for review.",
    icon: "/assets/document.png",
  },
  {
    number: "4",
    title: "Respond to the messages and calls from your buyers",
    description:
      "If everything is ok with your advert, it'll be on GreenMarket in a couple of hours and thousands of potential buyers will see it. You'll get a notification when your advert goes live. Check your messages and be ready to earn money! Do you want to sell like a pro? Check out our Premium Packages.",
    icon: "/assets/response.png",
  },
];

const buySteps = [
  {
    number: "1",
    title: "Search for the Product",
    description:
      "Find what you need using search panel and filters. We have hundreds of adverts, choose exactly what you are looking for.",
    icon: "/assets/search.png",
  },
  {
    number: "2",
    title: "Contact a seller",
    description:
      "You may use chat on Greenmarket or call them via phone. Discuss all the details, negotiate about the price.",
    icon: "/assets/message.png",
  },
  {
    number: "3",
    title: "Stay Safe — Use Escrow for Every Purchase",
    description:
      "Always use our secure Escrow payment system to protect your money. Meet sellers in safe, public places and release payment only after confirming your item.",
    icon: "/assets/safe-payment.png",
  },
  {
    number: "4",
    title: "Leave your feedback about the seller",
    description:
      "Please tell us about your purchase. Your feedback will be published online on the seller's page and will be very helpful for other buyers. Let's build a safe and professional business community together!",
    icon: "/assets/feedback.png",
  },
];

export default function HowToSellBuy() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* How to Sell Section */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-4 h-4" />
              <span>For Sellers</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Start Selling in{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                4 Easy Steps
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of successful sellers on GreenMarket
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Illustration with floating effect */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-400/20 via-teal-400/20 to-green-400/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative bg-linear-to-br from-emerald-50 to-teal-50 rounded-[3rem] p-8">
                <div className="relative h-100 md:h-125">
                  <Image
                    src="/assets/undraw3.svg"
                    alt="Sell Online on GreenMarket"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-emerald-500">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">
                      1000+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Active Sellers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Steps */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                {sellSteps.map((step, index) => (
                  <div key={index} className="group relative">
                    {/* Connecting line */}
                    {index < sellSteps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-12 bg-linear-to-b from-emerald-300 to-transparent"></div>
                    )}

                    <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 cursor-pointer">
                      <div className="flex gap-5">
                        {/* Icon & Number */}
                        <div className="shrink-0">
                          <div className="relative">
                            <div className="w-14 h-14  p-2 rounded-2xl flex items-center justify-center  group-hover:scale-110 transition-transform">
                              <Image
                                src={step.icon}
                                fill
                                alt="Greenmarket Icon"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-emerald-600 shadow-md border-2 border-emerald-500">
                              {step.number}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            {step.title}
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="relative py-20 md:py-28 px-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-4 h-4" />
              <span>For Buyers</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Shop Fresh in{" "}
              <span className="bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Connect directly with verified farmers and sellers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Steps */}
            <div className="order-1">
              <div className="space-y-6">
                {buySteps.map((step, index) => (
                  <div key={index} className="group relative">
                    {/* Connecting line */}
                    {index < buySteps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-12 bg-linear-to-b from-teal-300 to-transparent"></div>
                    )}

                    <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-teal-200 cursor-pointer">
                      <div className="flex gap-5">
                        {/* Icon & Number */}
                        <div className="shrink-0">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Image
                                src={step.icon}
                                alt="Greenmarket Icon"
                                fill
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-teal-600 shadow-md border-2 border-teal-500">
                              {step.number}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors flex items-center gap-2">
                            {step.title}
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-2 relative">
              <div className="absolute inset-0 bg-linear-to-br from-teal-400/20 via-emerald-400/20 to-green-400/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative bg-linear-to-br from-teal-50 to-emerald-50 rounded-[3rem] p-8 ">
                <div className="relative h-100 md:h-125">
                  <Image
                    src="/assets/undraw4.svg"
                    alt="Buy on GreenMarket"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-teal-500">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600">
                      5000+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Happy Buyers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
