// components/home/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#2D3D52] via-[#415169] to-[#5E6D88] bg-clip-text text-transparent">
          Manage Your Items Effortlessly
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The ultimate platform to organize, track, and manage all your items in one beautiful interface
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105">
            Get Started Free
          </a>
          <a href="#features" className="bg-white text-[#2D3D52] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition border-2 border-[#2D3D52]">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;