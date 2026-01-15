'use client'

import { TrendingUp, TrendingDown, Activity, Download, Share2, ArrowLeft, Calendar, BarChart3, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function IndicatorDetailsPage() {
  const params = useParams()
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Mock data - should fetch from API
  const indicatorData = {
    'gdp-growth-rate': {
      title: 'GDP Growth Rate',
      value: '6.2%',
      change: '+0.8%',
      trend: 'up',
      period: 'Q3 2025',
      category: 'Economy',
      description: 'Year-over-year economic growth rate measuring the increase in economic output',
      chartData: [4.5, 5.1, 5.8, 6.0, 5.9, 6.2],
      historicalData: [
        { period: 'Q2 2024', value: 4.5 },
        { period: 'Q3 2024', value: 5.1 },
        { period: 'Q4 2024', value: 5.8 },
        { period: 'Q1 2025', value: 6.0 },
        { period: 'Q2 2025', value: 5.9 },
        { period: 'Q3 2025', value: 6.2 }
      ],
      insights: [
        'Steady growth trajectory maintained over the past 6 quarters',
        'Manufacturing sector contributing 32% to overall growth',
        'Service sector shows resilience with 4.8% growth rate'
      ],
      methodology: 'Calculated using expenditure approach, measuring final consumption, investment, government spending, and net exports',
      sources: ['Bangladesh Bureau of Statistics', 'Ministry of Finance'],
      lastUpdated: '2 days ago'
    },
    'literacy-rate': {
      title: 'Literacy Rate',
      value: '76.8%',
      change: '+2.1%',
      trend: 'up',
      period: '2025',
      category: 'Social',
      description: 'Adult literacy rate for population aged 15 years and above',
      historicalData: [
        { period: '2020', value: 72.3 },
        { period: '2021', value: 73.5 },
        { period: '2022', value: 74.2 },
        { period: '2023', value: 75.1 },
        { period: '2024', value: 76.0 },
        { period: '2025', value: 76.8 }
      ],
      insights: [
        'Consistent improvement in literacy rates over 5 years',
        'Female literacy shows faster growth at 3.2% annually',
        'Rural areas showing 2.5% improvement year-over-year'
      ],
      methodology: 'UNESCO standard methodology for measuring adult literacy',
      sources: ['Bangladesh Bureau of Statistics', 'Ministry of Education'],
      lastUpdated: '1 week ago'
    },
    'unemployment': {
      title: 'Unemployment Rate',
      value: '4.1%',
      change: '-0.3%',
      trend: 'down',
      period: 'Nov 2025',
      category: 'Economy',
      description: 'National unemployment rate',
      historicalData: [
        { period: 'Jun 25', value: 5.2 },
        { period: 'Jul 25', value: 4.9 },
        { period: 'Aug 25', value: 4.6 },
        { period: 'Sep 25', value: 4.4 },
        { period: 'Oct 25', value: 4.3 },
        { period: 'Nov 25', value: 4.1 }
      ],
      insights: [
        'Unemployment steadily declining for 6 consecutive months',
        'Youth employment initiatives showing positive results',
        'Manufacturing sector creating new jobs'
      ],
      methodology: 'Labor Force Survey methodology',
      sources: ['Bangladesh Bureau of Statistics'],
      lastUpdated: '3 days ago'
    }
  }

  const indicator = indicatorData[params.id]

  // Download function
  const handleDownload = () => {
    if (!indicator) return

    // Create CSV content
    const csvContent = [
      ['Indicator', indicator.title],
      ['Category', indicator.category],
      ['Current Value', indicator.value],
      ['Change', indicator.change],
      ['Period', indicator.period],
      ['Last Updated', indicator.lastUpdated],
      [''],
      ['Historical Data'],
      ['Period', 'Value'],
      ...indicator.historicalData.map(d => [d.period, d.value])
    ].map(row => row.join(',')).join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `${params.id}-data.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Share functions
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowShareMenu(false)
    }, 2000)
  }

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')
    setShowShareMenu(false)
  }

  const handleShareTwitter = () => {
    const text = `Check out ${indicator?.title}: ${indicator?.value} - BD Open Data`
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`, '_blank')
    setShowShareMenu(false)
  }

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
    setShowShareMenu(false)
  }

  if (!indicator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 px-6 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Indicator Not Found</h1>
          <p className="text-gray-400 mb-6">The indicator you're looking for doesn't exist.</p>
          <Link 
            href="/indicators" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft size={20} />
            Back to All Indicators
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/indicators"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to All Indicators
        </Link>

        {/* Header Card */}
        <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-sm rounded-full border border-[#00d4ff]/20 font-medium">
                  {indicator.category}
                </span>
                <span className="text-sm text-gray-400">{indicator.period}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {indicator.title}
              </h1>
              <p className="text-gray-400 leading-relaxed">
                {indicator.description}
              </p>
            </div>

            <div className="flex-shrink-0 text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {indicator.value}
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                indicator.trend === 'up' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-green-500/10 text-green-400'
              }`}>
                {indicator.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="font-semibold">{indicator.change}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-[#00d4ff]/10">
            <button 
              onClick={handleDownload}
              className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Data
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-6 py-3 bg-[#0d1428] border border-[#00d4ff]/20 text-gray-300 rounded-lg font-semibold hover:bg-[#1a2332] transition-colors flex items-center gap-2"
              >
                <Share2 size={18} />
                Share
              </button>

              {/* Share Dropdown */}
              {showShareMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowShareMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg shadow-lg py-2 z-20">
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <LinkIcon size={18} />}
                      <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                    </button>
                    
                    <div className="border-t border-[#00d4ff]/10 my-2"></div>
                    
                    <button
                      onClick={handleShareFacebook}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      <Facebook size={18} />
                      <span>Share on Facebook</span>
                    </button>
                    
                    <button
                      onClick={handleShareTwitter}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      <Twitter size={18} />
                      <span>Share on Twitter</span>
                    </button>
                    
                    <button
                      onClick={handleShareLinkedIn}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#0d1428] hover:text-[#00d4ff] transition-colors"
                    >
                      <Linkedin size={18} />
                      <span>Share on LinkedIn</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 size={24} className="text-[#00d4ff]" />
                  Historical Trend
                </h2>
                <span className="text-sm text-gray-400">Last 6 periods</span>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-2 bg-[#0d1428]/30 rounded-lg p-4">
                {indicator.historicalData.map((data, idx) => {
                  const values = indicator.historicalData.map(d => d.value)
                  const minValue = Math.min(...values)
                  const maxValue = Math.max(...values)
                  const range = maxValue - minValue
                  
                  // Scale between 20% and 100% of container
                  const height = range > 0 
                    ? 20 + ((data.value - minValue) / range) * 80
                    : 50
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-[#00d4ff] to-[#0066ff] rounded-t-lg relative group cursor-pointer transition-all hover:opacity-80 hover:scale-105"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0d1428] px-3 py-1.5 rounded-lg text-sm text-white whitespace-nowrap z-10 shadow-lg border border-[#00d4ff]/20">
                          <div className="font-bold">{data.value}%</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 text-center truncate w-full font-medium">{data.period}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Key Insights</h2>
              <ul className="space-y-3">
                {indicator.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Activity size={18} className="text-[#00d4ff] flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodology */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Methodology</h2>
              <p className="text-gray-300 leading-relaxed">
                {indicator.methodology}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Category</div>
                  <div className="text-white font-medium">{indicator.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Reporting Period</div>
                  <div className="text-white font-medium">{indicator.period}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                    <Calendar size={14} />
                    Last Updated
                  </div>
                  <div className="text-white font-medium">{indicator.lastUpdated}</div>
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Data Sources</h3>
              <ul className="space-y-2">
                {indicator.sources.map((source, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#00d4ff]"></div>
                    {source}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Indicators */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Related Indicators</h3>
              <div className="space-y-3">
                <Link href="/indicators/inflation-rate" className="block p-3 bg-[#0d1428] rounded-lg hover:bg-[#1a2332] transition-colors">
                  <div className="text-white font-medium text-sm">Inflation Rate</div>
                  <div className="text-gray-400 text-xs">3.2% (+0.4%)</div>
                </Link>
                <Link href="/indicators/export-growth" className="block p-3 bg-[#0d1428] rounded-lg hover:bg-[#1a2332] transition-colors">
                  <div className="text-white font-medium text-sm">Export Growth</div>
                  <div className="text-gray-400 text-xs">$52.1B (+8.4%)</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}