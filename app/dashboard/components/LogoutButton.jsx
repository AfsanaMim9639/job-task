'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-[#0d1428] border border-[#00d4ff]/20 text-white rounded-lg font-semibold hover:bg-[#1a2332] transition-colors flex items-center gap-2"
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}