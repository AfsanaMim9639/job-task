// app/admin/components/UserManagement.jsx
'use client'

import { useState } from 'react'
import { Shield, User, Edit, Ban, CheckCircle } from 'lucide-react'

export default function UserManagement({ users, onUpdateRole, onToggleStatus }) {
  const [editingUser, setEditingUser] = useState(null)

  const handleRoleChange = (userId, newRole) => {
    onUpdateRole(userId, newRole)
    setEditingUser(null)
  }

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">User Management</h2>
        <p className="text-gray-400 text-sm">Manage user roles and permissions</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-full flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {editingUser === user.id ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="px-3 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white text-sm"
                  >
                    <option value="user">User</option>
                    <option value="contributor">Contributor</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                    user.role === 'contributor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                    'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                  }`}>
                    {user.role}
                  </span>
                )}

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {user.status}
                </span>

                <button
                  onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                  className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                  title="Edit Role"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => onToggleStatus(user.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    user.status === 'active' 
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                      : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  }`}
                  title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  {user.status === 'active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}