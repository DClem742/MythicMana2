import { useState } from 'react'

function DeckForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '')
  const [format, setFormat] = useState(initialData.format || '')
  const [description, setDescription] = useState(initialData.description || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, format, description })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Deck Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Format</option>
          <option value="commander">Commander</option>
          <option value="standard">Standard</option>
          <option value="modern">Modern</option>
          <option value="pioneer">Pioneer</option>
          <option value="pauper">Pauper</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Deck
      </button>
    </form>
  )
}

export default DeckForm
