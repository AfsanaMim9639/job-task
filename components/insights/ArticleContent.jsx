// components/ArticleContent.jsx
import { Tag } from 'lucide-react'

export default function ArticleContent({ article }) {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-12">
      <article className="prose prose-invert prose-lg max-w-none">
        <div 
          className="text-gray-300 leading-relaxed article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-[#00d4ff]/10">
        <div className="flex items-center gap-2 mb-4">
          <Tag size={20} className="text-gray-400" />
          <span className="text-gray-400 font-semibold">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-[#1a2332] text-gray-300 rounded-lg text-sm border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .article-content h2 {
          color: white;
          font-size: 1.875rem;
          font-weight: bold;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.875;
        }

        .article-content blockquote {
          border-left: 4px solid #00d4ff;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  )
}