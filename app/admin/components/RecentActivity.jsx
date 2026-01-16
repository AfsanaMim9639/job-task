// app/admin/components/RecentActivity.jsx
'use client'

import { Upload, Download, Edit, UserPlus, Trash2, Clock } from 'lucide-react'

export default function RecentActivity({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return <Upload size={16} className="text-blue-400" />
      case 'download':
        return <Download size={16} className="text-green-400" />
      case 'edit':
        return <Edit size={16} className="text-yellow-400" />
      case 'user_added':
        return <UserPlus size={16} className="text-purple-400" />
      case 'delete':
        return <Trash2 size={16} className="text-red-400" />
      default:
        return <Clock size={16} className="text-gray-400" />
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000) // seconds

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <p className="text-gray-400 text-sm">Latest actions and events</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-[#0d1428] border border-[#00d4ff]/5 rounded-lg hover:border-[#00d4ff]/20 transition-colors"
            >
              <div className="w-10 h-10 bg-[#1a2332] rounded-full flex items-center justify-center flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium mb-1">
                  {activity.description}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  by {activity.user} • {activity.details}
                </p>
              </div>

              <span className="text-gray-500 text-xs whitespace-nowrap">
                {formatTime(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}