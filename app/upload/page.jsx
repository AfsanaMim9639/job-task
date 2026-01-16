'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  Database,
  FileText,
  Table,
  Download,
  Shield,
  Loader2
} from 'lucide-react'

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border ${
        type === 'success' 
          ? 'bg-green-500/10 border-green-500/20 text-green-400' 
          : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}>
        {type === 'success' ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-4">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default function UploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [uploadedDatasets, setUploadedDatasets] = useState([])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'demographics',
    source: '',
    tags: ''
  })

  // Load datasets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('uploadedDatasets')
    if (stored) {
      setUploadedDatasets(JSON.parse(stored))
    }
  }, [])

  // Check if user is admin
  const isAdmin = session?.user?.role === 'admin'

  // Redirect if not admin
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] flex items-center justify-center">
        <Loader2 className="text-[#00d4ff] animate-spin" size={48} />
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[#1a2332] border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-red-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You need administrator privileges to access this page.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const categories = [
    { value: 'demographics', label: 'Demographics' },
    { value: 'economy', label: 'Economy' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'environment', label: 'Environment' },
    { value: 'social', label: 'Social' }
  ]

  const acceptedFormats = [
    { ext: 'CSV', icon: Table, color: '#10b981' },
    { ext: 'JSON', icon: FileText, color: '#f59e0b' },
    { ext: 'XLSX', icon: Database, color: '#3b82f6' }
  ]

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload CSV, JSON, or XLSX files only.')
        showToast('Invalid file type', 'error')
        return
      }
      
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB limit.')
        showToast('File too large (max 50MB)', 'error')
        return
      }
      
      setSelectedFile(file)
      setError(null)
      showToast('File selected successfully', 'success')
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError('Please select a file to upload')
      showToast('Please select a file', 'error')
      return
    }

    if (!formData.title || !formData.description || !formData.source) {
      setError('Please fill in all required fields')
      showToast('Please fill in all required fields', 'error')
      return
    }

    setUploading(true)
    setError(null)

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create dataset object
    const newDataset = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      source: formData.source,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      uploadedBy: session.user.name,
      uploadedAt: new Date().toISOString(),
      status: 'active'
    }

    // Save to localStorage
    const updatedDatasets = [...uploadedDatasets, newDataset]
    localStorage.setItem('uploadedDatasets', JSON.stringify(updatedDatasets))
    setUploadedDatasets(updatedDatasets)

    setUploading(false)
    setUploadSuccess(true)
    showToast('Dataset uploaded successfully!', 'success')

    // Reset form after 3 seconds
    setTimeout(() => {
      setUploadSuccess(false)
      setSelectedFile(null)
      setFormData({
        title: '',
        description: '',
        category: 'demographics',
        source: '',
        tags: ''
      })
    }, 3000)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
    showToast('File removed', 'success')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center">
            <Upload className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Upload <span className="gradient-text">Dataset</span>
            </h1>
            <p className="text-gray-400 text-sm">Add new data to the platform</p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <Shield className="text-red-400" size={16} />
            <span className="text-red-400 text-sm font-medium">Admin Access Only</span>
          </div>
          <div className="text-sm text-gray-400">
            Total Uploads: <span className="text-[#00d4ff] font-bold">{uploadedDatasets.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {uploadSuccess ? (
          // Success Message
          <div className="bg-[#1a2332] border border-green-500/20 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-400" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Upload Successful!</h2>
            <p className="text-gray-400 mb-6">
              Your dataset has been uploaded and saved. It's now available in the system.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setUploadSuccess(false)}
                className="px-6 py-3 bg-[#1a2332] border border-[#00d4ff]/20 text-white rounded-lg font-semibold hover:bg-[#1f2937] transition-colors"
              >
                Upload Another
              </button>
              <button
                onClick={() => router.push('/datasets')}
                className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                View All Datasets
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Dataset Information</h2>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Dataset Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="e.g., National Population Census 2024"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                    placeholder="Provide a detailed description of the dataset..."
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Source */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Data Source *
                  </label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="e.g., Bangladesh Bureau of Statistics"
                  />
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Tags (Optional)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="e.g., population, census, demographics (comma separated)"
                  />
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Upload File *
                  </label>
                  
                  {!selectedFile ? (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-[#00d4ff]/30 rounded-lg p-8 text-center hover:border-[#00d4ff]/50 transition-colors">
                        <Upload className="text-[#00d4ff] mx-auto mb-4" size={48} />
                        <p className="text-white font-medium mb-2">Click to upload or drag and drop</p>
                        <p className="text-gray-400 text-sm">CSV, JSON, or XLSX (Max 50MB)</p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".csv,.json,.xlsx,.xls"
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                          <File className="text-[#00d4ff]" size={20} />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{selectedFile.name}</p>
                          <p className="text-gray-400 text-xs">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <X className="text-red-400" size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      Upload Dataset
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Accepted Formats */}
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Accepted Formats</h3>
                <div className="space-y-3">
                  {acceptedFormats.map((format) => {
                    const Icon = format.icon
                    return (
                      <div key={format.ext} className="flex items-center gap-3 p-3 bg-[#0d1428] rounded-lg">
                        <Icon size={20} style={{ color: format.color }} />
                        <span className="text-white font-medium">{format.ext}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Upload Guidelines</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#00d4ff] flex-shrink-0 mt-0.5" size={16} />
                    <span>Ensure data is clean and properly formatted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#00d4ff] flex-shrink-0 mt-0.5" size={16} />
                    <span>Include clear column headers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#00d4ff] flex-shrink-0 mt-0.5" size={16} />
                    <span>Remove any sensitive information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#00d4ff] flex-shrink-0 mt-0.5" size={16} />
                    <span>Verify data accuracy before uploading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#00d4ff] flex-shrink-0 mt-0.5" size={16} />
                    <span>Maximum file size: 50MB</span>
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div className="bg-gradient-to-br from-[#00d4ff]/10 to-[#0066ff]/10 border border-[#00d4ff]/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Check our documentation for detailed guidelines on data formatting and uploading.
                </p>
                <button className="w-full px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 text-[#00d4ff] rounded-lg text-sm font-medium hover:bg-[#00d4ff]/10 transition-colors flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}