'use client'

import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#00d4ff] rounded-full blur-3xl glow-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#0066ff] rounded-full blur-3xl glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/30 rounded-full text-xs sm:text-sm text-[#00d4ff] font-medium">
            🇧🇩 Bangladesh Open Data Initiative
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-5xl px-4">
            Unlock <span className="gradient-text">Bangladesh's</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Data Potential
          </h1>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed px-4">
            Access, visualize, and analyze comprehensive datasets from across Bangladesh. 
            Empowering decisions with real-time insights and interactive visualizations.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 pt-2">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm sm:text-base rounded-lg font-semibold neon-glow hover:scale-105 transition-transform flex items-center justify-center gap-2 whitespace-nowrap">
              Explore Data <ArrowRight size={20} />
            </button>
            <Link href="/api-docs">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#1a2332] text-[#00d4ff] text-sm sm:text-base border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                View Documentation
            </button>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl pt-2 px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search datasets, indicators, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 w-full max-w-4xl px-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">2,500+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Datasets</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">64</div>
              <div className="text-gray-400 text-xs sm:text-sm">Districts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">150+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Indicators</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">50K+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}