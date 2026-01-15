'use client'

import { Database, CheckCircle, ArrowUpRight } from 'lucide-react'

export default function DataSources() {
  const sources = [
    {
      name: 'Bangladesh Bureau of Statistics',
      acronym: 'BBS',
      datasets: 450,
      lastUpdate: '2 days ago',
      reliability: 98,
      categories: ['Demographics', 'Economy', 'Social']
    },
    {
      name: 'Bangladesh Bank',
      acronym: 'BB',
      datasets: 312,
      lastUpdate: '1 day ago',
      reliability: 99,
      categories: ['Finance', 'Economy', 'Trade']
    },
    {
      name: 'Ministry of Health',
      acronym: 'MOH',
      datasets: 278,
      lastUpdate: '3 days ago',
      reliability: 97,
      categories: ['Healthcare', 'Public Health']
    },
    {
      name: 'Directorate of Education',
      acronym: 'DOE',
      datasets: 234,
      lastUpdate: '5 days ago',
      reliability: 96,
      categories: ['Education', 'Schools', 'Students']
    },
    {
      name: 'Local Government Division',
      acronym: 'LGD',
      datasets: 189,
      lastUpdate: '1 week ago',
      reliability: 95,
      categories: ['Infrastructure', 'Urban', 'Rural']
    },
    {
      name: 'Bangladesh Meteorological',
      acronym: 'BMD',
      datasets: 156,
      lastUpdate: '1 day ago',
      reliability: 99,
      categories: ['Climate', 'Weather', 'Environment']
    }
  ]

  return (
    <section className="py-20 px-6 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted <span className="gradient-text">Data Sources</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Official data from verified government and institutional sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((source, index) => (
            <div
              key={index}
              className="card-hover bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center">
                    <Database className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                      {source.acronym}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle size={12} />
                      Verified
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="text-gray-500 group-hover:text-[#00d4ff] transition-colors" size={20} />
              </div>

              {/* Source Name */}
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                {source.name}
              </h4>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {source.datasets}
                  </div>
                  <div className="text-xs text-gray-500">Datasets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {source.reliability}%
                  </div>
                  <div className="text-xs text-gray-500">Reliability</div>
                </div>
              </div>

              {/* Reliability Bar */}
              <div className="mb-4">
                <div className="h-2 bg-[#0d1428] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0066ff] transition-all duration-500"
                    style={{ width: `${source.reliability}%` }}
                  ></div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {source.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[#0d1428] text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Last Update */}
              <div className="text-xs text-gray-500 flex items-center justify-between pt-4 border-t border-[#00d4ff]/10">
                <span>Last updated</span>
                <span className="text-gray-400">{source.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Want to contribute data?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We welcome partnerships with organizations committed to open data. 
            Join us in making Bangladesh&aposs data more accessible and transparent.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform">
            Become a Data Partner
          </button>
        </div>
      </div>
    </section>
  )
}