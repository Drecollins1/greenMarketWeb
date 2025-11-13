// components/about/AboutHero.tsx
import Image from "next/image";

const features = [
  {
    icon: "/assets/icon-1.svg.png",
    title: "Free Sign-Up, Unlimited Opportunities",
    description:
      "Anyone can join GreenMarket for free! Create an account, upload your products, and instantly connect with serious buyers and sellers across the country.",
  },
  {
    icon: "/assets/icon-2.svg.png",
    title: "Buy & Sell Agro Products with Ease",
    description:
      "GreenMarket connects farmers, traders, and buyers to one simple platform. Whether you want to sell your harvest or buy fresh produce, everything you need is just a click away.",
  },
  {
    icon: "/assets/icon-3.svg.png",
    title: "Safe Transactions with Escrow",
    description:
      "Worried about trust? With our escrow system, your money is safe. Payments are held securely until the buyer confirms the goods, ensuring a fair and transparent deal for both parties.",
  },
  {
    icon: "/assets/icon-4.svg.png",
    title: "Reach More Buyers, Grow Your Market",
    description:
      "Expand beyond your local community. GreenMarket gives you access to thousands of buyers looking for quality farm products, helping you increase sales and profits.",
  },
  {
    icon: "/assets/icon-5.svg.png",
    title: "A Trusted Farmers' Community",
    description:
      "More than just a marketplace, GreenMarket builds a strong community of farmers, traders, and buyers—each AgriCertiA verified, trustworthy, and supportive.",
  },
  {
    icon: "/assets/icon-6.svg.png",
    title: "Easy-to-Use Platform",
    description:
      "No stress, no complications. GreenMarket is designed to be farmer-friendly and accessible on both web and mobile. Upload products, chat with buyers, and close deals—whether you're on your phone or computer.",
  },
];

export default function WhatWeProvide() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What We Provide?
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-8 bg-emerald-200 rounded"></div>
            <div className="h-1 w-12 bg-emerald-400 rounded"></div>
            <div className="h-1 w-8 bg-emerald-200 rounded"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl flex items-center justify-center mb-6">
                {/* <span className="text-3xl md:text-4xl">{feature.icon}</span> */}
                <Image src={feature.icon} alt="Greenmarket icon" width={100} height={100} priority/>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl text-center font-bold text-gray-900 mb-4 leading-snug">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
