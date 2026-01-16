// app/profile/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Shield, 
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  CheckCircle,
  Upload as UploadIcon,
  Award,
  Activity
} from 'lucide-react'

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

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [toast, setToast] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    organization: '',
    location: ''
  })

  useEffect(() => {
    if (session) {
      // Load profile from localStorage
      const saved = localStorage.getItem(`profile_${session.user.email}`)
      if (saved) {
        setProfileData(JSON.parse(saved))
      } else {
        setProfileData({
          name: session.user.name || '',
          email: session.user.email || '',
          bio: '',
          organization: '',
          location: ''
        })
      }
    }
  }, [session])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleSave = () => {
    localStorage.setItem(`profile_${session.user.email}`, JSON.stringify(profileData))
    setIsEditing(false)
    showToast('Profile updated successfully', 'success')
  }

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'contributor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Get user stats based on role
  const getUserStats = () => {
    const role = session?.user?.role
    
    if (role === 'admin') {
      const datasets = JSON.parse(localStorage.getItem('uploadedDatasets') || '[]')
      const users = JSON.parse(localStorage.getItem('adminUsers') || '[]')
      return [
        { label: 'Datasets Managed', value: datasets.length, icon: Activity },
        { label: 'Users Managed', value: users.length, icon: User },
        { label: 'Total Uploads', value: datasets.length, icon: UploadIcon }
      ]
    } else if (role === 'contributor') {
      const datasets = JSON.parse(localStorage.getItem('uploadedDatasets') || '[]')
      const myUploads = datasets.filter(d => d.uploadedBy === session.user.name)
      return [
        { label: 'My Uploads', value: myUploads.length, icon: UploadIcon },
        { label: 'Contributions', value: myUploads.length, icon: Award },
        { label: 'Active Datasets', value: myUploads.filter(d => d.status === 'active').length, icon: Activity }
      ]
    } else {
      return [
        { label: 'Downloads', value: 0, icon: UploadIcon },
        { label: 'Bookmarks', value: 0, icon: Award },
        { label: 'Activity', value: 0, icon: Activity }
      ]
    }
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

  const stats = getUserStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={48} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{profileData.name}</h2>
                <p className="text-gray-400 text-sm mb-3">{profileData.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getRoleBadgeColor(session.user.role)}`}>
                  {session.user.role}
                </span>
              </div>

              <div className="border-t border-[#00d4ff]/10 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-[#00d4ff]" size={16} />
                  <span className="text-gray-400">Joined {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="text-[#00d4ff]" size={16} />
                  <span className="text-gray-400">Account Active</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 space-y-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                          <Icon className="text-[#00d4ff]" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">{stat.label}</p>
                          <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/20 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg text-white">
                      {profileData.name || 'Not set'}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <p className="px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg text-gray-400">
                    {profileData.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  ) : (
                    <p className="px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg text-white min-h-[100px]">
                      {profileData.bio || 'No bio added yet'}
                    </p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Organization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organization"
                      value={profileData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      placeholder="Your company or institution"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg text-white">
                      {profileData.organization || 'Not set'}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      placeholder="City, Country"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg text-white">
                      {profileData.location || 'Not set'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-based Information */}
            {session.user.role === 'admin' && (
              <div className="mt-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-red-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Administrator Access</h4>
                    <p className="text-gray-400 text-sm">
                      You have full access to the admin dashboard, user management, and all platform settings. 
                      Use your privileges responsibly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {session.user.role === 'contributor' && (
              <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <UploadIcon className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Contributor Access</h4>
                    <p className="text-gray-400 text-sm">
                      As a contributor, you can upload and manage datasets. Your contributions help build 
                      a comprehensive data platform for Bangladesh.
                    </p>
                  </div>
                </div>
              </div>
            )}
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