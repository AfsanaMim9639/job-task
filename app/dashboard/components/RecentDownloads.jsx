// app/dashboard/components/RecentDownloads.jsx
'use client'

import { Download, FileText, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function RecentDownloads({ downloads }) {
  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Recent Downloads</h2>
            <p className="text-gray-400 text-sm">Your latest downloaded datasets</p>
          </div>
          <Link href="/datasets" className="text-[#00d4ff] text-sm hover:text-[#0066ff] transition-colors">
            View All
          </Link>
        </div>
      </div>

      <div className="p-6">
        {downloads.length > 0 ? (
          <div className="space-y-4">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-[#0d1428] border border-[#00d4ff]/5 rounded-lg hover:border-[#00d4ff]/20 transition-colors"
              >
                <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-[#00d4ff]" size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Download size={12} />
                      {item.format}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {item.size}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Download className="mx-auto mb-3 text-gray-500 opacity-50" size={48} />
            <p className="text-gray-400">No downloads yet</p>
            <Link href="/datasets" className="text-[#00d4ff] text-sm hover:underline mt-2 inline-block">
              Browse Datasets
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}