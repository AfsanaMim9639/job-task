// app/admin/components/StatsCards.jsx
'use client'

import { Database, Users, Upload, TrendingUp } from 'lucide-react'

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Total Datasets',
      value: stats.totalDatasets,
      change: '+12%',
      icon: Database,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+8%',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Monthly Uploads',
      value: stats.monthlyUploads,
      change: '+23%',
      icon: Upload,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Downloads',
      value: stats.totalDownloads,
      change: '+15%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
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