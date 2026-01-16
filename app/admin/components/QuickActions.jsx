// app/admin/components/QuickActions.jsx
'use client'

import { Upload, UserPlus, FileText, Settings, Download, Mail } from 'lucide-react'
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'Upload Dataset',
      description: 'Add new data to platform',
      icon: Upload,
      href: '/upload',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Add User',
      description: 'Create new user account',
      icon: UserPlus,
      href: '#',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: FileText,
      href: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'System Settings',
      description: 'Configure platform',
      icon: Settings,
      href: '#',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Export Data',
      description: 'Download all datasets',
      icon: Download,
      href: '#',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Send Newsletter',
      description: 'Email to all users',
      icon: Mail,
      href: '#',
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        <p className="text-gray-400 text-sm">Common administrative tasks</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                href={action.href}
                className="group p-4 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg hover:border-[#00d4ff]/30 transition-all hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}