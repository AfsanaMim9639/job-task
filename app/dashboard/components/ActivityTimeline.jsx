// app/dashboard/components/ActivityTimeline.jsx
'use client'

import { Download, Bookmark, Eye, Search, Clock } from 'lucide-react'

export default function ActivityTimeline({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'download':
        return <Download size={16} className="text-blue-400" />
      case 'bookmark':
        return <Bookmark size={16} className="text-purple-400" />
      case 'view':
        return <Eye size={16} className="text-green-400" />
      case 'search':
        return <Search size={16} className="text-yellow-400" />
      default:
        return <Clock size={16} className="text-gray-400" />
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">Activity Timeline</h2>
        <p className="text-gray-400 text-sm">Your recent actions</p>
      </div>

      <div className="p-6">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-[#0d1428] rounded-full flex items-center justify-center flex-shrink-0 border border-[#00d4ff]/10">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium mb-1">
                    {activity.description}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.details}</p>
                </div>

                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="mx-auto mb-3 text-gray-500 opacity-50" size={48} />
            <p className="text-gray-400">No activity yet</p>
          </div>
        )}
      </div>
    </div>
  )
}