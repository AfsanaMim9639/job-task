// app/contributor-dashboard/components/ContributorStats.jsx
'use client'

import { Upload, CheckCircle, Eye, Download } from 'lucide-react'

export default function ContributorStats({ stats }) {
  const cards = [
    {
      title: 'Total Uploads',
      value: stats.totalUploads,
      icon: Upload,
      color: 'from-blue-500 to-blue-600',
      change: 'This month: +' + stats.monthlyUploads
    },
    {
      title: 'Active Datasets',
      value: stats.activeDatasets,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: stats.pendingDatasets + ' pending'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      change: '+' + stats.viewGrowth + '% this week'
    },
    {
      title: 'Total Downloads',
      value: stats.totalDownloads,
      icon: Download,
      color: 'from-orange-500 to-orange-600',
      change: '+' + stats.downloadGrowth + '% this week'
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
            </div>
            <h3 className="text-gray-400 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
            <p className="text-xs text-gray-500">{card.change}</p>
          </div>
        )
      })}
    </div>
  )
}