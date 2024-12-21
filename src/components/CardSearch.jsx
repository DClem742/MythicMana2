import { useState } from 'react'
import { searchCards } from '../services/scryfall'

function CardSearch({ onCardSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await searchCards(query)
      setResults(data.data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Search for cards..."
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map(card => (
            <div 
              key={card.id}
              className="border rounded p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => onCardSelect(card)}
            >
              <img src={card.image_uris?.small} alt={card.name} className="w-full" />
              <p className="mt-2 font-semibold">{card.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CardSearch
