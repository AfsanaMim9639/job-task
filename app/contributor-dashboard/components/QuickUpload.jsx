// app/contributor-dashboard/components/QuickUpload.jsx
'use client'

import { Upload, FileText, TrendingUp, Award, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default function QuickUpload() {
  const actions = [
    {
      title: 'Upload Dataset',
      description: 'Add new data',
      icon: Upload,
      href: '/upload',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Guidelines',
      description: 'Upload best practices',
      icon: FileText,
      href: '#',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'My Performance',
      description: 'View analytics',
      icon: TrendingUp,
      href: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Leaderboard',
      description: 'Top contributors',
      icon: Award,
      href: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        <p className="text-gray-400 text-sm">Contributor tools and resources</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                href={action.href}
                className="group p-4 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg hover:border-[#00d4ff]/30 transition-all hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-gray-400 text-xs">{action.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Contribution Tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#00d4ff]/10 to-[#0066ff]/10 border border-[#00d4ff]/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <LinkIcon size={16} className="text-[#00d4ff]" />
            Contribution Tip
          </h4>
          <p className="text-gray-400 text-sm">
            Ensure your datasets have clear titles and descriptions. Well-documented data 
            gets 3x more downloads!
          </p>
        </div>
      </div>
    </div>
  )
}