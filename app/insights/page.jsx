'use client'

import { useState } from 'react'
import { Search, Clock, Eye, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AllInsightsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['All', 'Economic Analysis', 'Infrastructure', 'Healthcare', 'Education', 'Technology', 'Environment', 'Social']

  const insights = [
    {
      id: 1,
      slug: 'bangladesh-digital-economy-grows-28-percent-2025',
      category: 'Economic Analysis',
      title: 'Bangladesh\'s Digital Economy Grows 28% in 2025',
      excerpt: 'The digital economy sector shows remarkable growth with increased e-commerce adoption and fintech innovation across urban and rural areas.',
      author: 'Dr. Rahman',
      date: '2 days ago',
      readTime: '5 min read',
      views: '12.5K',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      featured: true
    },
    {
      id: 2,
      slug: 'metro-rail-network-expansion-dhaka-traffic',
      category: 'Infrastructure',
      title: 'Metro Rail Network Expansion: Impact on Dhaka Traffic',
      excerpt: 'New data reveals 23% reduction in traffic congestion along metro corridors, with significant improvements in commute times.',
      author: 'Sarah Ahmed',
      date: '5 days ago',
      readTime: '7 min read',
      views: '8.3K',
      image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80',
      featured: true
    },
    {
      id: 3,
      slug: 'rural-healthcare-access-telemedicine',
      category: 'Healthcare',
      title: 'Rural Healthcare Access Improves with Telemedicine',
      excerpt: 'Analysis of 500+ community clinics shows 45% increase in patient consultations through digital health platforms.',
      author: 'Dr. Fatima',
      date: '1 week ago',
      readTime: '6 min read',
      views: '15.2K',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      featured: false
    },
    {
      id: 4,
      slug: 'stem-education-rise-35-percent-enrollments-2025',
      category: 'Education',
      title: 'STEM Education Rise: 35% More Enrollments in 2025',
      excerpt: 'Universities report significant growth in science and technology programs, driven by industry demand and government initiatives.',
      author: 'Prof. Hasan',
      date: '1 week ago',
      readTime: '4 min read',
      views: '6.7K',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      featured: false
    },
    {
      id: 5,
      slug: 'ai-adoption-bangladesh-tech-startups-growth',
      category: 'Technology',
      title: 'AI Adoption in Bangladesh: 67% Growth in Tech Startups',
      excerpt: 'Local tech companies embrace artificial intelligence and machine learning, creating innovative solutions for regional challenges.',
      author: 'Tanvir Hassan',
      date: '3 days ago',
      readTime: '8 min read',
      views: '9.8K',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      featured: false
    },
    {
      id: 6,
      slug: 'coastal-mangrove-restoration-positive-results',
      category: 'Environment',
      title: 'Coastal Mangrove Restoration Shows Positive Results',
      excerpt: 'Three-year reforestation project reports 40% increase in mangrove coverage, protecting coastal communities from erosion.',
      author: 'Dr. Nusrat Jahan',
      date: '4 days ago',
      readTime: '6 min read',
      views: '7.2K',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      featured: false
    },
    {
      id: 7,
      slug: 'export-diversification-beyond-rmg-success',
      category: 'Economic Analysis',
      title: 'Export Diversification: Beyond RMG Success Stories',
      excerpt: 'Pharmaceutical, leather, and ICT sectors show promising growth as Bangladesh reduces dependency on traditional exports.',
      author: 'Imran Chowdhury',
      date: '6 days ago',
      readTime: '9 min read',
      views: '11.1K',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      featured: false
    },
    {
      id: 8,
      slug: 'women-entrepreneurship-rural-areas-rising-trend',
      category: 'Social',
      title: 'Women Entrepreneurship: Rising Trend in Rural Areas',
      excerpt: 'Microfinance and digital banking enable 52% increase in women-led businesses across rural Bangladesh.',
      author: 'Ayesha Siddiqua',
      date: '1 week ago',
      readTime: '5 min read',
      views: '8.9K',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      featured: false
    },
    {
      id: 9,
      slug: 'padma-bridge-economic-impact-first-year',
      category: 'Infrastructure',
      title: 'Padma Bridge Economic Impact: First Year Analysis',
      excerpt: 'Comprehensive study reveals 31% reduction in travel time and significant boost to southern region economy.',
      author: 'Kamal Ahmed',
      date: '2 weeks ago',
      readTime: '10 min read',
      views: '18.3K',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80',
      featured: false
    },
    {
      id: 10,
      slug: 'hospital-bed-capacity-increases-22-percent',
      category: 'Healthcare',
      title: 'Hospital Bed Capacity Increases by 22% Nationwide',
      excerpt: 'Government and private sector investments expand healthcare infrastructure to meet growing demand.',
      author: 'Dr. Mahmud',
      date: '2 weeks ago',
      readTime: '6 min read',
      views: '5.4K',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      featured: false
    },
    {
      id: 11,
      slug: 'digital-learning-platforms-reach-2-million-students',
      category: 'Education',
      title: 'Digital Learning Platforms Reach 2 Million Students',
      excerpt: 'Online education initiatives bridge urban-rural divide with affordable access to quality educational content.',
      author: 'Farida Rahman',
      date: '3 weeks ago',
      readTime: '7 min read',
      views: '10.6K',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      featured: false
    },
    {
      id: 12,
      slug: '5g-rollout-bangladesh-new-digital-era',
      category: 'Technology',
      title: '5G Rollout: Bangladesh Enters New Digital Era',
      excerpt: 'First phase of 5G network deployment begins in major cities, promising revolutionary connectivity improvements.',
      author: 'Rafiq Khan',
      date: '3 weeks ago',
      readTime: '5 min read',
      views: '13.2K',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      featured: false
    }
  ]

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || insight.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalArticles: insights.length,
    totalViews: '126.5K',
    totalAuthors: new Set(insights.map(i => i.author)).size,
    avgReadTime: '6.5 min'
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