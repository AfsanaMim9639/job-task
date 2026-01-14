// components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, Home, List, Info, Briefcase, Phone, Star, Zap } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo & Name */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#2D3D52] to-[#415169] bg-clip-text text-transparent">
              ItemHub
            </span>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#features" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>Features</span>
            </a>
            <a href="/items" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <List className="w-4 h-4" />
              <span>Items</span>
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <Info className="w-4 h-4" />
              <span>About</span>
            </a>
            <a href="#services" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>Services</span>
            </a>
            <a href="#contact" className="text-gray-700 hover:text-[#2D3D52] transition flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Right - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <a href="/login" className="text-gray-700 hover:text-[#2D3D52] transition font-medium">
                  Login
                </a>
                <a href="/register" className="bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-5 py-2 rounded-lg hover:shadow-lg transition">
                  Sign Up
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-[#2D3D52] transition font-medium"
                >
                  Logout
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition">
                  JD
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">Home</a>
              <a href="#features" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">Features</a>
              <a href="/items" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">Items</a>
              <a href="#about" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">About</a>
              <a href="#services" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-[#2D3D52] transition px-4 py-2">Contact</a>
              <div className="border-t pt-3 px-4 space-y-2">
                {!isLoggedIn ? (
                  <>
                    <a href="/login" className="block text-gray-700 hover:text-[#2D3D52] transition py-2">Login</a>
                    <a href="/register" className="block bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-5 py-2 rounded-lg text-center">Sign Up</a>
                  </>
                ) : (
                  <>
                    <button onClick={onLogout} className="block w-full text-left text-gray-700 hover:text-[#2D3D52] transition py-2">Logout</button>
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2D3D52] to-[#415169] rounded-full flex items-center justify-center text-white font-semibold">JD</div>
                      <span className="font-medium">Profile</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;