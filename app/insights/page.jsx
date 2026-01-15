'use client'

import { useState } from 'react'
import { Search, Clock, Eye, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { articles } from '@/data/articles'

export default function AllInsightsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories from articles
  const categories = ['All', ...new Set(articles.map(a => a.category))]

  // Transform articles data to match the display format
  const insights = articles.map(article => ({
    id: article.id,
    slug: article.slug,
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author.name,
    date: article.publishedDate,
    readTime: article.readTime,
    views: article.views,
    image: article.image,
    featured: article.id <= 2 // Mark first 2 as featured
  }))

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || insight.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalArticles: insights.length,
    totalViews: insights.reduce((sum, i) => {
      const views = parseFloat(i.views.replace('K', '')) * 1000
      return sum + views
    }, 0) / 1000 + 'K',
    totalAuthors: new Set(insights.map(i => i.author)).size,
    avgReadTime: Math.round(
      insights.reduce((sum, i) => sum + parseInt(i.readTime), 0) / insights.length
    ) + ' min'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Data-driven stories and comprehensive analysis from Bangladesh
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="text-[#00d4ff]" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalArticles}</div>
            <div className="text-xs text-gray-400">Total Articles</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="text-[#00d4ff]" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalViews}</div>
            <div className="text-xs text-gray-400">Total Views</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="text-[#00d4ff]" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalAuthors}</div>
            <div className="text-xs text-gray-400">Contributors</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="text-[#00d4ff]" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.avgReadTime}</div>
            <div className="text-xs text-gray-400">Avg Read Time</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredInsights.length}</span> {filteredInsights.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.slug}`}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden group block"
            >
              <div className="h-48 w-full relative overflow-hidden bg-[#0d1428]">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                    {insight.category}
                  </span>
                  {insight.featured && (
                    <span className="px-3 py-1 bg-[#00d4ff]/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {insight.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="truncate">{insight.author}</span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Clock size={12} />
                      {insight.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {insight.views}
                    </span>
                    <span>{insight.readTime}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#00d4ff]/10">
                  <span className="text-[#00d4ff] text-sm font-semibold group-hover:gap-2 transition-all flex items-center gap-1">
                    Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredInsights.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto mb-4 text-gray-500 opacity-50" />
            <p className="text-gray-400 text-lg mb-2">No articles found matching your criteria.</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter settings.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay <span className="gradient-text">Informed</span>
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly insights and analysis on Bangladesh's development trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.15);
        }
      `}</style>
    </div>
  )
}