// app/insights/[slug]/page.jsx
'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles } from '@/data/articles'
import ArticleHero from '@/components/insights/ArticleHero'
import ArticleMeta from '@/components/insights/ArticleMeta'
import ArticleContent from '@/components/insights/ArticleContent'
import AuthorBio from '@/components/insights/AuthorBio'
import RelatedArticles from '@/components/insights/RelatedArticles'
import EngagementSection from '@/components/insights/EngagementSection'
import ShareSection from '@/components/insights/ShareSection'

export default function InsightDetailPage() {
  const params = useParams()
  const slug = params.slug
  
  const article = getArticleBySlug(slug)
  const relatedArticles = article ? getRelatedArticles(article.id) : []

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(156)
  const [isLiked, setIsLiked] = useState(false)

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            href="/insights" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={20} />
            Return to Insights
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a]">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-8">
        <Link href="/insights" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* Hero Section */}
      <ArticleHero article={article} />

      {/* Meta Info */}
      <ArticleMeta 
        article={article}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        isLiked={isLiked}
        handleLike={handleLike}
      />

      {/* Article Content */}
      <ArticleContent article={article} />

      {/* Engagement & Share */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <EngagementSection 
          likes={likes}
          isLiked={isLiked}
          handleLike={handleLike}
        />
        <ShareSection />
        <AuthorBio author={article.author} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </div>
  )
}