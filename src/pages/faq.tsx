// pages/faq.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

interface AccordionSection {
  id: number;
  title: string;
  content: React.ReactNode;
}

const AccordionItem: React.FC<{ section: AccordionSection; isOpen: boolean; onToggle: () => void }> = ({ section, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex justify-between items-center"
      >
        {section.title}
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200`}
      >
        <div className="p-6">{section.content}</div>
      </div>
    </div>
  );
};

const FaqPage: NextPage = () => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([1])); // Open first section by default

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const sections: AccordionSection[] = [
    {
      id: 1,
      title: 'What is GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          GreenMarket is an online marketplace that connects buyers and sellers of agricultural products and services. It provides a platform for farmers, suppliers, and other industry players to sell their goods and services to a wider audience.
        </p>
      ),
    },
    {
      id: 2,
      title: 'What types of agricultural products are available on GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          GreenMarket offers a wide range of agricultural products, including fresh produce, grains, livestock, farm machinery, and more. You can also find organic and sustainable products on the platform.
        </p>
      ),
    },
    {
      id: 3,
      title: 'Can I sell my agricultural products on GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          Yes, if you are a farmer, supplier, or distributor of agricultural products, you can sell your products on GreenMarket. You need to register as a seller and provide the necessary details about your products.
        </p>
      ),
    },
    {
      id: 4,
      title: 'How do I make payments on GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          GreenMarket supports various payment methods, including credit/debit cards, online bank transfers, and mobile money. You can choose the payment method that suits you best.
        </p>
      ),
    },
    {
      id: 5,
      title: 'How do I know the quality of the products I am buying?',
      content: (
        <p className="text-sm text-gray-700">
          GreenMarket has a quality assurance program that ensures all products sold on the platform meet certain standards. The platform also allows buyers to leave reviews and ratings of the products they have purchased, which can help you make informed decisions.
        </p>
      ),
    },
    {
      id: 6,
      title: 'How is shipping handled on GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          Shipping is handled by the individual sellers on GreenMarket. Each seller has their own shipping policies and procedures, so you need to check with the seller before making a purchase.
        </p>
      ),
    },
    {
      id: 7,
      title: 'Is GreenMarket available in my country?',
      content: (
        <p className="text-sm text-gray-700">
          GreenMarket is available in many countries around the world. You can check if the platform is available in your country by visiting the GreenMarket website.
        </p>
      ),
    },
    {
      id: 8,
      title: 'How do I contact customer support on GreenMarket?',
      content: (
        <p className="text-sm text-gray-700">
          You can contact GreenMarket customer support through the platform's contact page or by emailing support@greenmarket.com.
        </p>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Frequently Asked Questions (FAQ) - Greenmarket.com.ng</title>
        <meta name="description" content="Frequently Asked Questions about GreenMarket" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions (FAQ)</h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about GreenMarket.
            </p>
          </header>

          <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="space-y-4">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  section={section}
                  isOpen={openSections.has(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>

            <footer className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: November 07, 2025
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;