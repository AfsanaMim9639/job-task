// components/RelatedArticles.jsx
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function RelatedArticles({ articles }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <div className="border-t border-[#00d4ff]/10 pt-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="text-[#00d4ff]" size={24} />
          <h2 className="text-3xl font-bold text-white">
            Related <span className="gradient-text">Articles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/insights/${article.slug}`}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{article.publishedDate}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
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