// components/ArticleHero.jsx
import Image from 'next/image'

export default function ArticleHero({ article }) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="mb-6">
          <span className="px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-full text-sm font-semibold border border-[#00d4ff]/30">
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-[#00d4ff]/20">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </>
  )
}