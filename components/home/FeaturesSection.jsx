// components/home/FeaturesSection.jsx
import React from 'react';
import { Shield, Zap, Users, BarChart3, Star, List } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { icon: Shield, title: 'Secure Storage', desc: 'Your data is encrypted and safely stored' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Access your items instantly from anywhere' },
    { icon: Users, title: 'Collaboration', desc: 'Share and collaborate with your team' },
    { icon: BarChart3, title: 'Analytics', desc: 'Track usage and get insights on your items' },
    { icon: Star, title: 'Easy to Use', desc: 'Intuitive interface designed for everyone' },
    { icon: List, title: 'Organization', desc: 'Categorize and filter items efficiently' }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1C2B39]">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to manage your items efficiently</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl hover:shadow-xl transition transform hover:scale-105 border border-slate-200">
              <feature.icon className="w-12 h-12 text-[#2D3D52] mb-4" />
              <h3 className="text-xl font-bold mb-2 text-[#1C2B39]">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;