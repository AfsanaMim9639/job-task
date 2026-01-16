// app/dashboard/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle, X } from 'lucide-react'
import WelcomeCard from './components/WelcomeCard'
import QuickStats from './components/QuickStats'
import RecentDownloads from './components/RecentDownloads'
import BookmarkedDatasets from './components/BookmarkedDatasets'
import ActivityTimeline from './components/ActivityTimeline'
import RecommendedDatasets from './components/RecommendedDatasets'

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

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [toast, setToast] = useState(null)

  const [downloads, setDownloads] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (session) {
      // Load user data from localStorage
      const userEmail = session.user.email

      // Downloads
      const savedDownloads = localStorage.getItem(`downloads_${userEmail}`)
      if (savedDownloads) {
        setDownloads(JSON.parse(savedDownloads))
      } else {
        // Default downloads
        const defaultDownloads = [
          {
            id: 1,
            title: 'Population Census 2024',
            format: 'CSV',
            size: '2.4 GB',
            date: new Date().toLocaleDateString()
          },
          {
            id: 2,
            title: 'GDP Growth Data',
            format: 'JSON',
            size: '156 MB',
            date: new Date(Date.now() - 86400000).toLocaleDateString()
          }
        ]
        setDownloads(defaultDownloads)
        localStorage.setItem(`downloads_${userEmail}`, JSON.stringify(defaultDownloads))
      }

      // Bookmarks
      const savedBookmarks = localStorage.getItem(`bookmarks_${userEmail}`)
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks))
      } else {
        // Default bookmarks
        const defaultBookmarks = [
          {
            id: 1,
            title: 'Healthcare Facilities Database',
            category: 'Healthcare',
            slug: 'hospital-healthcare-facilities-database'
          },
          {
            id: 2,
            title: 'Educational Institution Statistics',
            category: 'Education',
            slug: 'educational-institution-statistics'
          }
        ]
        setBookmarks(defaultBookmarks)
        localStorage.setItem(`bookmarks_${userEmail}`, JSON.stringify(defaultBookmarks))
      }

      // Activities
      const savedActivities = localStorage.getItem(`activities_${userEmail}`)
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities))
      } else {
        // Default activities
        const defaultActivities = [
          {
            id: 1,
            type: 'download',
            description: 'Downloaded dataset',
            details: 'Population Census 2024',
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            type: 'bookmark',
            description: 'Bookmarked dataset',
            details: 'Healthcare Facilities Database',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 3,
            type: 'view',
            description: 'Viewed dataset',
            details: 'GDP Growth & Economic Indicators',
            timestamp: new Date(Date.now() - 7200000).toISOString()
          }
        ]
        setActivities(defaultActivities)
        localStorage.setItem(`activities_${userEmail}`, JSON.stringify(defaultActivities))
      }
    }
  }, [session])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleRemoveBookmark = (id) => {
    const updated = bookmarks.filter(b => b.id !== id)
    setBookmarks(updated)
    localStorage.setItem(`bookmarks_${session.user.email}`, JSON.stringify(updated))
    showToast('Bookmark removed', 'success')
  }

  const stats = {
    downloads: downloads.length,
    bookmarks: bookmarks.length,
    views: activities.filter(a => a.type === 'view').length,
    lastActivity: activities.length > 0 ? 'Today' : 'Never'
  }

  const recommendations = [
    {
      id: 1,
      title: 'Rural Internet Penetration Data',
      description: 'Comprehensive data on internet connectivity in rural Bangladesh',
      category: 'Infrastructure',
      slug: 'rural-internet-penetration-reaches-65-percent',
      rating: '4.8'
    },
    {
      id: 2,
      title: 'Green Energy Investment Report',
      description: 'Analysis of renewable energy sector and investment opportunities',
      category: 'Economy',
      slug: 'green-energy-investment-opportunities',
      rating: '4.6'
    },
    {
      id: 3,
      title: 'AI Adoption in Business',
      description: 'Study on artificial intelligence implementation across sectors',
      category: 'Technology',
      slug: 'ai-adoption-bangladesh-business-sector',
      rating: '4.9'
    },
    {
      id: 4,
      title: 'SME Digital Transformation',
      description: 'Success stories of small businesses leveraging digital tools',
      category: 'Economy',
      slug: 'sme-digital-transformation-success-stories',
      rating: '4.7'
    }
  ]

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
        <WelcomeCard user={session.user} />

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <RecentDownloads downloads={downloads} />
            <RecommendedDatasets recommendations={recommendations} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <BookmarkedDatasets 
              bookmarks={bookmarks}
              onRemove={handleRemoveBookmark}
            />
            <ActivityTimeline activities={activities} />
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