// components/home/ServicesSection.jsx
import React from 'react';

const ServicesSection = () => {
  const services = [
    { title: 'Item Tracking', desc: 'Track all your items in real-time' },
    { title: 'Categorization', desc: 'Organize items into custom categories' },
    { title: 'Search & Filter', desc: 'Find items quickly with advanced search' },
    { title: 'Cloud Sync', desc: 'Access from any device, anywhere' },
    { title: 'Bulk Operations', desc: 'Manage multiple items at once' },
    { title: 'Export Data', desc: 'Download your data anytime' },
    { title: 'API Access', desc: 'Integrate with your existing tools' },
    { title: 'Custom Reports', desc: 'Generate detailed reports' }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1C2B39]">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for all your needs</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#2D3D52] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-lg flex items-center justify-center text-white font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1C2B39]">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;