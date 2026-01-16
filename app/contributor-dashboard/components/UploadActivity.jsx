// app/contributor-dashboard/components/UploadActivity.jsx
'use client'

import { Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function UploadActivity({ activities }) {
  const getActivityIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />
      case 'failed':
        return <AlertCircle size={16} className="text-red-400" />
      default:
        return <Upload size={16} className="text-blue-400" />
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
        <h2 className="text-xl font-bold text-white">Upload Activity</h2>
        <p className="text-gray-400 text-sm">Recent upload history</p>
      </div>

      <div className="p-6">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-[#0d1428] border border-[#00d4ff]/5 rounded-lg hover:border-[#00d4ff]/20 transition-colors"
              >
                <div className="w-10 h-10 bg-[#1a2332] rounded-full flex items-center justify-center flex-shrink-0 border border-[#00d4ff]/10">
                  {getActivityIcon(activity.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{activity.datasetTitle}</span>
                    <span>•</span>
                    <span>{activity.fileSize}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-gray-500 text-xs whitespace-nowrap block mb-1">
                    {formatTime(activity.timestamp)}
                  </span>
                  <span className={`text-xs font-semibold ${
                    activity.status === 'success' ? 'text-green-400' :
                    activity.status === 'pending' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Upload className="mx-auto mb-3 text-gray-500 opacity-50" size={48} />
            <p className="text-gray-400">No upload activity yet</p>
          </div>
        )}
      </div>
    </div>
  )
}