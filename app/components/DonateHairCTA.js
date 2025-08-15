"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Tanzania from "./tanzania";

export default function DonateHairCTA() {
  const steps = [
    {
      title: "Collect",
      description: "Save clean, dry hair from your salon or haircuts"
    },
    {
      title: "Package",
      description: "Place in a clean, sealed container"
    },
    {
      title: "Drop Off",
      description: "Bring to our collection points or request pickup"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-brand-green/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block py-1.5 px-6 bg-brand-green/10 rounded-full text-brand-green font-medium text-sm mb-4">
              Donate Hair
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Turn Hair Waste Into 
              <br />
              <span className="text-brand-green">Agricultural Gold</span>
            </h2>
            
            <div className="space-y-6 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-black">{step.title}</h4>
                    <p className="text-sm text-brand-black/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link 
              href="/send"
              className="inline-flex items-center px-6 py-3 bg-brand-green text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Find Nearest Collection Point
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/Images/Photos/tuleteenywele.jpg"
                alt="Hair donation impact"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
