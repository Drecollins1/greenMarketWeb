// components/about/SafetySection.tsx
import Image from "next/image";
import {
  Shield,
  Lock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function SafetySection() {
  return (
    <div className="relative py-20 md:py-16 px-4 bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Safety Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Illustration */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-200 to-teal-200 rounded-[3rem] blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-[3rem] p-8  border border-emerald-100">
                <div className="relative h-87.5 md:h-100 flex items-center justify-center">
                  <Image
                    src="/assets/undraw5.svg"
                    alt="Safety on GreenMarket"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Safety Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
              <Shield className="w-4 h-4" />
              <span>Your Security Matters</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Safety
              </span>{" "}
              First
            </h2>

            <div className="space-y-6">
              {/* General Safety */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      1. General
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We prioritize on the security and can solve any issues in
                      short-terms. That's why we ask you, kindly, to leave a
                      review after purchasing. If you run into any problems with
                      a seller, you can report to us and team will check this
                      seller as soon as possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Safety Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      2. Personal safety tips
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>
                          Do not pay in advance, even for the delivery
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Try to meet at a safe, public location</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Check the item BEFORE you buy it</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Pay only after collecting the item</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Secure Payments */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      3. Secure Payments
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Greenmarket provides{" "}
                      <span className="font-semibold text-teal-600">
                        Premium Services
                      </span>{" "}
                      for those who want to increase sales and earn more money.
                      We accept both online and offline payments for these
                      services.
                    </p>
                    <div className="bg-linear-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        We guarantee secure and reliable payments on Greenmarket
                        with our{" "}
                        <span className="font-semibold text-teal-700">
                          ESCROW SERVICE
                        </span>
                        . If both parties (Buyer & Seller) agree, we can help
                        hold the money until the buyer confirm receipt before we
                        release the money to the seller.{" "}
                        <Link
                          href="/howEscrowWorks"
                          className="text-teal-600 font-semibold hover:text-teal-700 underline"
                        >
                          Use Escrow Here!
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sell Like a Pro Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
              Sell like a Pro on{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                GreenMarket
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Tips */}
            <div className="space-y-6">
              {/* Tip 1 */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      It is important to pay attention to the details
                    </h3>
                    <p className="text-sm text-gray-600">
                      Make good photos of your goods, write clear and detailed
                      description.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip 2 */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Answer quickly
                    </h3>
                    <p className="text-sm text-gray-600">
                      Don't make your buyer wait for your message for days. Be
                      online or get{" "}
                      <span className="font-semibold text-emerald-600">
                        SMS notifications
                      </span>{" "}
                      on your messages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip 3 */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Use Premium Services to get 10x customers
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your adverts will appear at the top of the page and you
                      will sell faster!{" "}
                      <a
                        href="#"
                        className="text-emerald-600 font-semibold hover:text-emerald-700 underline"
                      >
                        How does it work?
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Money Illustration */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-300 to-teal-300 rounded-[3rem] blur-2xl opacity-20"></div>
              <div className="relative bg-linear-to-br from-emerald-50 to-teal-50 rounded-[3rem] p-8  border border-emerald-100">
                <div className="relative h-87.5 md:h-100 flex items-center justify-center">
                  <Image
                    src="/assets/undraw1.svg"
                    alt="Earn Money on GreenMarket"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-emerald-500">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        10x
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        More Visibility
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
