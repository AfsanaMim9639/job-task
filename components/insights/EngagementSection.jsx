// components/EngagementSection.jsx
import { ThumbsUp, MessageCircle } from 'lucide-react'

export default function EngagementSection({ likes, isLiked, handleLike }) {
  return (
    <div className="mt-12 pt-8 border-t border-[#00d4ff]/10">
      <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Was this article helpful?</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <ThumbsUp size={18} className={isLiked ? 'text-[#00d4ff]' : ''} />
            <span className="font-semibold">{likes} likes</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLike}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isLiked
                ? 'bg-[#00d4ff] text-[#0a0e1a]'
                : 'bg-[#0d1428] text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/10'
            }`}
          >
            {isLiked ? 'Liked!' : 'Like this article'}
          </button>
          <button className="px-6 py-3 bg-[#0d1428] text-gray-300 border border-[#00d4ff]/20 rounded-lg font-semibold hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all flex items-center gap-2">
            <MessageCircle size={18} />
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}