// components/AuthorBio.jsx
import Image from 'next/image'
import { User } from 'lucide-react'

export default function AuthorBio({ author }) {
  return (
    <div className="mt-8 bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00d4ff]/30 flex-shrink-0">
          <Image
            src={author.image}
            alt={author.name}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-[#00d4ff]" />
            <h3 className="text-xl font-bold text-white">About the Author</h3>
          </div>
          <h4 className="text-lg font-semibold text-[#00d4ff] mb-2">{author.name}</h4>
          <p className="text-sm text-gray-400 mb-3">{author.title}</p>
          <p className="text-gray-300">{author.bio}</p>
        </div>
      </div>
    </div>
  )
}