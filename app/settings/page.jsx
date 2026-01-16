// app/settings/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Settings as SettingsIcon, 
  Bell,
  Lock,
  Eye,
  Database,
  Download,
  Trash2,
  Loader2,
  CheckCircle,
  X,
  Shield,
  Globe,
  Moon,
  Sun
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

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [toast, setToast] = useState(null)
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    datasetUpdates: true,
    newsletterSubscription: false,
    twoFactorAuth: false,
    publicProfile: true,
    showEmail: false,
    darkMode: true,
    language: 'en',
    timezone: 'Asia/Dhaka',
    dataRetention: '90',
    autoDownload: false
  })

  useEffect(() => {
    if (session) {
      const saved = localStorage.getItem(`settings_${session.user.email}`)
      if (saved) {
        setSettings(JSON.parse(saved))
      }
    }
  }, [session])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    localStorage.setItem(`settings_${session.user.email}`, JSON.stringify(updated))
    showToast('Setting updated', 'success')
  }

  const handleChange = (key, value) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    localStorage.setItem(`settings_${session.user.email}`, JSON.stringify(updated))
    showToast('Setting updated', 'success')
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      localStorage.removeItem(`profile_${session.user.email}`)
      localStorage.removeItem(`settings_${session.user.email}`)
      showToast('All data cleared successfully', 'success')
    }
  }

  const handleExportData = () => {
    const data = {
      profile: JSON.parse(localStorage.getItem(`profile_${session.user.email}`) || '{}'),
      settings: settings
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-data-${new Date().toISOString()}.json`
    a.click()
    showToast('Data exported successfully', 'success')
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

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#00d4ff]' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-gray-400">Manage your account preferences and privacy</p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Bell className="text-[#00d4ff]" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Notifications</h3>
                <p className="text-gray-400 text-sm">Manage how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-gray-400 text-sm">Receive notifications via email</p>
                </div>
                <ToggleSwitch
                  enabled={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Dataset Updates</p>
                  <p className="text-gray-400 text-sm">Get notified about new datasets</p>
                </div>
                <ToggleSwitch
                  enabled={settings.datasetUpdates}
                  onChange={() => handleToggle('datasetUpdates')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Newsletter Subscription</p>
                  <p className="text-gray-400 text-sm">Receive monthly newsletter</p>
                </div>
                <ToggleSwitch
                  enabled={settings.newsletterSubscription}
                  onChange={() => handleToggle('newsletterSubscription')}
                />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Lock className="text-[#00d4ff]" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Privacy & Security</h3>
                <p className="text-gray-400 text-sm">Control your privacy settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm">Add extra security to your account</p>
                </div>
                <ToggleSwitch
                  enabled={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Public Profile</p>
                  <p className="text-gray-400 text-sm">Make your profile visible to others</p>
                </div>
                <ToggleSwitch
                  enabled={settings.publicProfile}
                  onChange={() => handleToggle('publicProfile')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Show Email</p>
                  <p className="text-gray-400 text-sm">Display email on public profile</p>
                </div>
                <ToggleSwitch
                  enabled={settings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Eye className="text-[#00d4ff]" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Appearance</h3>
                <p className="text-gray-400 text-sm">Customize how the app looks</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Use dark theme</p>
                </div>
                <ToggleSwitch
                  enabled={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
              </div>

              <div className="p-4 bg-[#0d1428] rounded-lg">
                <label className="block text-white font-medium mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white focus:outline-none focus:border-[#00d4ff]"
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>

              <div className="p-4 bg-[#0d1428] rounded-lg">
                <label className="block text-white font-medium mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white focus:outline-none focus:border-[#00d4ff]"
                >
                  <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="America/New_York">America/New York (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Database className="text-[#00d4ff]" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Data Management</h3>
                <p className="text-gray-400 text-sm">Manage your data and preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0d1428] rounded-lg">
                <label className="block text-white font-medium mb-2">Data Retention</label>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => handleChange('dataRetention', e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white focus:outline-none focus:border-[#00d4ff]"
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0d1428] rounded-lg">
                <div>
                  <p className="text-white font-medium">Auto-download Updates</p>
                  <p className="text-gray-400 text-sm">Automatically download dataset updates</p>
                </div>
                <ToggleSwitch
                  enabled={settings.autoDownload}
                  onChange={() => handleToggle('autoDownload')}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExportData}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/20 transition-colors"
                >
                  <Download size={20} />
                  Export My Data
                </button>
                <button
                  onClick={handleClearData}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={20} />
                  Clear All Data
                </button>
              </div>
            </div>
          </div>

          {/* Admin-only Settings */}
          {session.user.role === 'admin' && (
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-red-400" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Admin Settings</h3>
                  <p className="text-gray-400 text-sm">Advanced configuration options</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full p-4 bg-[#0d1428]/50 border border-red-500/20 rounded-lg text-left hover:bg-[#0d1428] transition-colors">
                  <p className="text-white font-medium">System Configuration</p>
                  <p className="text-gray-400 text-sm">Configure platform-wide settings</p>
                </button>
                <button className="w-full p-4 bg-[#0d1428]/50 border border-red-500/20 rounded-lg text-left hover:bg-[#0d1428] transition-colors">
                  <p className="text-white font-medium">User Management</p>
                  <p className="text-gray-400 text-sm">Manage user roles and permissions</p>
                </button>
                <button className="w-full p-4 bg-[#0d1428]/50 border border-red-500/20 rounded-lg text-left hover:bg-[#0d1428] transition-colors">
                  <p className="text-white font-medium">Backup & Restore</p>
                  <p className="text-gray-400 text-sm">Manage system backups</p>
                </button>
              </div>
            </div>
          )}
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