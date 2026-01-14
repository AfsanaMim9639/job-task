// components/home/CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1C2B39]">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of users who are already managing their items efficiently
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105">
            Start Free Trial
          </a>
          <a href="#contact" className="bg-slate-100 text-[#2D3D52] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-200 transition border-2 border-slate-200">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;