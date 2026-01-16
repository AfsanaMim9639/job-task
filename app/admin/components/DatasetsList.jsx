// app/admin/components/DatasetsList.jsx
'use client'

import { useState } from 'react'
import { Edit, Trash2, Eye, MoreVertical, X, Save } from 'lucide-react'

export default function DatasetsList({ datasets, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)

  const startEdit = (dataset) => {
    setEditingId(dataset.id)
    setEditForm({
      title: dataset.title,
      category: dataset.category,
      source: dataset.source,
      status: dataset.status
    })
  }

  const handleSave = (id) => {
    onUpdate(id, editForm)
    setEditingId(null)
  }

  const handleDelete = (id) => {
    onDelete(id)
    setShowDeleteModal(null)
  }

  return (
    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#00d4ff]/10">
        <h2 className="text-xl font-bold text-white">Datasets Management</h2>
        <p className="text-gray-400 text-sm">View, edit, and manage all datasets</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0d1428] border-b border-[#00d4ff]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase">Source</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#00d4ff] uppercase">Uploaded</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#00d4ff] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="border-b border-[#00d4ff]/5 hover:bg-[#0d1428]/50 transition-colors">
                {editingId === dataset.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1428] border border-[#00d4ff]/20 rounded text-white text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1428] border border-[#00d4ff]/20 rounded text-white text-sm"
                      >
                        <option value="demographics">Demographics</option>
                        <option value="economy">Economy</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.source}
                        onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1428] border border-[#00d4ff]/20 rounded text-white text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1428] border border-[#00d4ff]/20 rounded text-white text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {new Date(dataset.uploadedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleSave(dataset.id)}
                          className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium text-sm">{dataset.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full">
                        {dataset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">{dataset.source}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dataset.status === 'active' ? 'bg-green-500/10 text-green-400' :
                        dataset.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-gray-500/10 text-gray-400'
                      }`}>
                        {dataset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {new Date(dataset.uploadedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => startEdit(dataset)}
                          className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(dataset.id)}
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2332] border border-red-500/20 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this dataset? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-[#0d1428] border border-[#00d4ff]/20 text-white rounded-lg hover:bg-[#1f2937] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}