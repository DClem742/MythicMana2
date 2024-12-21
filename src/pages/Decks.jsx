import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deckService } from '../services/deckService'
import DeckForm from '../components/DeckForm'

function Decks() {
  const [decks, setDecks] = useState([])
  const [showNewDeckForm, setShowNewDeckForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDecks()
  }, [])

  const loadDecks = async () => {
    try {
      const data = await deckService.getDecks()
      setDecks(data)
    } catch (error) {
      console.error('Failed to load decks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDeck = async (deckData) => {
    try {
      await deckService.createDeck(deckData)
      setShowNewDeckForm(false)
      loadDecks()
    } catch (error) {
      console.error('Failed to create deck:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Decks</h1>
        <button
          onClick={() => setShowNewDeckForm(!showNewDeckForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showNewDeckForm ? 'Cancel' : 'New Deck'}
        </button>
      </div>

      {showNewDeckForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Deck</h2>
          <DeckForm onSubmit={handleCreateDeck} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map(deck => (
          <Link
            key={deck.id}
            to={`/decks/${deck.id}`}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg">{deck.name}</h3>
            <p className="text-gray-600">{deck.format}</p>
            {deck.description && (
              <p className="text-gray-500 mt-2 text-sm">{deck.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Decks
