// app/dashboard/components/WelcomeCard.jsx
'use client'

import { TrendingUp, Database, Award } from 'lucide-react'

export default function WelcomeCard({ user }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {getGreeting()}, <span className="gradient-text">{user.name?.split(' ')[0] || 'User'}</span>!
          </h1>
          <p className="text-gray-400 text-lg">
            Welcome to your dashboard. Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2">
              <Database className="text-white" size={28} />
            </div>
            <p className="text-2xl font-bold text-white">1000+</p>
            <p className="text-xs text-gray-400">Datasets</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="text-white" size={28} />
            </div>
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-xs text-gray-400">Access</p>
          </div>
        </div>
      </div>
    </div>
  )
}