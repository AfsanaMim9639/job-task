// components/ShareSection.jsx
import { Facebook, Twitter, Linkedin, Copy } from 'lucide-react'

export default function ShareSection() {
  const handleShare = (platform) => {
    console.log(`Sharing on ${platform}`)
    // Implement actual sharing logic here
  }

  return (
    <div className="mt-8 bg-[#1a2332] border border-[#00d4ff]/20 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1877f2] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Facebook size={18} />
          Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1da1f2] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Twitter size={18} />
          Twitter
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Linkedin size={18} />
          LinkedIn
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0d1428] text-gray-300 border border-[#00d4ff]/20 rounded-lg hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all"
        >
          <Copy size={18} />
          Copy Link
        </button>
      </div>
    </div>
  )
}