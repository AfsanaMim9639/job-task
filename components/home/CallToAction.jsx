'use client'

import { ArrowRight, Download, Code, BookOpen, Mail } from 'lucide-react'

function CallToAction() {
  const features = [
    {
      icon: Download,
      title: 'Export Data',
      description: 'Download in CSV, JSON, or Excel formats'
    },
    {
      icon: Code,
      title: 'API Access',
      description: 'Integrate with our RESTful API'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials'
    },
    {
      icon: Mail,
      title: 'Get Updates',
      description: 'Subscribe to data release notifications'
    }
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d4ff] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066ff] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main CTA Section */}
        <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-12 md:p-16 text-center mb-12 neon-glow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Explore</span> the Data?
            </h2>
            
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of researchers, analysts, and policymakers using 
              Bangladesh's most comprehensive open data platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold text-lg neon-glow hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Start Exploring <ArrowRight size={24} />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-[#1a2332] text-[#00d4ff] border-2 border-[#00d4ff]/30 rounded-lg font-semibold text-lg hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2">
                <Code size={20} />
                API Documentation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#00d4ff]/10">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">2,500+</div>
                <div className="text-sm text-gray-500">Datasets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-[#00d4ff]" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Stay Updated with Latest Data
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to receive notifications about new datasets, features, and insights
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CallToAction;