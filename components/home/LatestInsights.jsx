'use client'

import { Clock, ArrowRight, Eye } from 'lucide-react'
import Image from 'next/image'

export default function LatestInsights() {
  const insights = [
    {
      category: 'Economic Analysis',
      title: 'Bangladesh\'s Digital Economy Grows 28% in 2025',
      excerpt: 'The digital economy sector shows remarkable growth with increased e-commerce adoption and fintech innovation across urban and rural areas.',
      author: 'Dr. Rahman',
      date: '2 days ago',
      readTime: '5 min read',
      views: '12.5K',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      category: 'Infrastructure',
      title: 'Metro Rail Network Expansion: Impact on Dhaka Traffic',
      excerpt: 'New data reveals 23% reduction in traffic congestion along metro corridors, with significant improvements in commute times.',
      author: 'Sarah Ahmed',
      date: '5 days ago',
      readTime: '7 min read',
      views: '8.3K',
      image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80'
    },
    {
      category: 'Healthcare',
      title: 'Rural Healthcare Access Improves with Telemedicine',
      excerpt: 'Analysis of 500+ community clinics shows 45% increase in patient consultations through digital health platforms.',
      author: 'Dr. Fatima',
      date: '1 week ago',
      readTime: '6 min read',
      views: '15.2K',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    },
    {
      category: 'Education',
      title: 'STEM Education Rise: 35% More Enrollments in 2025',
      excerpt: 'Universities report significant growth in science and technology programs, driven by industry demand and government initiatives.',
      author: 'Prof. Hasan',
      date: '1 week ago',
      readTime: '4 min read',
      views: '6.7K',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
    }
  ]

  return (
    <section className="py-24 px-6 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
          <div className="flex-grow">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Data-driven stories and analysis from Bangladesh
            </p>
          </div>
          <button className="hidden md:block flex-shrink-0 px-6 py-3 bg-[#1a2332] text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors">
            View All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="h-48 w-full relative flex-shrink-0 overflow-hidden bg-[#0d1428]">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                    {insight.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
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
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 md:hidden">
          <button className="w-full sm:w-auto px-8 py-3 bg-[#1a2332] text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}