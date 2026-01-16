// app/dashboard/components/RecommendedDatasets.jsx
'use client'

import { TrendingUp, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function RecommendedDatasets({ recommendations }) {
  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
            <p className="text-gray-400 text-sm">Based on your interests</p>
          </div>
          <TrendingUp className="text-[#00d4ff]" size={24} />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((dataset) => (
            <Link
              key={dataset.id}
              href={`/datasets/${dataset.slug}`}
              className="group p-4 bg-[#0d1428] border border-[#00d4ff]/5 rounded-lg hover:border-[#00d4ff]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold group-hover:text-[#00d4ff] transition-colors line-clamp-2 flex-1">
                  {dataset.title}
                </h3>
                <ArrowRight className="text-gray-500 group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" size={18} />
              </div>
              
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {dataset.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full">
                  {dataset.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-semibold">{dataset.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}