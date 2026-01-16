// app/admin/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Shield, Loader2, CheckCircle, X } from 'lucide-react'
import StatsCards from './components/StatsCards'
import DatasetsList from './components/DatasetsList'
import UserManagement from './components/UserManagement'
import RecentActivity from './components/RecentActivity'
import QuickActions from './components/QuickActions'

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

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [toast, setToast] = useState(null)
  
  const [datasets, setDatasets] = useState([])
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])

  const isAdmin = session?.user?.role === 'admin'

  // Load data from localStorage
  useEffect(() => {
    const storedDatasets = localStorage.getItem('uploadedDatasets')
    const storedUsers = localStorage.getItem('adminUsers')
    const storedActivities = localStorage.getItem('adminActivities')

    if (storedDatasets) {
      setDatasets(JSON.parse(storedDatasets))
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      // Default users
      const defaultUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'contributor', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active' }
      ]
      setUsers(defaultUsers)
      localStorage.setItem('adminUsers', JSON.stringify(defaultUsers))
    }

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities))
    } else {
      // Default activities
      const defaultActivities = [
        {
          id: 1,
          type: 'upload',
          description: 'New dataset uploaded',
          details: 'Population Census 2024',
          user: 'Admin',
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          type: 'user_added',
          description: 'New user registered',
          details: 'jane@example.com',
          user: 'System',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
      setActivities(defaultActivities)
      localStorage.setItem('adminActivities', JSON.stringify(defaultActivities))
    }
  }, [])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  // Dataset CRUD operations
  const handleUpdateDataset = (id, updates) => {
    const updated = datasets.map(d => 
      d.id === id ? { ...d, ...updates } : d
    )
    setDatasets(updated)
    localStorage.setItem('uploadedDatasets', JSON.stringify(updated))
    
    // Add activity
    addActivity('edit', 'Dataset updated', updates.title, session.user.name)
    showToast('Dataset updated successfully', 'success')
  }

  const handleDeleteDataset = (id) => {
    const dataset = datasets.find(d => d.id === id)
    const filtered = datasets.filter(d => d.id !== id)
    setDatasets(filtered)
    localStorage.setItem('uploadedDatasets', JSON.stringify(filtered))
    
    // Add activity
    addActivity('delete', 'Dataset deleted', dataset?.title, session.user.name)
    showToast('Dataset deleted successfully', 'success')
  }

  // User management operations
  const handleUpdateUserRole = (userId, newRole) => {
    const updated = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    )
    setUsers(updated)
    localStorage.setItem('adminUsers', JSON.stringify(updated))
    
    // Add activity
    const user = users.find(u => u.id === userId)
    addActivity('edit', 'User role changed', `${user.email} → ${newRole}`, session.user.name)
    showToast('User role updated successfully', 'success')
  }

  const handleToggleUserStatus = (userId) => {
    const updated = users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    )
    setUsers(updated)
    localStorage.setItem('adminUsers', JSON.stringify(updated))
    
    const user = users.find(u => u.id === userId)
    const newStatus = user.status === 'active' ? 'deactivated' : 'activated'
    addActivity('edit', `User ${newStatus}`, user.email, session.user.name)
    showToast(`User ${newStatus} successfully`, 'success')
  }

  // Add activity
  const addActivity = (type, description, details, user) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      details,
      user,
      timestamp: new Date().toISOString()
    }
    const updated = [newActivity, ...activities].slice(0, 10) // Keep last 10
    setActivities(updated)
    localStorage.setItem('adminActivities', JSON.stringify(updated))
  }

  // Stats calculation
  const stats = {
    totalDatasets: datasets.length,
    totalUsers: users.length,
    monthlyUploads: datasets.filter(d => {
      const uploadDate = new Date(d.uploadedAt)
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return uploadDate > oneMonthAgo
    }).length,
    totalDownloads: '12.5K'
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] flex items-center justify-center">
        <Loader2 className="text-[#00d4ff] animate-spin" size={48} />
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    router.push('/login')
    return null
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[#1a2332] border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-red-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You need administrator privileges to access this page.
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
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage platform data, users, and settings</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <Shield className="text-red-400" size={16} />
            <span className="text-red-400 text-sm font-medium">Admin Panel</span>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Actions - Full Width on Large Screens */}
          <div className="lg:col-span-3">
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Datasets List - 2 columns */}
          <div className="lg:col-span-2">
            <DatasetsList 
              datasets={datasets}
              onUpdate={handleUpdateDataset}
              onDelete={handleDeleteDataset}
            />
          </div>

          {/* Recent Activity - 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* User Management - Full Width */}
        <UserManagement 
          users={users}
          onUpdateRole={handleUpdateUserRole}
          onToggleStatus={handleToggleUserStatus}
        />
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