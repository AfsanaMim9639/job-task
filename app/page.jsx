// app/page.jsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here (e.g., clear tokens, redirect, etc.)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <StatsSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}