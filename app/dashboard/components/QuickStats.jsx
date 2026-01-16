// app/dashboard/components/QuickStats.jsx
'use client'

import { Download, Bookmark, Eye, Clock } from 'lucide-react'

export default function QuickStats({ stats }) {
  const cards = [
    {
      title: 'Downloads',
      value: stats.downloads,
      icon: Download,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Bookmarks',
      value: stats.bookmarks,
      icon: Bookmark,
      color: 'from-purple-500 to-purple-600',
      change: '+5'
    },
    {
      title: 'Views',
      value: stats.views,
      icon: Eye,
      color: 'from-green-500 to-green-600',
      change: '+23%'
    },
    {
      title: 'Last Activity',
      value: stats.lastActivity,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: 'Today'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                <Icon className="text-white" size={24} />
              </div>
              <span className="text-green-400 text-sm font-semibold">{card.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}