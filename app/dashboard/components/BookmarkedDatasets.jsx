// app/dashboard/components/BookmarkedDatasets.jsx
'use client'

import { useState } from 'react'
import { Bookmark, X, Eye, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function BookmarkedDatasets({ bookmarks, onRemove }) {
  const [viewModal, setViewModal] = useState(null)

  const handleView = (item) => {
    setViewModal(item)
  }

  return (
    <>
      <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#00d4ff]/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Bookmarked Datasets</h2>
              <p className="text-gray-400 text-sm">Quick access to your saved datasets</p>
            </div>
            <span className="text-[#00d4ff] text-sm font-semibold">
              {bookmarks.length} saved
            </span>
          </div>
        </div>

        <div className="p-6">
          {bookmarks.length > 0 ? (
            <div className="space-y-3">
              {bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-4 bg-[#0d1428] border border-[#00d4ff]/5 rounded-lg hover:border-[#00d4ff]/20 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bookmark className="text-purple-400" size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(item)}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors opacity-0 group-hover:opacity-100"
                      title="Quick View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bookmark className="mx-auto mb-3 text-gray-500 opacity-50" size={48} />
              <p className="text-gray-400 mb-2">No bookmarks yet</p>
              <Link href="/datasets" className="text-[#00d4ff] text-sm hover:underline inline-block">
                Browse Datasets to Bookmark
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {viewModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal(null)}
        >
          <div 
            className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#00d4ff]/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Bookmark className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{viewModal.title}</h3>
                  <p className="text-sm text-gray-400">{viewModal.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewModal(null)}
                className="p-2 hover:bg-[#0d1428] rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    This dataset contains comprehensive information about {viewModal.category.toLowerCase()} 
                    in Bangladesh. It includes detailed statistics, analysis, and insights that can help 
                    researchers, policymakers, and analysts make informed decisions.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0d1428] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="text-white font-semibold">{viewModal.category}</p>
                  </div>
                  <div className="bg-[#0d1428] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Format</p>
                    <p className="text-white font-semibold">CSV, JSON</p>
                  </div>
                  <div className="bg-[#0d1428] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                    <p className="text-white font-semibold">2 days ago</p>
                  </div>
                  <div className="bg-[#0d1428] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Downloads</p>
                    <p className="text-white font-semibold">12.5K</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20">
                      {viewModal.category}
                    </span>
                    <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20">
                      Bangladesh
                    </span>
                    <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20">
                      2024
                    </span>
                    <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Source */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Data Source</h4>
                  <div className="flex items-center gap-2 p-3 bg-[#0d1428] rounded-lg">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Bangladesh Bureau of Statistics</p>
                      <p className="text-xs text-gray-400">Official Government Source</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-[#00d4ff]/10">
              <button 
                onClick={() => setViewModal(null)}
                className="px-6 py-2 bg-[#0d1428] border border-[#00d4ff]/20 text-white rounded-lg hover:bg-[#1a2332] transition-colors"
              >
                Close
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/20 transition-colors flex items-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <Link
                  href={`/datasets/${viewModal.slug}`}
                  className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  View Full Details
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}