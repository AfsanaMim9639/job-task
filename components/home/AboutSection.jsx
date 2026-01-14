// components/home/AboutSection.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1C2B39]">About ItemHub</h2>
            <p className="text-lg text-gray-600 mb-6">
              ItemHub was created with a simple mission: to make item management easy, efficient, and accessible to everyone. Whether you're managing inventory, tracking personal belongings, or organizing collections, we've got you covered.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our platform combines powerful features with an intuitive design, ensuring you spend less time organizing and more time doing what matters.
            </p>
            <a href="#services" className="inline-flex items-center text-[#2D3D52] font-semibold hover:text-[#415169] transition">
              Explore Services <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </div>
          <div className="bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-2xl p-12 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ChevronRight className="w-6 h-6 mr-2 flex-shrink-0" />
                <span>10,000+ satisfied users worldwide</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-6 h-6 mr-2 flex-shrink-0" />
                <span>99.9% uptime guarantee</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-6 h-6 mr-2 flex-shrink-0" />
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-6 h-6 mr-2 flex-shrink-0" />
                <span>Regular updates and new features</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;