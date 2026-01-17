'use client'

import { Clock, ArrowRight, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { articles } from '@/data/articles'

export default function LatestInsights() {
  // Latest 4টা article নিন
  const insights = articles.slice(0, 4)

  return (
    <section className="py-24 px-6 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
          <div className="flex-grow">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Data-driven stories and analysis from Bangladesh
            </p>
          </div>
          <Link href="/insights" className="hidden md:block flex-shrink-0 px-6 py-3 bg-[#1a2332] text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Link
              href={`/insights/${insight.slug}`}
              key={insight.id}
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
                    <span className="truncate">{insight.author.name}</span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Clock size={12} />
                      {insight.publishedDate}
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

        <div className="flex justify-center mt-12 md:hidden">
          <Link href="/insights" className="w-full sm:w-auto px-8 py-3 bg-[#1a2332] text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg font-semibold hover:bg-[#1f2937] transition-colors text-center block">
            View All Articles
          </Link>
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
    </section>
  )
}