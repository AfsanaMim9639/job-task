import { useState } from 'react'
import { X, Download, FileSpreadsheet, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

export function DatasetPreviewModal({ dataset, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDownloading, setIsDownloading] = useState(false)
  const rowsPerPage = 10

  if (!isOpen || !dataset) return null

  // Generate sample data based on dataset category
  const generateSampleData = () => {
    const samples = {
      demographics: [
        { id: 1, district: 'Dhaka', population: 12043977, malePopulation: 6221789, femalePopulation: 5822188, households: 2890456 },
        { id: 2, district: 'Chittagong', population: 8230020, malePopulation: 4256891, femalePopulation: 3973129, households: 1978340 },
        { id: 3, district: 'Rajshahi', population: 2595197, malePopulation: 1342567, femalePopulation: 1252630, households: 623456 },
        { id: 4, district: 'Khulna', population: 2378971, malePopulation: 1234890, femalePopulation: 1144081, households: 567234 },
        { id: 5, district: 'Sylhet', population: 3847847, malePopulation: 1989234, femalePopulation: 1858613, households: 892345 },
      ],
      economy: [
        { quarter: 'Q1 2025', gdpGrowth: 6.8, inflation: 5.2, exports: 12340, imports: 18920, tradeBalance: -6580 },
        { quarter: 'Q4 2024', gdpGrowth: 6.5, inflation: 5.8, exports: 11890, imports: 17450, tradeBalance: -5560 },
        { quarter: 'Q3 2024', gdpGrowth: 6.3, inflation: 6.1, exports: 11230, imports: 16780, tradeBalance: -5550 },
        { quarter: 'Q2 2024', gdpGrowth: 6.1, inflation: 6.4, exports: 10890, imports: 16230, tradeBalance: -5340 },
        { quarter: 'Q1 2024', gdpGrowth: 5.9, inflation: 6.8, exports: 10234, imports: 15890, tradeBalance: -5656 },
      ],
      healthcare: [
        { facility: 'Dhaka Medical College Hospital', type: 'Government', beds: 2600, doctors: 450, location: 'Dhaka', services: 'Full Service' },
        { facility: 'Chittagong Medical College', type: 'Government', beds: 1350, doctors: 280, location: 'Chittagong', services: 'Full Service' },
        { facility: 'Square Hospital', type: 'Private', beds: 650, doctors: 320, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Apollo Hospital Dhaka', type: 'Private', beds: 450, doctors: 180, location: 'Dhaka', services: 'Specialized' },
        { facility: 'Rajshahi Medical College', type: 'Government', beds: 1050, doctors: 210, location: 'Rajshahi', services: 'Full Service' },
      ],
      education: [
        { institution: 'Dhaka University', type: 'University', students: 37018, faculty: 1992, established: 1921, location: 'Dhaka' },
        { institution: 'Notre Dame College', type: 'College', students: 8500, faculty: 180, established: 1949, location: 'Dhaka' },
        { institution: 'Viqarunnisa Noon School', type: 'School', students: 12000, faculty: 320, established: 1952, location: 'Dhaka' },
        { institution: 'Chittagong University', type: 'University', students: 24912, faculty: 1108, established: 1966, location: 'Chittagong' },
        { institution: 'BUET', type: 'University', students: 10000, faculty: 580, established: 1962, location: 'Dhaka' },
      ],
      infrastructure: [
        { route: 'Dhaka-Chittagong Highway', length: 243, type: 'National', condition: 'Good', traffic: 'High', lanes: 4 },
        { route: 'Dhaka-Sylhet Highway', length: 208, type: 'National', condition: 'Fair', traffic: 'Medium', lanes: 2 },
        { route: 'Padma Bridge', length: 6.15, type: 'Bridge', condition: 'Excellent', traffic: 'High', lanes: 4 },
        { route: 'Dhaka Metro Rail', length: 21.26, type: 'Metro', condition: 'Excellent', traffic: 'High', lanes: 2 },
        { route: 'Dhaka-Aricha Highway', length: 72, type: 'National', condition: 'Good', traffic: 'High', lanes: 4 },
      ],
      environment: [
        { location: 'Dhaka', year: 2024, avgTemp: 26.8, rainfall: 2076, aqi: 168, co2: 456, humidity: 76 },
        { location: 'Chittagong', year: 2024, avgTemp: 27.2, rainfall: 2540, aqi: 142, co2: 389, humidity: 78 },
        { location: 'Sylhet', year: 2024, avgTemp: 25.4, rainfall: 4162, aqi: 98, co2: 234, humidity: 82 },
        { location: 'Rajshahi', year: 2024, avgTemp: 26.1, rainfall: 1448, aqi: 156, co2: 378, humidity: 71 },
        { location: 'Khulna', year: 2024, avgTemp: 26.9, rainfall: 1809, aqi: 134, co2: 345, humidity: 77 },
      ]
    }

    return samples[dataset.category] || samples.demographics
  }

  const sampleData = generateSampleData()
  const totalPages = Math.ceil(sampleData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = sampleData.slice(startIndex, endIndex)

  const columns = Object.keys(sampleData[0] || {})

  // Convert data to CSV and download
  const handleDownload = () => {
    setIsDownloading(true)
    
    try {
      // Create CSV header
      const header = columns.join(',')
      
      // Create CSV rows
      const rows = sampleData.map(row => 
        columns.map(col => {
          const value = row[col]
          // Handle values with commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        }).join(',')
      )
      
      // Combine header and rows
      const csv = [header, ...rows].join('\n')
      
      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      // Generate filename from dataset title
      const filename = `${dataset.title.toLowerCase().replace(/\s+/g, '_')}.csv`
      
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Cleanup
      URL.revokeObjectURL(url)
      
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      console.error('Download error:', error)
      setIsDownloading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#00d4ff]/10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">{dataset.title}</h2>
            </div>
            <p className="text-gray-400 text-sm">{dataset.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span>Source: {dataset.sourceName}</span>
              <span>•</span>
              <span>Records: {dataset.records}</span>
              <span>•</span>
              <span>Format: {dataset.format}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors ml-4"
          >
            <X size={24} />
          </button>
        </div>

        {/* Data Preview */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0d1428]">
                    {columns.map((column) => (
                      <th
                        key={column}
                        className="px-4 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase tracking-wider border-b border-[#00d4ff]/10"
                      >
                        {column.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#00d4ff]/5 hover:bg-[#0d1428]/50 transition-colors"
                    >
                      {columns.map((column) => (
                        <td
                          key={column}
                          className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap"
                        >
                          {typeof row[column] === 'number' 
                            ? row[column].toLocaleString()
                            : row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, sampleData.length)} of {sampleData.length} records
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0d1428] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0d1428] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-[#00d4ff]/10 bg-[#1a2332]/50">
          <div className="text-sm text-gray-400">
            <Eye className="inline mr-2" size={16} />
            Preview shows sample data. Download for complete dataset.
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#0d1428] border border-[#00d4ff]/20 text-white rounded-lg hover:bg-[#1a2332] transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className={isDownloading ? 'animate-bounce' : ''} />
              {isDownloading ? 'Downloading...' : 'Download CSV'}
            </button>
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