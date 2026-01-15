'use client'

import { useState } from 'react'
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  Building2,
  Activity,
  GraduationCap,
  Leaf,
  CheckCircle,
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Star,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { DatasetPreviewModal } from '@/components/DatasetPreviewModal'
export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [previewDataset, setPreviewDataset] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { id: 'all', label: 'All Categories', icon: Database },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'economy', label: 'Economy', icon: TrendingUp },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
    { id: 'healthcare', label: 'Healthcare', icon: Activity },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'environment', label: 'Environment', icon: Leaf }
  ]

  const sources = [
    { id: 'all', label: 'All Sources' },
    { id: 'bbs', label: 'Bangladesh Bureau of Statistics' },
    { id: 'bb', label: 'Bangladesh Bank' },
    { id: 'moh', label: 'Ministry of Health' },
    { id: 'doe', label: 'Directorate of Education' },
    { id: 'lgd', label: 'Local Government Division' }
  ]

  const datasets = [
    {
      id: 1,
      title: 'National Population Census 2024',
      description: 'Comprehensive demographic data including age, gender, occupation, and household information across all districts.',
      category: 'demographics',
      source: 'bbs',
      sourceName: 'Bangladesh Bureau of Statistics',
      size: '2.4 GB',
      format: 'CSV, JSON, Excel',
      lastUpdate: '2 days ago',
      downloads: 15420,
      views: 45230,
      featured: true,
      records: '45M+',
      tags: ['Population', 'Census', 'Demographics']
    },
    {
      id: 2,
      title: 'GDP Growth & Economic Indicators 2025',
      description: 'Quarterly GDP data, inflation rates, trade balance, and key economic performance metrics.',
      category: 'economy',
      source: 'bb',
      sourceName: 'Bangladesh Bank',
      size: '156 MB',
      format: 'CSV, JSON',
      lastUpdate: '1 day ago',
      downloads: 12850,
      views: 38640,
      featured: true,
      records: '2.5M+',
      tags: ['GDP', 'Economy', 'Inflation']
    },
    {
      id: 3,
      title: 'Hospital & Healthcare Facilities Database',
      description: 'Complete directory of hospitals, clinics, diagnostic centers with capacity and services information.',
      category: 'healthcare',
      source: 'moh',
      sourceName: 'Ministry of Health',
      size: '340 MB',
      format: 'CSV, JSON, Excel',
      lastUpdate: '3 days ago',
      downloads: 8920,
      views: 28450,
      featured: false,
      records: '12K+',
      tags: ['Healthcare', 'Hospitals', 'Medical']
    },
    {
      id: 4,
      title: 'Educational Institution Statistics',
      description: 'Data on schools, colleges, universities including enrollment, faculty, infrastructure details.',
      category: 'education',
      source: 'doe',
      sourceName: 'Directorate of Education',
      size: '580 MB',
      format: 'CSV, Excel',
      lastUpdate: '5 days ago',
      downloads: 10230,
      views: 32100,
      featured: false,
      records: '45K+',
      tags: ['Education', 'Schools', 'Students']
    },
    {
      id: 5,
      title: 'Road Network & Transportation Data',
      description: 'Comprehensive road network data, traffic patterns, public transport routes and schedules.',
      category: 'infrastructure',
      source: 'lgd',
      sourceName: 'Local Government Division',
      size: '1.2 GB',
      format: 'CSV, GeoJSON',
      lastUpdate: '1 week ago',
      downloads: 6780,
      views: 21340,
      featured: false,
      records: '8.5M+',
      tags: ['Roads', 'Transport', 'Infrastructure']
    },
    {
      id: 6,
      title: 'Environmental & Climate Data',
      description: 'Historical weather patterns, air quality indices, rainfall data, and climate change indicators.',
      category: 'environment',
      source: 'bbs',
      sourceName: 'Bangladesh Bureau of Statistics',
      size: '890 MB',
      format: 'CSV, JSON',
      lastUpdate: '3 days ago',
      downloads: 5430,
      views: 18920,
      featured: false,
      records: '15M+',
      tags: ['Climate', 'Weather', 'Environment']
    },
    {
      id: 7,
      title: 'Employment & Labor Force Survey',
      description: 'Labor market statistics, employment rates, wage data, and workforce demographics.',
      category: 'economy',
      source: 'bbs',
      sourceName: 'Bangladesh Bureau of Statistics',
      size: '420 MB',
      format: 'CSV, Excel',
      lastUpdate: '1 week ago',
      downloads: 7890,
      views: 24560,
      featured: false,
      records: '5.2M+',
      tags: ['Employment', 'Labor', 'Workforce']
    },
    {
      id: 8,
      title: 'Urban Development & City Planning',
      description: 'Urban area mapping, population density, land use patterns, and development indicators.',
      category: 'infrastructure',
      source: 'lgd',
      sourceName: 'Local Government Division',
      size: '1.8 GB',
      format: 'GeoJSON, CSV',
      lastUpdate: '4 days ago',
      downloads: 4920,
      views: 16780,
      featured: false,
      records: '3.4M+',
      tags: ['Urban', 'Planning', 'Development']
    },
    {
      id: 9,
      title: 'Public Health Indicators',
      description: 'Disease prevalence, immunization rates, maternal health, and nutrition statistics.',
      category: 'healthcare',
      source: 'moh',
      sourceName: 'Ministry of Health',
      size: '290 MB',
      format: 'CSV, JSON',
      lastUpdate: '2 days ago',
      downloads: 9340,
      views: 27680,
      featured: false,
      records: '8.9M+',
      tags: ['Health', 'Disease', 'Nutrition']
    }
  ]

  // handleDownload function - DatasetsPage component er vitore add korun
