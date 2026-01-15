'use client'

import { useState } from 'react'
import { 
  Code, 
  Key, 
  Database,
  Zap,
  Shield,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Terminal,
  Globe,
  Lock,
  Search
} from 'lucide-react'

export default function APIDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState('GET')
  const [expandedSection, setExpandedSection] = useState('getting-started')

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(id)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const features = [
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'High-performance API with 99.9% uptime guarantee'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Industry-standard authentication and encryption'
    },
    {
      icon: Database,
      title: 'Comprehensive',
      description: 'Access to 1000+ datasets with rich metadata'
    },
    {
      icon: Globe,
      title: 'RESTful',
      description: 'Standard REST API following best practices'
    }
  ]

  const endpoints = [
    {
      id: 'list-datasets',
      method: 'GET',
      path: '/api/v1/datasets',
      description: 'Get a list of all available datasets',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number for pagination' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of results per page (max 100)' },
        { name: 'category', type: 'string', required: false, description: 'Filter by category' },
        { name: 'search', type: 'string', required: false, description: 'Search query' }
      ],
      response: `{
  "data": [
    {
      "id": "ds_001",
      "title": "National Population Census 2024",
      "category": "demographics",
      "format": ["csv", "json"],
      "size": "2.4 GB",
      "records": 45000000,
      "updated_at": "2025-01-13"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000
  }
}`,
      curl: `curl -X GET "https://api.dataplatform.bd/v1/datasets?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      id: 'get-dataset',
      method: 'GET',
      path: '/api/v1/datasets/{id}',
      description: 'Get details of a specific dataset',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Dataset ID' }
      ],
      response: `{
  "id": "ds_001",
  "title": "National Population Census 2024",
  "description": "Comprehensive demographic data...",
  "category": "demographics",
  "source": "Bangladesh Bureau of Statistics",
  "format": ["csv", "json", "excel"],
  "size": "2.4 GB",
  "records": 45000000,
  "columns": ["district", "population", "male", "female"],
  "updated_at": "2025-01-13",
  "download_url": "https://api.dataplatform.bd/v1/datasets/ds_001/download"
}`,
      curl: `curl -X GET "https://api.dataplatform.bd/v1/datasets/ds_001" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      id: 'download-dataset',
      method: 'GET',
      path: '/api/v1/datasets/{id}/download',
      description: 'Download a dataset in specified format',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Dataset ID' },
        { name: 'format', type: 'string', required: false, description: 'File format (csv, json, excel)' }
      ],
      response: `# Returns file stream with appropriate content-type header`,
      curl: `curl -X GET "https://api.dataplatform.bd/v1/datasets/ds_001/download?format=csv" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o dataset.csv`
    },
    {
      id: 'query-data',
      method: 'POST',
      path: '/api/v1/datasets/{id}/query',
      description: 'Query dataset with filters',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Dataset ID' },
        { name: 'filters', type: 'object', required: false, description: 'Query filters' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of results' }
      ],
      response: `{
  "data": [
    {
      "district": "Dhaka",
      "population": 21700000,
      "male": 11200000,
      "female": 10500000
    }
  ],
  "count": 1
}`,
      curl: `curl -X POST "https://api.dataplatform.bd/v1/datasets/ds_001/query" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filters": {
      "district": "Dhaka"
    },
    "limit": 10
  }'`
    },
    {
      id: 'categories',
      method: 'GET',
      path: '/api/v1/categories',
      description: 'Get all available categories',
      parameters: [],
      response: `{
  "categories": [
    {
      "id": "demographics",
      "name": "Demographics",
      "count": 245
    },
    {
      "id": "economy",
      "name": "Economy",
      "count": 189
    }
  ]
}`,
      curl: `curl -X GET "https://api.dataplatform.bd/v1/categories" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ]

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
    { id: 'authentication', title: 'Authentication', icon: Key },
    { id: 'endpoints', title: 'API Endpoints', icon: Terminal },
    { id: 'rate-limits', title: 'Rate Limits', icon: Shield },
    { id: 'errors', title: 'Error Codes', icon: Code }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2332] border border-[#00d4ff]/20 rounded-full mb-6">
            <Code className="text-[#00d4ff]" size={20} />
            <span className="text-white text-sm font-medium">API Version 1.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            API <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Integrate Bangladesh's comprehensive data into your applications with our powerful REST API
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 text-center hover:border-[#00d4ff]/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Start */}
        <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
          <p className="text-gray-400 mb-6">Get started with the API in three simple steps:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Get API Key</h3>
              <p className="text-gray-400 text-sm">Sign up for a free account and generate your API key from the dashboard</p>
            </div>
            <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Make Request</h3>
              <p className="text-gray-400 text-sm">Use your API key to authenticate and make your first API call</p>
            </div>
            <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Process Data</h3>
              <p className="text-gray-400 text-sm">Parse the JSON response and integrate the data into your application</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Documentation */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setExpandedSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        expandedSection === section.id
                          ? 'bg-[#00d4ff]/10 border border-[#00d4ff] text-[#00d4ff]'
                          : 'text-gray-400 hover:text-white hover:bg-[#0d1428]'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            {expandedSection === 'getting-started' && (
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
                <div className="space-y-6 text-gray-400">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Base URL</h3>
                    <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4 font-mono text-sm text-[#00d4ff]">
                      https://api.dataplatform.bd/v1
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Response Format</h3>
                    <p>All responses are returned in JSON format with the following structure:</p>
                    <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4 mt-3">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "data": { ... },
  "meta": { ... }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">HTTP Methods</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded">GET</span>
                        <span>Retrieve data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded">POST</span>
                        <span>Create or query data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-mono rounded">PUT</span>
                        <span>Update data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-mono rounded">DELETE</span>
                        <span>Delete data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Authentication */}
            {expandedSection === 'authentication' && (
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Authentication</h2>
                <div className="space-y-6 text-gray-400">
                  <p>All API requests require authentication using an API key. Include your API key in the Authorization header:</p>
                  
                  <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
                    </pre>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-1">Security Note</h4>
                        <p className="text-gray-400 text-sm">Keep your API key secure. Never expose it in client-side code or public repositories.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Getting Your API Key</h3>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>Create an account on our platform</li>
                      <li>Navigate to the API section in your dashboard</li>
                      <li>Click "Generate API Key"</li>
                      <li>Copy and securely store your key</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Endpoints */}
            {expandedSection === 'endpoints' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">API Endpoints</h2>
                
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                    {/* Endpoint Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-lg font-mono text-sm font-bold ${
                        endpoint.method === 'GET' ? 'bg-green-500/10 text-green-400' :
                        endpoint.method === 'POST' ? 'bg-blue-500/10 text-blue-400' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-[#00d4ff] font-mono text-sm">{endpoint.path}</code>
                    </div>
                    
                    <p className="text-gray-400 mb-6">{endpoint.description}</p>

                    {/* Parameters */}
                    {endpoint.parameters.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Parameters</h4>
                        <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-[#00d4ff]/5">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#00d4ff]">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#00d4ff]">Type</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#00d4ff]">Required</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#00d4ff]">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param, idx) => (
                                <tr key={idx} className="border-t border-[#00d4ff]/10">
                                  <td className="px-4 py-3 text-sm font-mono text-white">{param.name}</td>
                                  <td className="px-4 py-3 text-sm text-gray-400">{param.type}</td>
                                  <td className="px-4 py-3 text-sm">
                                    {param.required ? (
                                      <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded">Required</span>
                                    ) : (
                                      <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded">Optional</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-400">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Example Request */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">Example Request</h4>
                        <button
                          onClick={() => copyToClipboard(endpoint.curl, endpoint.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-[#00d4ff] text-sm hover:bg-[#00d4ff]/10 transition-colors"
                        >
                          {copiedEndpoint === endpoint.id ? (
                            <>
                              <Check size={14} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          {endpoint.curl}
                        </pre>
                      </div>
                    </div>

                    {/* Example Response */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Example Response</h4>
                      <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          {endpoint.response}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rate Limits */}
            {expandedSection === 'rate-limits' && (
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Rate Limits</h2>
                <div className="space-y-6 text-gray-400">
                  <p>To ensure fair usage and maintain service quality, we enforce the following rate limits:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">Free Tier</h4>
                      <div className="text-3xl font-bold text-[#00d4ff] mb-2">1,000</div>
                      <p className="text-sm">requests per day</p>
                    </div>
                    <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">Pro Tier</h4>
                      <div className="text-3xl font-bold text-[#00d4ff] mb-2">10,000</div>
                      <p className="text-sm">requests per day</p>
                    </div>
                    <div className="bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">Enterprise</h4>
                      <div className="text-3xl font-bold text-[#00d4ff] mb-2">Custom</div>
                      <p className="text-sm">unlimited requests</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Rate Limit Headers</h3>
                    <p className="mb-3">Every API response includes headers with your current rate limit status:</p>
                    <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4">
                      <pre className="text-sm text-gray-300">
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642345678`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Codes */}
            {expandedSection === 'errors' && (
              <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Error Codes</h2>
                <div className="space-y-6 text-gray-400">
                  <p>The API uses standard HTTP status codes. Error responses include additional details:</p>
                  
                  <div className="bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg p-4 mb-6">
                    <pre className="text-sm text-gray-300">
{`{
  "success": false,
  "error": {
    "code": "invalid_parameter",
    "message": "The 'limit' parameter must be between 1 and 100",
    "details": { ... }
  }
}`}
                    </pre>
                  </div>

                  <div className="space-y-4">
                    {[
                      { code: '200', title: 'OK', description: 'The request was successful' },
                      { code: '400', title: 'Bad Request', description: 'Invalid request parameters' },
                      { code: '401', title: 'Unauthorized', description: 'Invalid or missing API key' },
                      { code: '403', title: 'Forbidden', description: 'API key does not have required permissions' },
                      { code: '404', title: 'Not Found', description: 'Resource not found' },
                      { code: '429', title: 'Too Many Requests', description: 'Rate limit exceeded' },
                      { code: '500', title: 'Internal Server Error', description: 'Something went wrong on our end' }
                    ].map((error, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-[#0d1428] border border-[#00d4ff]/10 rounded-lg">
                        <span className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] font-mono text-sm rounded flex-shrink-0">
                          {error.code}
                        </span>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{error.title}</h4>
                          <p className="text-sm">{error.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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