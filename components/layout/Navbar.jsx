'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Datasets', href: '#datasets' },
    { name: 'Visualizations', href: '#visualizations' },
    { name: 'Insights', href: '#insights' },
    { name: 'API', href: '#api' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
            <span className="text-xl font-bold gradient-text whitespace-nowrap">Open Data</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#00d4ff] transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Sign In Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-5 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm rounded-lg font-semibold hover:scale-105 transition-transform whitespace-nowrap">
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#00d4ff]/10">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <button className="sm:hidden mt-3 px-5 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm rounded-lg font-semibold hover:scale-105 transition-transform text-center">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}