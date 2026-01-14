// components/layout/Footer.jsx
import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1C2B39] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">ItemHub</span>
            </div>
            <p className="text-gray-400">Manage your items effortlessly with our powerful platform.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-[#5E6D88] transition">Features</a></li>
              <li><a href="/items" className="hover:text-[#5E6D88] transition">Items</a></li>
              <li><a href="#services" className="hover:text-[#5E6D88] transition">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-[#5E6D88] transition">About</a></li>
              <li><a href="#contact" className="hover:text-[#5E6D88] transition">Contact</a></li>
              <li><a href="#" className="hover:text-[#5E6D88] transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#5E6D88] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#5E6D88] transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#5E6D88] transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#415169] pt-8 text-center text-gray-400">
          <p>&copy; 2026 ItemHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;