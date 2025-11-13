import React from 'react';
import { ShieldAlert, Eye, Ban, MapPin, FileCheck, Users, Phone, Camera } from 'lucide-react';

export default function SafetyMeasuresSection() {
  const buyerSafety = [
    {
      icon: Eye,
      title: "Inspect Before Payment",
      description: "Always check the product thoroughly before making any payment. Verify quality, quantity, and condition."
    },
    {
      icon: Ban,
      title: "No Advance Payment",
      description: "Never pay in advance, even for delivery costs. Only pay when you receive and verify the goods."
    },
    {
      icon: MapPin,
      title: "Meet in Public Places",
      description: "Always arrange to meet in well-lit, public locations like markets, shopping centers, or busy streets."
    },
    {
      icon: FileCheck,
      title: "Verify Seller Identity",
      description: "Check the seller's profile, ratings, and reviews. Ask for identification if necessary."
    },
    {
      icon: Camera,
      title: "Document Everything",
      description: "Take photos or videos of the product during inspection as proof of condition and transaction."
    },
    {
      icon: Phone,
      title: "Use Platform Communication",
      description: "Keep all communication within the platform for security and dispute resolution purposes."
    }
  ];

  const sellerSafety = [
    {
      icon: Users,
      title: "Verify Buyer Information",
      description: "Confirm buyer's identity and contact details before arranging a meeting or delivery."
    },
    {
      icon: MapPin,
      title: "Choose Safe Meeting Spots",
      description: "Select public, well-populated locations for transactions. Avoid isolated or unfamiliar areas."
    },
    {
      icon: ShieldAlert,
      title: "Use Escrow Protection",
      description: "Always use escrow services to ensure payment is secured before delivering goods."
    },
    {
      icon: FileCheck,
      title: "Prepare Documentation",
      description: "Have receipts, certificates, or proof of authenticity ready for high-value items."
    },
    {
      icon: Ban,
      title: "Don't Release Goods Early",
      description: "Only hand over products after confirming payment has been received and verified."
    },
    {
      icon: Camera,
      title: "Record Transaction Details",
      description: "Keep records of communications, agreements, and transaction evidence for your protection."
    }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Safety Measures for Transactions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these essential guidelines to protect yourself and ensure safe, secure transactions for both buyers and sellers.
          </p>
        </div>

        {/* Safety Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* For Buyers */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Safety Tips for Buyers</h3>
            </div>
            <div className="space-y-4">
              {buyerSafety.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* For Sellers */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <ShieldAlert className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Safety Tips for Sellers</h3>
            </div>
            <div className="space-y-4">
              {sellerSafety.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Important Warning Banner */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-gray-900 mb-2">⚠️ Important Safety Reminder</h4>
              <div className="text-gray-700 space-y-2">
                <p className="font-semibold">If something feels wrong, trust your instincts and walk away.</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Report suspicious activity or users immediately to our support team</li>
                  <li>Never share personal banking details or OTPs with anyone</li>
                  <li>Be wary of deals that seem too good to be true</li>
                  <li>Always use the platform's official escrow service for payment protection</li>
                  <li>Keep a record of all conversations and agreements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}