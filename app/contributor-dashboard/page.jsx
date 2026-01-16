// app/contributor-dashboard/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle, X, Shield } from 'lucide-react'
import ContributorWelcome from './components/ContributorWelcome'
import ContributorStats from './components/ContributorStats'
import MyUploads from './components/MyUploads'
import UploadActivity from './components/UploadActivity'
import QuickUpload from './components/QuickUpload'

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border ${
        type === 'success' 
          ? 'bg-green-500/10 border-green-500/20 text-green-400' 
          : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}>
        {type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
        <p className="font-medium">{message}</p>
        <button onClick={onClose}><X size={18} /></button>
      </div>
    </div>
  )
}

export default function ContributorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [toast, setToast] = useState(null)
  
  const [uploads, setUploads] = useState([])
  const [activities, setActivities] = useState([])

  const isContributor = session?.user?.role === 'contributor' || session?.user?.role === 'admin'

  useEffect(() => {
    if (session) {
      // Load all uploads from localStorage
      const allUploads = JSON.parse(localStorage.getItem('uploadedDatasets') || '[]')
      
      // Filter uploads by current user
      const myUploads = allUploads.filter(u => u.uploadedBy === session.user.name)
      setUploads(myUploads)

      // Load or create activities
      const savedActivities = localStorage.getItem(`contributor_activities_${session.user.email}`)
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities))
      } else {
        // Default activities based on uploads
        const defaultActivities = myUploads.slice(0, 5).map((upload, index) => ({
          id: index + 1,
          status: upload.status === 'active' ? 'success' : 'pending',
          description: 'Dataset uploaded',
          datasetTitle: upload.title,
          fileSize: upload.fileSize ? formatFileSize(upload.fileSize) : '2.4 MB',
          timestamp: upload.uploadedAt
        }))
        setActivities(defaultActivities)
        localStorage.setItem(`contributor_activities_${session.user.email}`, JSON.stringify(defaultActivities))
      }
    }
  }, [session])

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleUpdateUpload = (id, updates) => {
    // Update in uploads state
    const updatedUploads = uploads.map(u => 
      u.id === id ? { ...u, ...updates } : u
    )
    setUploads(updatedUploads)

    // Update in global storage
    const allUploads = JSON.parse(localStorage.getItem('uploadedDatasets') || '[]')
    const globalUpdated = allUploads.map(u => 
      u.id === id ? { ...u, ...updates } : u
    )
    localStorage.setItem('uploadedDatasets', JSON.stringify(globalUpdated))

    showToast('Dataset updated successfully', 'success')
  }

  const handleDeleteUpload = (id) => {
    // Remove from uploads state
    const filteredUploads = uploads.filter(u => u.id !== id)
    setUploads(filteredUploads)

    // Remove from global storage
    const allUploads = JSON.parse(localStorage.getItem('uploadedDatasets') || '[]')
    const globalFiltered = allUploads.filter(u => u.id !== id)
    localStorage.setItem('uploadedDatasets', JSON.stringify(globalFiltered))

    showToast('Dataset deleted successfully', 'success')
  }

  // Calculate stats
  const stats = {
    totalUploads: uploads.length,
    activeDatasets: uploads.filter(u => u.status === 'active').length,
    pendingDatasets: uploads.filter(u => u.status === 'pending').length,
    totalViews: uploads.reduce((sum, u) => sum + (parseInt(u.views) || 0), 0),
    totalDownloads: uploads.reduce((sum, u) => sum + (u.downloads || 0), 0),
    monthlyUploads: uploads.filter(u => {
      const uploadDate = new Date(u.uploadedAt)
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return uploadDate > oneMonthAgo
    }).length,
    viewGrowth: 15,
    downloadGrowth: 23
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] flex items-center justify-center">
        <Loader2 className="text-[#00d4ff] animate-spin" size={48} />
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  if (!isContributor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[#1a2332] border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-red-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You need contributor privileges to access this page.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        {/* Welcome Card */}
        <ContributorWelcome user={session.user} stats={stats} />

        {/* Stats Cards */}
        <ContributorStats stats={stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <MyUploads 
              uploads={uploads}
              onUpdate={handleUpdateUpload}
              onDelete={handleDeleteUpload}
            />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <QuickUpload />
            <UploadActivity activities={activities} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}