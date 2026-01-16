'use client'

import { MapPin, Layers } from 'lucide-react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false })

export default function MapPreview() {
  const [selectedLayer, setSelectedLayer] = useState('population')
  const [isMounted, setIsMounted] = useState(false)
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    setIsMounted(true)
    setMapKey(prev => prev + 1)
    // Import Leaflet CSS
    import('leaflet/dist/leaflet.css')
  }, [])

  const layers = [
    { id: 'population', label: 'Population Density', color: '#00d4ff' },
    { id: 'economy', label: 'Economic Activity', color: '#10b981' },
    { id: 'infrastructure', label: 'Infrastructure', color: '#f59e0b' },
    { id: 'healthcare', label: 'Healthcare Facilities', color: '#ef4444' }
  ]

  const regions = [
    { name: 'Dhaka', value: '21.7M', growth: '+3.2%', position: [23.8103, 90.4125], radius: 80000 },
    { name: 'Chittagong', value: '8.9M', growth: '+2.8%', position: [22.3569, 91.7832], radius: 50000 },
    { name: 'Khulna', value: '4.4M', growth: '+1.9%', position: [22.8456, 89.5403], radius: 35000 },
    { name: 'Rajshahi', value: '3.8M', growth: '+1.5%', position: [24.3745, 88.6042], radius: 32000 },
    { name: 'Sylhet', value: '3.2M', growth: '+2.1%', position: [24.8949, 91.8687], radius: 30000 },
    { name: 'Rangpur', value: '2.9M', growth: '+1.8%', position: [25.7439, 89.2752], radius: 28000 },
    { name: 'Barisal', value: '2.3M', growth: '+1.4%', position: [22.7010, 90.3535], radius: 25000 },
    { name: 'Mymensingh', value: '2.1M', growth: '+1.6%', position: [24.7471, 90.4203], radius: 24000 }
  ]

  // Bangladesh center coordinates
  const bangladeshCenter = [23.685, 90.3563]

  const getLayerColor = (layerId) => {
    return layers.find(l => l.id === layerId)?.color || '#00d4ff'
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0d1428] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Geographic <span className="gradient-text">Visualization</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore data patterns across Bangladesh's regions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Map Container - Full Width */}
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden relative">
            {/* Leaflet Map */}
            <div className="h-[500px] md:h-[600px]">
              {isMounted ? (
                <MapContainer
                  key={mapKey}
                  center={bangladeshCenter}
                  zoom={7}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%', background: '#0d1428' }}
                  className="z-0"
                >
                  {/* Dark theme tile layer */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />

                  {/* Region Circle Markers */}
                  {regions.map((region, index) => (
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
                    >
                      <Popup>
                        <div className="bg-[#0d1428] text-white p-2 rounded-lg border border-[#00d4ff]/20">
                          <div className="font-bold text-base mb-1" style={{ color: getLayerColor(selectedLayer) }}>
                            {region.name}
                          </div>
                          <div className="text-sm text-gray-300">Population: {region.value}</div>
                          <div className="text-sm text-green-400">Growth: {region.growth}</div>
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

            {/* Mobile Region List */}
            <div className="p-6 md:hidden grid grid-cols-2 gap-3 bg-[#1a2332] border-t border-[#00d4ff]/10">
              {regions.map((region, index) => (
                <div key={index} className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-3">
                  <div className="text-sm font-semibold text-white">{region.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{region.value}</div>
                  <div className="text-xs font-semibold text-green-400 mt-1">{region.growth}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer Controls & Stats - Below Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Layer Selector */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="text-[#00d4ff]" size={20} />
                <h3 className="font-semibold text-white">Map Layers</h3>
              </div>
              
              <div className="space-y-3">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedLayer === layer.id
                        ? 'bg-[#00d4ff]/10 border-2 border-[#00d4ff]'
                        : 'bg-[#0d1428] border border-[#00d4ff]/10 hover:bg-[#1a2332]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: layer.color }}
                      ></div>
                      <span className="text-sm font-medium text-white">
                        {layer.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Stats */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-[#00d4ff]" size={20} />
                <h3 className="font-semibold text-white">Top Regions</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {regions.map((region, index) => (
                  <div key={index} className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-3">
                    <div className="text-sm font-medium text-white truncate">{region.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{region.value}</div>
                    <div className="text-xs font-semibold text-green-400 mt-1">{region.growth}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/map">
              <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform mx-auto block">
                Explore Full Map
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}