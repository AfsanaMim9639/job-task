// data/articles.js
export const articles = [
  {
    id: 1,
    slug: 'bangladesh-digital-economy-grows-28-percent-2025',
    category: 'Economic Analysis',
    title: 'Bangladesh\'s Digital Economy Grows 28% in 2025',
    excerpt: 'The digital economy sector shows remarkable growth with increased e-commerce adoption and fintech innovation across urban and rural areas.',
    author: {
      name: 'Dr. Rahman',
      title: 'Chief Economist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Dr. Rahman is a leading economist specializing in digital transformation and economic development.'
    },
    publishedDate: 'January 13, 2026',
    readTime: '5 min read',
    views: '12.5K',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tags: ['Digital Economy', 'E-commerce', 'Fintech', 'Bangladesh', 'Economic Growth'],
    content: `
      <h2>The Digital Revolution</h2>
      <p>Bangladesh's digital economy has experienced unprecedented growth in 2025...</p>
    `
  },
  {
    id: 2,
    slug: 'fintech-startups-new-wave-innovation',
    category: 'Technology',
    title: 'Fintech Startups: The New Wave of Innovation',
    excerpt: 'Exploring how fintech startups are revolutionizing financial services in Bangladesh with innovative solutions.',
    author: {
      name: 'Sarah Ahmed',
      title: 'Tech Journalist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Sarah Ahmed covers technology and innovation in South Asia with over 10 years of experience.'
    },
    publishedDate: 'January 10, 2026',
    readTime: '4 min read',
    views: '8.3K',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    tags: ['Fintech', 'Startups', 'Innovation', 'Technology'],
    content: `
      <h2>The Fintech Revolution</h2>
      <p>Fintech startups in Bangladesh are transforming how people access financial services...</p>
    `
  },
  {
    id: 3,
    slug: 'rural-internet-penetration-reaches-65-percent',
    category: 'Infrastructure',
    title: 'Rural Internet Penetration Reaches 65%',
    excerpt: 'A milestone achievement as rural Bangladesh embraces digital connectivity at unprecedented rates.',
    author: {
      name: 'Imran Hassan',
      title: 'Infrastructure Analyst',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Imran Hassan specializes in telecommunications and infrastructure development.'
    },
    publishedDate: 'January 8, 2026',
    readTime: '6 min read',
    views: '9.7K',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    tags: ['Infrastructure', 'Internet', 'Rural Development', 'Connectivity'],
    content: `
      <h2>Bridging the Digital Divide</h2>
      <p>Rural internet penetration has reached an impressive 65%, marking a significant milestone...</p>
    `
  },
  {
    id: 4,
    slug: 'sme-digital-transformation-success-stories',
    category: 'Economic Analysis',
    title: 'SME Digital Transformation Success Stories',
    excerpt: 'How small and medium enterprises are leveraging digital tools to scale their businesses.',
    author: {
      name: 'Dr. Rahman',
      title: 'Chief Economist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Dr. Rahman is a leading economist specializing in digital transformation and economic development.'
    },
    publishedDate: 'January 6, 2026',
    readTime: '7 min read',
    views: '11.2K',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    tags: ['SME', 'Digital Transformation', 'Business', 'Success Stories'],
    content: `
      <h2>SME Success in the Digital Age</h2>
      <p>Small and medium enterprises are experiencing remarkable success through digital adoption...</p>
    `
  },
  {
    id: 5,
    slug: 'ai-adoption-bangladesh-business-sector',
    category: 'Technology',
    title: 'AI Adoption in Bangladesh Business Sector',
    excerpt: 'Artificial intelligence is making inroads into various business sectors, transforming operations.',
    author: {
      name: 'Nadia Khan',
      title: 'AI Research Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Nadia Khan leads AI research initiatives focusing on practical business applications.'
    },
    publishedDate: 'January 5, 2026',
    readTime: '8 min read',
    views: '14.5K',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    tags: ['AI', 'Technology', 'Business', 'Innovation'],
    content: `
      <h2>AI in Bangladesh</h2>
      <p>Artificial intelligence adoption is accelerating across Bangladesh's business landscape...</p>
    `
  },
  {
    id: 6,
    slug: 'green-energy-investment-opportunities',
    category: 'Economic Analysis',
    title: 'Green Energy Investment Opportunities',
    excerpt: 'Exploring the growing renewable energy sector and investment potential in Bangladesh.',
    author: {
      name: 'Tarek Rahman',
      title: 'Energy Sector Analyst',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Tarek Rahman analyzes energy markets and sustainable development opportunities.'
    },
    publishedDate: 'January 3, 2026',
    readTime: '6 min read',
    views: '10.8K',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    tags: ['Green Energy', 'Investment', 'Sustainability', 'Renewable'],
    content: `
      <h2>The Green Energy Boom</h2>
      <p>Bangladesh's renewable energy sector is attracting significant investment...</p>
    `
  }
]

export function getArticleBySlug(slug) {
  return articles.find(article => article.slug === slug)
}

export function getRelatedArticles(currentId, limit = 3) {
  return articles
    .filter(article => article.id !== currentId)
    .slice(0, limit)
}