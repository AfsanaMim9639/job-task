// components/home/StatsSection.jsx
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500K+', label: 'Items Managed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;