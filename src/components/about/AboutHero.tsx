import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-linear-to-br from-emerald-50 to-teal-50 py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative h-75 md:h-100 lg:h-125 rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/assets/greenAbt.jpg"
              alt="Farmers selling at GreenMarket"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#39B54A] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🌾</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  GreenMarket
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              GreenMarket is the best place to sell{" "}
              <span className="text-emerald-600">
                Agricultural Products to serious buyers.
              </span>
            </h1>

            <div className="space-y-4 text-gray-700">
              <p className="text-base  leading-relaxed">
                GreenMarket is the best place to sell Agricultural Products to
                serious buyers. GM is the biggest & No 1. free online market for
                farmers with an advanced security system. We provide a simple
                hassle-free solution to sell and buy for our local farmers.
              </p>

              <p className="text-base  leading-relaxed">
                At GreenMarket, we make it simple for farmers to sell and buyers
                to purchase fresh agro products with ease. Our platform is
                transparent, reliable, and built with farmers in mind. To keep
                every transaction safe, we use an escrow system—buyers pay
                through GreenMarket first, and funds are only released to
                sellers once delivery is confirmed. This ensures trust,
                fairness, and peace of mind for everyone. GreenMarket isn’t just
                a marketplace—it’s a community where farmers grow, buyers
                connect, and quality produce reaches the right hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
