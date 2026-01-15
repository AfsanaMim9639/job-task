// components/ArticleMeta.jsx
import Image from 'next/image'
import { Calendar, Clock, Eye, ThumbsUp, Bookmark, Share2 } from 'lucide-react'

export default function ArticleMeta({ article, isBookmarked, setIsBookmarked, isLiked, handleLike }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-12">
      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{article.publishedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{article.readTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={18} />
          <span>{article.views} views</span>
        </div>
      </div>

      {/* Author Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-y border-[#00d4ff]/10 py-6 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00d4ff]/30">
            <Image
              src={article.author.image}
              alt={article.author.name}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{article.author.name}</h3>
            <p className="text-gray-400 text-sm">{article.author.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`p-3 rounded-lg border transition-all ${
              isLiked
                ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]'
                : 'bg-[#1a2332] border-[#00d4ff]/20 text-gray-400 hover:text-[#00d4ff]'
            }`}
          >
            <ThumbsUp size={20} />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-3 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]'
                : 'bg-[#1a2332] border-[#00d4ff]/20 text-gray-400 hover:text-[#00d4ff]'
            }`}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-3 rounded-lg bg-[#1a2332] border border-[#00d4ff]/20 text-gray-400 hover:text-[#00d4ff] transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}