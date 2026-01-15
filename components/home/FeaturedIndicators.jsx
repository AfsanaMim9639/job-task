'use client'

import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedIndicators() {
  const indicators = [
    {
      title: 'GDP Growth Rate',
      value: '6.2%',
      change: '+0.8%',
      trend: 'up',
      period: 'Q3 2025',
      description: 'Year-over-year growth',
      chartData: [4.5, 5.1, 5.8, 6.0, 5.9, 6.2]
    },
    {
      title: 'Literacy Rate',
      value: '76.8%',
      change: '+2.1%',
      trend: 'up',
      period: '2025',
      description: 'Adult literacy (15+ years)',
      chartData: [72.3, 73.5, 74.2, 75.1, 76.0, 76.8]
    },
    {
      title: 'Unemployment',
      value: '4.1%',
      change: '-0.3%',
      trend: 'down',
      period: 'Nov 2025',
      description: 'National unemployment rate',
      chartData: [5.2, 4.9, 4.6, 4.4, 4.3, 4.1]
    },
    {
      title: 'Internet Penetration',
      value: '58.3%',
      change: '+4.2%',
      trend: 'up',
      period: '2025',
      description: 'Population with internet access',
      chartData: [45.2, 48.1, 51.3, 54.1, 56.5, 58.3]
    },
    {
      title: 'Poverty Rate',
      value: '18.7%',
      change: '-1.5%',
      trend: 'down',
      period: '2025',
      description: 'Below national poverty line',
      chartData: [24.3, 22.8, 21.3, 20.2, 19.5, 18.7]
    },
    {
      title: 'Export Growth',
      value: '$52.1B',
      change: '+8.4%',
      trend: 'up',
      period: 'FY 2024-25',
      description: 'Total export value',
      chartData: [38.2, 40.5, 43.1, 46.7, 49.3, 52.1]
    }
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0a0e1a] to-[#0d1428]">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Indicators</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Key national metrics and performance indicators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 relative overflow-hidden flex flex-col"
            >
              {/* Background Chart */}
              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10 pointer-events-none">
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

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-300 mb-1">
                      {indicator.title}
                    </h3>
                    <p className="text-xs text-gray-500">{indicator.period}</p>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    {indicator.trend === 'up' ? (
                      <TrendingUp className="text-green-400" size={20} />
                    ) : (
                      <TrendingDown className="text-green-400" size={20} />
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {indicator.value}
                  </div>
                  <div className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    indicator.trend === 'up' ? 'text-green-400' : 'text-green-400'
                  }`}>
                    <Activity size={14} />
                    {indicator.change} vs last period
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-auto">
                  {indicator.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/indicators"
            className="px-8 py-3 bg-[#1a2332] text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors inline-block"
          >
            View All Indicators
          </Link>
        </div>
      </div>
    </section>
  )
}