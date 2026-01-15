'use client'

import { Users, Building2, Activity, Globe, TrendingUp, Briefcase, GraduationCap, Heart, X, Download, Eye, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    {
      icon: Users,
      title: 'Demographics',
      description: 'Population, age distribution, migration patterns',
      datasets: 245,
      color: 'from-[#00d4ff] to-[#0066ff]',
      details: {
        totalSize: '4.2 GB',
        lastUpdated: '2 days ago',
        downloads: '25.3K',
        topDatasets: [
          'Population Census 2025',
          'Age Distribution by District',
          'Migration Patterns 2010-2025'
        ]
      }
    },
    {
      icon: Building2,
      title: 'Infrastructure',
      description: 'Roads, utilities, urban development',
      datasets: 189,
      color: 'from-[#0066ff] to-[#6b46c1]',
      details: {
        totalSize: '3.1 GB',
        lastUpdated: '1 week ago',
        downloads: '18.7K',
        topDatasets: [
          'Road Network Database',
          'Utility Infrastructure Map',
          'Urban Development Projects'
        ]
      }
    },
    {
      icon: Activity,
      title: 'Economy',
      description: 'GDP, trade, employment statistics',
      datasets: 312,
      color: 'from-[#00d4ff] to-[#10b981]',
      details: {
        totalSize: '5.8 GB',
        lastUpdated: '3 days ago',
        downloads: '32.1K',
        topDatasets: [
          'GDP Growth Statistics',
          'Trade Balance Data',
          'Employment Sector Analysis'
        ]
      }
    },
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Hospitals, disease data, health indicators',
      datasets: 178,
      color: 'from-[#ef4444] to-[#f59e0b]',
      details: {
        totalSize: '2.9 GB',
        lastUpdated: '5 days ago',
        downloads: '21.5K',
        topDatasets: [
          'Healthcare Facilities Directory',
          'Disease Statistics Database',
          'Health Indicators by Region'
        ]
      }
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Schools, literacy rates, enrollment data',
      datasets: 203,
      color: 'from-[#8b5cf6] to-[#ec4899]',
      details: {
        totalSize: '3.4 GB',
        lastUpdated: '1 week ago',
        downloads: '19.8K',
        topDatasets: [
          'School Directory Database',
          'Literacy Rate Statistics',
          'Student Enrollment Data'
        ]
      }
    },
    {
      icon: Globe,
      title: 'Environment',
      description: 'Climate, pollution, natural resources',
      datasets: 167,
      color: 'from-[#10b981] to-[#059669]',
      details: {
        totalSize: '4.7 GB',
        lastUpdated: '4 days ago',
        downloads: '16.2K',
        topDatasets: [
          'Climate Change Data',
          'Air Quality Index',
          'Natural Resources Inventory'
        ]
      }
    },
    {
      icon: TrendingUp,
      title: 'Development',
      description: 'SDGs, poverty, social indicators',
      datasets: 221,
      color: 'from-[#f59e0b] to-[#ef4444]',
      details: {
        totalSize: '3.8 GB',
        lastUpdated: '6 days ago',
        downloads: '23.4K',
        topDatasets: [
          'SDG Progress Tracker',
          'Poverty Rate Analysis',
          'Social Development Metrics'
        ]
      }
    },
    {
      icon: Briefcase,
      title: 'Business',
      description: 'Companies, startups, market data',
      datasets: 134,
      color: 'from-[#6366f1] to-[#8b5cf6]',
      details: {
        totalSize: '2.3 GB',
        lastUpdated: '3 days ago',
        downloads: '14.9K',
        topDatasets: [
          'Company Registration Database',
          'Startup Ecosystem Report',
          'Market Analysis Data'
        ]
      }
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
                onClick={() => setSelectedCategory(category)}
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

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`bg-gradient-to-br ${selectedCategory.color} p-6 rounded-t-2xl relative`}>
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  {(() => {
                    const Icon = selectedCategory.icon
                    return <Icon className="text-white" size={32} />
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedCategory.title}</h3>
                  <p className="text-white/80 text-sm">{selectedCategory.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">{selectedCategory.datasets}</div>
                  <div className="text-xs text-gray-400">Total Datasets</div>
                </div>
                <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">{selectedCategory.details.totalSize}</div>
                  <div className="text-xs text-gray-400">Total Size</div>
                </div>
                <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">{selectedCategory.details.downloads}</div>
                  <div className="text-xs text-gray-400">Downloads</div>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#00d4ff]" />
                  <span>Updated {selectedCategory.details.lastUpdated}</span>
                </div>
              </div>

              {/* Top Datasets */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Popular Datasets</h4>
                <div className="space-y-3">
                  {selectedCategory.details.topDatasets.map((dataset, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg hover:bg-[#1a2332] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Activity size={20} className="text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">{dataset}</span>
                      </div>
                      <Eye size={18} className="text-gray-400 group-hover:text-[#00d4ff] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <Download size={18} />
                  Browse All Datasets
                </button>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-3 bg-[#0d1428] border border-[#00d4ff]/20 text-gray-300 rounded-lg font-semibold hover:bg-[#1a2332] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}