const handleDownload = (dataset) => {
  // Generate sample data based on category (same as modal)
  const generateSampleData = (category) => {
    const samples = {
      demographics: [
        { id: 1, district: 'Dhaka', population: 12043977, malePopulation: 6221789, femalePopulation: 5822188, households: 2890456 },
        { id: 2, district: 'Chittagong', population: 8230020, malePopulation: 4256891, femalePopulation: 3973129, households: 1978340 },
        { id: 3, district: 'Rajshahi', population: 2595197, malePopulation: 1342567, femalePopulation: 1252630, households: 623456 },
        { id: 4, district: 'Khulna', population: 2378971, malePopulation: 1234890, femalePopulation: 1144081, households: 567234 },
        { id: 5, district: 'Sylhet', population: 3847847, malePopulation: 1989234, femalePopulation: 1858613, households: 892345 },
        { id: 6, district: 'Barisal', population: 2324310, malePopulation: 1198456, femalePopulation: 1125854, households: 556789 },
        { id: 7, district: 'Rangpur', population: 2881086, malePopulation: 1489234, femalePopulation: 1391852, households: 689234 },
        { id: 8, district: 'Mymensingh', population: 5110905, malePopulation: 2645678, femalePopulation: 2465227, households: 1223456 },
        { id: 9, district: 'Comilla', population: 5387288, malePopulation: 2789456, femalePopulation: 2597832, households: 1289567 },
        { id: 10, district: 'Gazipur', population: 3403912, malePopulation: 1756789, femalePopulation: 1647123, households: 814567 },
      ],
      economy: [
        { quarter: 'Q1 2025', gdpGrowth: 6.8, inflation: 5.2, exports: 12340, imports: 18920, tradeBalance: -6580 },
        { quarter: 'Q4 2024', gdpGrowth: 6.5, inflation: 5.8, exports: 11890, imports: 17450, tradeBalance: -5560 },
        { quarter: 'Q3 2024', gdpGrowth: 6.3, inflation: 6.1, exports: 11230, imports: 16780, tradeBalance: -5550 },
        { quarter: 'Q2 2024', gdpGrowth: 6.1, inflation: 6.4, exports: 10890, imports: 16230, tradeBalance: -5340 },
        { quarter: 'Q1 2024', gdpGrowth: 5.9, inflation: 6.8, exports: 10234, imports: 15890, tradeBalance: -5656 },
        { quarter: 'Q4 2023', gdpGrowth: 5.8, inflation: 7.2, exports: 9890, imports: 15234, tradeBalance: -5344 },
        { quarter: 'Q3 2023', gdpGrowth: 5.6, inflation: 7.5, exports: 9456, imports: 14890, tradeBalance: -5434 },
        { quarter: 'Q2 2023', gdpGrowth: 5.4, inflation: 7.8, exports: 9123, imports: 14456, tradeBalance: -5333 },
        { quarter: 'Q1 2023', gdpGrowth: 5.2, inflation: 8.1, exports: 8890, imports: 14123, tradeBalance: -5233 },
        { quarter: 'Q4 2022', gdpGrowth: 5.0, inflation: 8.5, exports: 8567, imports: 13789, tradeBalance: -5222 },
      ],
      healthcare: [
        { facility: 'Dhaka Medical College Hospital', type: 'Government', beds: 2600, doctors: 450, location: 'Dhaka', services: 'Full Service' },
        { facility: 'Chittagong Medical College', type: 'Government', beds: 1350, doctors: 280, location: 'Chittagong', services: 'Full Service' },
        { facility: 'Square Hospital', type: 'Private', beds: 650, doctors: 320, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Apollo Hospital Dhaka', type: 'Private', beds: 450, doctors: 180, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Rajshahi Medical College', type: 'Government', beds: 1050, doctors: 210, location: 'Rajshahi', services: 'Full Service' },
        { facility: 'United Hospital', type: 'Private', beds: 450, doctors: 250, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Evercare Hospital', type: 'Private', beds: 425, doctors: 230, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Sylhet MAG Osmani Medical College', type: 'Government', beds: 1000, doctors: 190, location: 'Sylhet', services: 'Full Service' },
        { facility: 'Khulna Medical College Hospital', type: 'Government', beds: 750, doctors: 165, location: 'Khulna', services: 'Full Service' },
        { facility: 'Labaid Hospital', type: 'Private', beds: 350, doctors: 180, location: 'Dhaka', services: 'Specialized' },
      ],
      education: [
        { institution: 'Dhaka University', type: 'University', students: 37018, faculty: 1992, established: 1921, location: 'Dhaka' },
        { institution: 'Notre Dame College', type: 'College', students: 8500, faculty: 180, established: 1949, location: 'Dhaka' },
        { institution: 'Viqarunnisa Noon School', type: 'School', students: 12000, faculty: 320, established: 1952, location: 'Dhaka' },
        { institution: 'Chittagong University', type: 'University', students: 24912, faculty: 1108, established: 1966, location: 'Chittagong' },
        { institution: 'BUET', type: 'University', students: 10000, faculty: 580, established: 1962, location: 'Dhaka' },
        { institution: 'Rajshahi University', type: 'University', students: 28000, faculty: 950, established: 1953, location: 'Rajshahi' },
        { institution: 'Jahangirnagar University', type: 'University', students: 18500, faculty: 720, established: 1970, location: 'Savar' },
        { institution: 'Holy Cross College', type: 'College', students: 7200, faculty: 165, established: 1950, location: 'Dhaka' },
        { institution: 'Dhaka College', type: 'College', students: 9500, faculty: 210, established: 1841, location: 'Dhaka' },
        { institution: 'Adamjee Cantonment College', type: 'College', students: 6800, faculty: 145, established: 1960, location: 'Dhaka' },
      ],
      infrastructure: [
        { route: 'Dhaka-Chittagong Highway', length: 243, type: 'National', condition: 'Good', traffic: 'High', lanes: 4 },
        { route: 'Dhaka-Sylhet Highway', length: 208, type: 'National', condition: 'Fair', traffic: 'Medium', lanes: 2 },
        { route: 'Padma Bridge', length: 6.15, type: 'Bridge', condition: 'Excellent', traffic: 'High', lanes: 4 },
        { route: 'Dhaka Metro Rail', length: 21.26, type: 'Metro', condition: 'Excellent', traffic: 'High', lanes: 2 },
        { route: 'Dhaka-Aricha Highway', length: 72, type: 'National', condition: 'Good', traffic: 'High', lanes: 4 },
        { route: 'Dhaka-Mymensingh Highway', length: 120, type: 'National', condition: 'Good', traffic: 'Medium', lanes: 4 },
        { route: 'Dhaka Elevated Expressway', length: 46.73, type: 'Expressway', condition: 'Excellent', traffic: 'High', lanes: 4 },
        { route: 'Bangabandhu Bridge', length: 4.8, type: 'Bridge', condition: 'Good', traffic: 'High', lanes: 2 },
        { route: 'Dhaka-Khulna Highway', length: 278, type: 'National', condition: 'Fair', traffic: 'Medium', lanes: 2 },
        { route: 'Karnaphuli Tunnel', length: 9.39, type: 'Tunnel', condition: 'Excellent', traffic: 'Medium', lanes: 4 },
      ],
      environment: [
        { location: 'Dhaka', year: 2024, avgTemp: 26.8, rainfall: 2076, aqi: 168, co2: 456, humidity: 76 },
        { location: 'Chittagong', year: 2024, avgTemp: 27.2, rainfall: 2540, aqi: 142, co2: 389, humidity: 78 },
        { location: 'Sylhet', year: 2024, avgTemp: 25.4, rainfall: 4162, aqi: 98, co2: 234, humidity: 82 },
        { location: 'Rajshahi', year: 2024, avgTemp: 26.1, rainfall: 1448, aqi: 156, co2: 378, humidity: 71 },
        { location: 'Khulna', year: 2024, avgTemp: 26.9, rainfall: 1809, aqi: 134, co2: 345, humidity: 77 },
        { location: 'Barisal', year: 2024, avgTemp: 27.1, rainfall: 2489, aqi: 112, co2: 298, humidity: 79 },
        { location: 'Rangpur', year: 2024, avgTemp: 25.2, rainfall: 2031, aqi: 145, co2: 312, humidity: 74 },
        { location: 'Mymensingh', year: 2024, avgTemp: 25.8, rainfall: 2198, aqi: 128, co2: 289, humidity: 75 },
        { location: 'Comilla', year: 2024, avgTemp: 26.5, rainfall: 2345, aqi: 138, co2: 334, humidity: 77 },
        { location: 'Cox\'s Bazar', year: 2024, avgTemp: 27.8, rainfall: 3262, aqi: 89, co2: 198, humidity: 81 },
      ]
    }
    return samples[category] || samples.demographics
  }

  const data = generateSampleData(dataset.category)
  
  if (!data || data.length === 0) {
    alert('No data available for download')
    return
  }

  const columns = Object.keys(data[0] || {})
  
  // Create CSV
  const header = columns.join(',')
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col]
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )
  
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const filename = `${dataset.title.toLowerCase().replace(/\s+/g, '_')}.csv`
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory
    const matchesSource = selectedSource === 'all' || dataset.source === selectedSource
    return matchesSearch && matchesCategory && matchesSource
  })

  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads
      case 'views':
        return b.views - a.views
      case 'recent':
      default:
        return 0 // Keep original order for recent
    }
  })

  const stats = {
    totalDatasets: datasets.length,
    totalDownloads: datasets.reduce((sum, d) => sum + d.downloads, 0),
    totalRecords: '150M+',
    updateFrequency: 'Daily'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="gradient-text">Datasets</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Access comprehensive, verified datasets from trusted sources across Bangladesh
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <Database className="text-[#00d4ff] mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white mb-1">{stats.totalDatasets}</div>
            <div className="text-xs text-gray-400">Datasets</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <Download className="text-[#00d4ff] mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white mb-1">{(stats.totalDownloads / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400">Downloads</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <FileSpreadsheet className="text-[#00d4ff] mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white mb-1">{stats.totalRecords}</div>
            <div className="text-xs text-gray-400">Records</div>
          </div>
          <div className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg p-4 text-center">
            <Clock className="text-[#00d4ff] mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white mb-1">{stats.updateFrequency}</div>
            <div className="text-xs text-gray-400">Updates</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search datasets by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="text-[#00d4ff]" size={20} />
                <h3 className="font-semibold text-white">Categories</h3>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? 'bg-[#00d4ff]/10 border border-[#00d4ff]'
                          : 'bg-[#0d1428] border border-transparent hover:bg-[#1a2332]'
                      }`}
                    >
                      <Icon size={16} className={selectedCategory === category.id ? 'text-[#00d4ff]' : 'text-gray-400'} />
                      <span className="text-sm text-white">{category.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Source Filter */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Data Source</h3>
              <div className="space-y-2">
                {sources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => setSelectedSource(source.id)}
                    className={`w-full p-2 rounded-lg text-left text-sm transition-all ${
                      selectedSource === source.id
                        ? 'bg-[#00d4ff]/10 text-[#00d4ff]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0d1428]'
                    }`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { id: 'recent', label: 'Most Recent' },
                  { id: 'popular', label: 'Most Downloaded' },
                  { id: 'views', label: 'Most Viewed' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`w-full p-2 rounded-lg text-left text-sm transition-all ${
                      sortBy === option.id
                        ? 'bg-[#00d4ff]/10 text-[#00d4ff]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0d1428]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Datasets List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                Showing <span className="text-white font-semibold">{sortedDatasets.length}</span> datasets
              </p>
            </div>

            {/* Dataset Cards */}
            <div className="space-y-4">
              {sortedDatasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                              {dataset.title}
                            </h3>
                            {dataset.featured && (
                              <Star className="text-yellow-400 fill-yellow-400" size={16} />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <CheckCircle size={12} className="text-green-400" />
                              {dataset.sourceName}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {dataset.lastUpdate}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">
                            {dataset.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {dataset.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-[#0d1428] text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button 
                    onClick={() => handleDownload(dataset)}
                    className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap"
                    >
                    <Download size={16} />
                    Download
                    </button>
                      <button 
                        onClick={() => {
                            setPreviewDataset(dataset)
                            setIsModalOpen(true)
                        }}
                        className="px-6 py-2 bg-[#0d1428] border border-[#00d4ff]/20 text-white rounded-lg hover:bg-[#1a2332] transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                        <Eye size={16} />
                        Preview
                        </button>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#00d4ff]/10">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{dataset.records}</div>
                      <div className="text-xs text-gray-500">Records</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{dataset.size}</div>
                      <div className="text-xs text-gray-500">File Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{(dataset.downloads / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-gray-500">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{dataset.format}</div>
                      <div className="text-xs text-gray-500">Formats</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedDatasets.length === 0 && (
              <div className="text-center py-16 bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl">
                <Database size={48} className="mx-auto mb-4 text-gray-500 opacity-50" />
                <p className="text-gray-400 text-lg mb-2">No datasets found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Custom <span className="gradient-text">Data Solutions?</span>
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Contact us for custom data extraction, analysis, or integration services tailored to your specific needs.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2">
              Contact Us
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>


      <DatasetPreviewModal 
        dataset={previewDataset}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    </div>
  )
}