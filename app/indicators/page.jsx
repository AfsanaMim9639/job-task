'use client'

import { TrendingUp, TrendingDown, Activity, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function IndicatorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['All', 'Economy', 'Social', 'Environment', 'Infrastructure']

  const indicators = [
    {
      id: 'gdp-growth-rate',
      title: 'GDP Growth Rate',
      value: '6.2%',
      change: '+0.8%',
      trend: 'up',
      period: 'Q3 2025',
      category: 'Economy',
      description: 'Year-over-year economic growth',
      chartData: [4.5, 5.1, 5.8, 6.0, 5.9, 6.2]
    },
    {
      id: 'literacy-rate',
      title: 'Literacy Rate',
      value: '76.8%',
      change: '+2.1%',
      trend: 'up',
      period: '2025',
      category: 'Social',
      description: 'Adult literacy (15+ years)',
      chartData: [72.3, 73.5, 74.2, 75.1, 76.0, 76.8]
    },
    {
      id: 'unemployment',
      title: 'Unemployment Rate',
      value: '4.1%',
      change: '-0.3%',
      trend: 'down',
      period: 'Nov 2025',
      category: 'Economy',
      description: 'National unemployment rate',
      chartData: [5.2, 4.9, 4.6, 4.4, 4.3, 4.1]
    },
    {
      id: 'internet-penetration',
      title: 'Internet Penetration',
      value: '58.3%',
      change: '+4.2%',
      trend: 'up',
      period: '2025',
      category: 'Infrastructure',
      description: 'Population with internet access',
      chartData: [45.2, 48.1, 51.3, 54.1, 56.5, 58.3]
    },
    {
      id: 'poverty-rate',
      title: 'Poverty Rate',
      value: '18.7%',
      change: '-1.5%',
      trend: 'down',
      period: '2025',
      category: 'Social',
      description: 'Below national poverty line',
      chartData: [24.3, 22.8, 21.3, 20.2, 19.5, 18.7]
    },
    {
      id: 'export-growth',
      title: 'Export Growth',
      value: '$52.1B',
      change: '+8.4%',
      trend: 'up',
      period: 'FY 2024-25',
      category: 'Economy',
      description: 'Total export value',
      chartData: [38.2, 40.5, 43.1, 46.7, 49.3, 52.1]
    },
    {
      id: 'air-quality-index',
      title: 'Air Quality Index',
      value: '156',
      change: '-8%',
      trend: 'down',
      period: 'Dec 2025',
      category: 'Environment',
      description: 'Average AQI (lower is better)',
      chartData: [189, 178, 172, 165, 160, 156]
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      value: '12.3%',
      change: '+1.8%',
      trend: 'up',
      period: '2025',
      category: 'Environment',
      description: 'Share of renewable energy',
      chartData: [8.2, 9.1, 10.0, 10.5, 11.4, 12.3]
    }
  ]

  const filteredIndicators = indicators.filter(indicator => {
    const matchesSearch = indicator.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || indicator.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All <span className="gradient-text">Indicators</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track key performance metrics across Bangladesh
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white'
                    : 'bg-[#1a2332] text-gray-300 hover:bg-[#1f2937]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndicators.map((indicator) => (
            <Link
              key={indicator.id}
              href={`/indicators/${indicator.id}`}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 relative overflow-hidden block group"
            >
              {/* Background Chart */}
              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="2"
                    points={indicator.chartData.map((value, i) => 
                      `${(i / (indicator.chartData.length - 1)) * 100},${100 - (value / Math.max(...indicator.chartData)) * 80}`
                    ).join(' ')}
                  />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] rounded-full border border-[#00d4ff]/20">
                      {indicator.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2 mb-1 group-hover:text-[#00d4ff] transition-colors">
                      {indicator.title}
                    </h3>
                    <p className="text-xs text-gray-500">{indicator.period}</p>
                  </div>
                  {indicator.trend === 'up' ? (
                    <TrendingUp className="text-green-400 flex-shrink-0" size={20} />
                  ) : (
                    <TrendingDown className="text-green-400 flex-shrink-0" size={20} />
                  )}
                </div>

                <div className="mb-3">
                  <div className="text-3xl font-bold text-white mb-1">
                    {indicator.value}
                  </div>
                  <div className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    indicator.trend === 'up' ? 'text-green-400' : 'text-green-400'
                  }`}>
                    <Activity size={14} />
                    {indicator.change} vs last period
                  </div>
                </div>

                <p className="text-gray-400 text-sm">
                  {indicator.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredIndicators.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No indicators found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}