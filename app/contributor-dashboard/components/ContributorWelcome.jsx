// app/contributor-dashboard/components/ContributorWelcome.jsx
'use client'

import { Upload, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ContributorWelcome({ user, stats }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {getGreeting()}, <span className="gradient-text">{user.name?.split(' ')[0] || 'Contributor'}</span>!
            </h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30 uppercase">
              Contributor
            </span>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            Thanks for contributing to Bangladesh's open data platform
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            <Upload size={20} />
            Upload New Dataset
          </Link>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2">
              <Upload className="text-white" size={28} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalUploads}</p>
            <p className="text-xs text-gray-400">Uploads</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="text-white" size={28} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.activeDatasets}</p>
            <p className="text-xs text-gray-400">Active</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-2">
              <Award className="text-white" size={28} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalDownloads}</p>
            <p className="text-xs text-gray-400">Downloads</p>
          </div>
        </div>
      </div>
    </div>
  )
}