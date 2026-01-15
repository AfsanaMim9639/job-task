'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Filter, 
  Search, 
  TrendingUp, 
  Activity,
  Building2,
  Users,
  Download,
  Share2,
  Info,
  X
} from 'lucide-react'

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false })

export default function FullMapPage() {
  const [selectedLayer, setSelectedLayer] = useState('population')
  const [isMounted, setIsMounted] = useState(false)
  const [mapKey, setMapKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLegend, setShowLegend] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    setIsMounted(true)
    setMapKey(prev => prev + 1)
    import('leaflet/dist/leaflet.css')
  }, [])

  const layers = [
    { 
      id: 'population', 
      label: 'Population Density', 
      color: '#00d4ff',
      icon: Users,
      description: 'Population distribution across regions'
    },
    { 
      id: 'economy', 
      label: 'Economic Activity', 
      color: '#10b981',
      icon: TrendingUp,
      description: 'GDP and economic indicators'
    },
    { 
      id: 'infrastructure', 
      label: 'Infrastructure', 
      color: '#f59e0b',
      icon: Building2,
      description: 'Roads, utilities, and facilities'
    },
    { 
      id: 'healthcare', 
      label: 'Healthcare Facilities', 
      color: '#ef4444',
      icon: Activity,
      description: 'Hospitals and clinics distribution'
    }
  ]

  const regions = [
    { 
      name: 'Dhaka', 
      value: '21.7M', 
      growth: '+3.2%', 
      position: [23.8103, 90.4125], 
      radius: 80000,
      gdp: '$85B',
      hospitals: 342,
      literacy: '78%'
    },
    { 
      name: 'Chittagong', 
      value: '8.9M', 
      growth: '+2.8%', 
      position: [22.3569, 91.7832], 
      radius: 50000,
      gdp: '$42B',
      hospitals: 156,
      literacy: '72%'
    },
    { 
      name: 'Khulna', 
      value: '4.4M', 
      growth: '+1.9%', 
      position: [22.8456, 89.5403], 
      radius: 35000,
      gdp: '$18B',
      hospitals: 87,
      literacy: '68%'
    },
    { 
      name: 'Rajshahi', 
      value: '3.8M', 
      growth: '+1.5%', 
      position: [24.3745, 88.6042], 
      radius: 32000,
      gdp: '$15B',
      hospitals: 76,
      literacy: '71%'
    },
    { 
      name: 'Sylhet', 
      value: '3.2M', 
      growth: '+2.1%', 
      position: [24.8949, 91.8687], 
      radius: 30000,
      gdp: '$12B',
      hospitals: 64,
      literacy: '69%'
    },
    { 
      name: 'Rangpur', 
      value: '2.9M', 
      growth: '+1.8%', 
      position: [25.7439, 89.2752], 
      radius: 28000,
      gdp: '$11B',
      hospitals: 58,
      literacy: '66%'
    },
    { 
      name: 'Barisal', 
      value: '2.3M', 
      growth: '+1.4%', 
      position: [22.7010, 90.3535], 
      radius: 25000,
      gdp: '$9B',
      hospitals: 45,
      literacy: '65%'
    },
    { 
      name: 'Mymensingh', 
      value: '2.1M', 
      growth: '+1.6%', 
      position: [24.7471, 90.4203], 
      radius: 24000,
      gdp: '$8B',
      hospitals: 42,
      literacy: '67%'
    }
  ]

  const bangladeshCenter = [23.685, 90.3563]

  const getLayerColor = (layerId) => {
    return layers.find(l => l.id === layerId)?.color || '#00d4ff'
  }

  const getLayerIcon = (layerId) => {
    const layer = layers.find(l => l.id === layerId)
    return layer?.icon || Users
  }

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentLayer = layers.find(l => l.id === selectedLayer)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Interactive <span className="gradient-text">Map Explorer</span>
            </h1>
            <p className="text-gray-400">
              Visualize and analyze data across Bangladesh regions
            </p>
          </div>

          <div className="flex gap-2">
            <button className="p-3 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg hover:bg-[#1f2937] transition-colors">
              <Download className="text-[#00d4ff]" size={20} />
            </button>
            <button className="p-3 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg hover:bg-[#1f2937] transition-colors">
              <Share2 className="text-[#00d4ff]" size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Layer Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Layer Selector */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="text-[#00d4ff]" size={20} />
                <h3 className="font-semibold text-white">Data Layers</h3>
              </div>
              
              <div className="space-y-3">
                {layers.map((layer) => {
                  const Icon = layer.icon
                  return (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedLayer(layer.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedLayer === layer.id
                          ? 'bg-[#00d4ff]/10 border-2 border-[#00d4ff]'
                          : 'bg-[#0d1428] border border-[#00d4ff]/10 hover:bg-[#1a2332]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: layer.color }}
                        ></div>
                        <Icon size={16} style={{ color: layer.color }} />
                        <span className="text-sm font-medium text-white">
                          {layer.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 ml-6">
                        {layer.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Legend */}
            {showLegend && (
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Info className="text-[#00d4ff]" size={20} />
                    <h3 className="font-semibold text-white">Legend</h3>
                  </div>
                  <button 
                    onClick={() => setShowLegend(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Circle Size</span>
                    <span className="text-white">Population</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Color Intensity</span>
                    <span className="text-white">{currentLayer?.label}</span>
                  </div>
                  <div className="pt-3 border-t border-[#00d4ff]/10">
                    <div className="text-xs text-gray-500 mb-2">Size Scale:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLayerColor(selectedLayer) }}></div>
                      <span className="text-xs text-gray-400">Small</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent"></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getLayerColor(selectedLayer) }}></div>
                      <span className="text-xs text-gray-400">Large</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Regions</span>
                  <span className="text-lg font-bold text-white">{regions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Population</span>
                  <span className="text-lg font-bold text-[#00d4ff]">49.3M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Avg Growth</span>
                  <span className="text-lg font-bold text-green-400">+2.16%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden relative">
              {/* Map Controls */}
              <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
                <button className="p-2 bg-[#0d1428]/90 backdrop-blur-sm border border-[#00d4ff]/20 rounded-lg hover:bg-[#1a2332] transition-colors">
                  <ZoomIn className="text-[#00d4ff]" size={20} />
                </button>
                <button className="p-2 bg-[#0d1428]/90 backdrop-blur-sm border border-[#00d4ff]/20 rounded-lg hover:bg-[#1a2332] transition-colors">
                  <ZoomOut className="text-[#00d4ff]" size={20} />
                </button>
                <button className="p-2 bg-[#0d1428]/90 backdrop-blur-sm border border-[#00d4ff]/20 rounded-lg hover:bg-[#1a2332] transition-colors">
                  <Filter className="text-[#00d4ff]" size={20} />
                </button>
              </div>

              {/* Current Layer Badge */}
              <div className="absolute top-6 left-6 z-[1000]">
                <div className="px-4 py-2 bg-[#0d1428]/90 backdrop-blur-sm border border-[#00d4ff]/20 rounded-lg flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLayerColor(selectedLayer) }}
                  ></div>
                  <span className="text-white text-sm font-medium">{currentLayer?.label}</span>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="h-[700px]">
                {isMounted ? (
                  <MapContainer
                    key={mapKey}
                    center={bangladeshCenter}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%', background: '#0d1428' }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {filteredRegions.map((region, index) => (
                      <CircleMarker
                        key={index}
                        center={region.position}
                        radius={Math.log(parseFloat(region.value)) * 5}
                        pathOptions={{
                          fillColor: getLayerColor(selectedLayer),
                          fillOpacity: 0.4,
                          color: getLayerColor(selectedLayer),
                          weight: 2,
                          opacity: 0.8
                        }}
                        eventHandlers={{
                          click: () => setSelectedRegion(region)
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                          <div className="text-center">
                            <div className="font-bold">{region.name}</div>
                            <div className="text-xs">{region.value}</div>
                          </div>
                        </Tooltip>
                        <Popup>
                          <div className="bg-[#0d1428] text-white p-3 rounded-lg border border-[#00d4ff]/20 min-w-[200px]">
                            <div className="font-bold text-lg mb-2" style={{ color: getLayerColor(selectedLayer) }}>
                              {region.name}
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Population:</span>
                                <span className="text-white font-semibold">{region.value}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Growth:</span>
                                <span className="text-green-400 font-semibold">{region.growth}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">GDP:</span>
                                <span className="text-white font-semibold">{region.gdp}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Hospitals:</span>
                                <span className="text-white font-semibold">{region.hospitals}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Literacy:</span>
                                <span className="text-white font-semibold">{region.literacy}</span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-[#0d1428]">
                    <div className="text-[#00d4ff] text-lg">Loading Map...</div>
                  </div>
                )}
              </div>
            </div>

            {/* Region Cards - Below Map */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRegions.map((region, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRegion(region)}
                  className={`bg-[#1a2332] border rounded-lg p-4 text-left hover:bg-[#1f2937] transition-all ${
                    selectedRegion?.name === region.name
                      ? 'border-[#00d4ff] bg-[#00d4ff]/5'
                      : 'border-[#00d4ff]/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-base font-semibold text-white">{region.name}</div>
                    <MapPin size={16} className="text-[#00d4ff]" />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">Pop: {region.value}</div>
                  <div className="text-sm font-semibold text-green-400">{region.growth}</div>
                </button>
              ))}
            </div>
          </div>
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
    </div>
  )
}