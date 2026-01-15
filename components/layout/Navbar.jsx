'use client'

import { Menu, X, User, LogOut, LayoutDashboard, Database, Upload, Shield, FileText, Settings, Info, Mail, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const { data: session, status } = useSession()
  
  const profileMenuRef = useRef(null)
  const moreMenuRef = useRef(null)

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Public routes - accessible to everyone
  const publicLinks = [
    { name: 'Datasets', href: '/datasets', icon: Database },
    { name: 'Indicators', href: '/indicators', icon: TrendingUp },
    { name: 'Map', href: '/map', icon: FileText },
    { name: 'Insights', href: '/insights', icon: FileText },
    { name: 'About', href: '/about', icon: Info },
  ]

  const moreLinks = [
    { name: 'API Docs', href: '/api-docs', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Mail }
  ]

  // Protected routes based on role
  const getProtectedLinks = (role) => {
    const links = []

    // All authenticated users
    if (role) {
      links.push({ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard })
    }

    // Contributors and Admins can upload
    if (role === 'contributor' || role === 'admin') {
      links.push({ name: 'Upload Data', href: '/upload', icon: Upload })
    }

    // Only Admins
    if (role === 'admin') {
      links.push({ name: 'Admin Panel', href: '/admin', icon: Shield })
    }

    return links
  }

  const userRole = session?.user?.role || null
  const protectedLinks = getProtectedLinks(userRole)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'contributor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
            <span className="text-xl font-bold gradient-text whitespace-nowrap">Open Data</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#00d4ff] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="text-sm text-gray-300 hover:text-[#00d4ff] transition-colors whitespace-nowrap"
              >
                More
              </button>
              {showMoreMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg shadow-lg py-2 z-20">
                  {moreLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setShowMoreMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                      >
                        <Icon size={16} />
                        {link.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Protected Links */}
            {protectedLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#00d4ff] transition-colors whitespace-nowrap"
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              )
            })}
          </div>
          
          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-[#1a2332] animate-pulse"></div>
            ) : session ? (
              // Logged In - Profile Menu
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg hover:bg-[#1f2937] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-sm text-white font-medium">
                    {session.user.name?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg shadow-lg py-2 z-20">
                    <div className="px-4 py-3 border-b border-[#00d4ff]/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white">{session.user.name}</p>
                        {userRole && (
                          <span className={`px-2 py-1 text-xs rounded-full border ${getRoleBadgeColor(userRole)} uppercase font-semibold`}>
                            {userRole}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    </div>
                    
                    {protectedLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                        >
                          <Icon size={16} />
                          {link.name}
                        </Link>
                      )
                    })}
                    
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    
                    <Link
                      href="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    
                    <div className="border-t border-[#00d4ff]/10 mt-2 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-red-400 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not Logged In - Sign In Button
              <Link
                href="/login"
                className="hidden sm:block px-5 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm rounded-lg font-semibold hover:scale-105 transition-transform whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

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
              {/* Public Links */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-semibold px-2">Menu</p>
                {publicLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2 px-2"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {moreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2 px-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {session ? (
                <>
                  {/* Protected Links */}
                  {protectedLinks.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-[#00d4ff]/10">
                      <p className="text-xs text-gray-500 uppercase font-semibold px-2">Your Access</p>
                      {protectedLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2 px-2"
                          >
                            <Icon size={16} />
                            {link.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                  
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2 px-2"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#00d4ff] transition-colors py-2 px-2"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleSignOut()
                    }}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 transition-colors py-2 px-2 text-left mt-3 border-t border-[#00d4ff]/10 pt-3"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 px-5 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm rounded-lg font-semibold hover:scale-105 transition-transform text-center block"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}