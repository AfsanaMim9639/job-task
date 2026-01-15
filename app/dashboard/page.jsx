import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import LogoutButton from './components/LogoutButton'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, <span className="gradient-text">{session.user.name}</span>!
              </h1>
              <p className="text-gray-400">{session.user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="text-[#00d4ff] text-sm font-medium mb-2">Total Datasets</div>
            <div className="text-3xl font-bold text-white mb-1">2,500+</div>
            <div className="text-xs text-green-400">+12% from last month</div>
          </div>
          
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="text-[#00d4ff] text-sm font-medium mb-2">Active Users</div>
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-xs text-green-400">+8% from last month</div>
          </div>
          
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
            <div className="text-[#00d4ff] text-sm font-medium mb-2">API Calls</div>
            <div className="text-3xl font-bold text-white mb-1">1.2M</div>
            <div className="text-xs text-green-400">+15% from last month</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 bg-[#0d1428] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center">
                  <span className="text-white font-bold">DS</span>
                </div>
                <div className="flex-grow">
                  <div className="text-white font-medium">New dataset uploaded</div>
                  <div className="text-sm text-gray-400">Population Census 2025 - 2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}