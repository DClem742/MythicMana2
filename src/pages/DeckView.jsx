import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { deckService } from '../services/deckService'
import CardSearch from '../components/CardSearch'
import DeckStats from '../components/DeckStats'
import DeckBuilder from '../components/DeckBuilder'

function DeckView() {
  const { id } = useParams()
  const [deck, setDeck] = useState(null)
  const [showAddCard, setShowAddCard] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDeck()
  }, [id])

  const loadDeck = async () => {
    try {
      const data = await deckService.getDeckById(id)
      setDeck(data)
    } catch (error) {
      console.error('Failed to load deck:', error)
    } finally {
      setLoading(false)
      }
      }
      <DeckBuilder 
        deckId={id} 
        deck={deck}
        onDeckUpdate={loadDeck} 
      />
  const handleAddCard = async (card) => {
    try {
      await deckService.addCardToDeck({
        deck_id: id,
        scryfall_id: card.id,
        quantity: 1,
        name: card.name,
        is_commander: deck.format === 'commander' && card.type_line.includes('Legendary Creature'),
        is_sideboard: false
      })
      
      // Fetch the updated deck data immediately
      await loadDeck()
    } catch (error) {
      console.error('Failed to add card:', error)
    }
  }

  const handleRemoveCard = async (cardId) => {
    try {
      await deckService.removeCardFromDeck(cardId)
      loadDeck()
    } catch (error) {
      console.error('Failed to remove card:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!deck) return <div>Deck not found</div>
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{deck.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeckBuilder 
            deckId={id} 
            deck={deck} 
            onDeckUpdate={loadDeck} 
          />
          <div className="mb-6">
            <div className="text-gray-600">
              Format: {deck.format}
            </div>
            {deck.description && (
              <p className="mt-2">{deck.description}</p>
            )}
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowAddCard(!showAddCard)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showAddCard ? 'Cancel' : 'Add Cards'}
            </button>
          </div>

          {showAddCard && (
            <div className="mb-6">
              <CardSearch onCardSelect={handleAddCard} />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold mb-4">Main Deck</h2>
            <div className="space-y-2">
              {deck.cards_in_deck
                .filter(card => !card.is_commander && !card.is_sideboard)
                .map(card => (
                  <div key={card.id} className="flex justify-between items-center p-2 bg-white rounded shadow">
                    <span>{card.quantity}x {card.name}</span>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {deck.format === 'commander' && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Commander</h2>
              {deck.cards_in_deck
                .filter(card => card.is_commander)
                .map(card => (
                  <div key={card.id} className="p-2 bg-white rounded shadow">
                    <span>{card.name}</span>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-4">Sideboard</h2>
            <div className="space-y-2">
              {deck.cards_in_deck
                .filter(card => card.is_sideboard)
                .map(card => (
                  <div key={card.id} className="flex justify-between items-center p-2 bg-white rounded shadow">
                    <span>{card.quantity}x {card.name}</span>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        <div>
          <DeckStats cards={deck.cards_in_deck} />
        </div>
      </div>
    </div>
  )
}

export default DeckView
 