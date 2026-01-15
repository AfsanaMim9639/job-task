'use client'

import { Users, Building2, Activity, Globe, TrendingUp, Briefcase, GraduationCap, Heart } from 'lucide-react'

export default function CategoryGrid() {
  const categories = [
    {
      icon: Users,
      title: 'Demographics',
      description: 'Population, age distribution, migration patterns',
      datasets: 245,
      color: 'from-[#00d4ff] to-[#0066ff]'
    },
    {
      icon: Building2,
      title: 'Infrastructure',
      description: 'Roads, utilities, urban development',
      datasets: 189,
      color: 'from-[#0066ff] to-[#6b46c1]'
    },
    {
      icon: Activity,
      title: 'Economy',
      description: 'GDP, trade, employment statistics',
      datasets: 312,
      color: 'from-[#00d4ff] to-[#10b981]'
    },
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Hospitals, disease data, health indicators',
      datasets: 178,
      color: 'from-[#ef4444] to-[#f59e0b]'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Schools, literacy rates, enrollment data',
      datasets: 203,
      color: 'from-[#8b5cf6] to-[#ec4899]'
    },
    {
      icon: Globe,
      title: 'Environment',
      description: 'Climate, pollution, natural resources',
      datasets: 167,
      color: 'from-[#10b981] to-[#059669]'
    },
    {
      icon: TrendingUp,
      title: 'Development',
      description: 'SDGs, poverty, social indicators',
      datasets: 221,
      color: 'from-[#f59e0b] to-[#ef4444]'
    },
    {
      icon: Briefcase,
      title: 'Business',
      description: 'Companies, startups, market data',
      datasets: 134,
      color: 'from-[#6366f1] to-[#8b5cf6]'
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
            Explore by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl px-4">
            Dive into organized datasets across multiple sectors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-5 sm:p-6 cursor-pointer group flex flex-col"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#00d4ff]/10 mt-auto">
                  <span className="text-xs text-gray-500">
                    {category.datasets} datasets
                  </span>
                  <span className="text-[#00d4ff] text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                    Explore →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}