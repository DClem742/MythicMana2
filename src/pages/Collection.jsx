import { useState, useEffect } from 'react'
import { collectionService } from '../services/collectionService'
import CardSearch from '../components/CardSearch'

function Collection() {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddCard, setShowAddCard] = useState(false)

  useEffect(() => {
    loadCollection()
  }, [])

  const loadCollection = async () => {
    try {
      const data = await collectionService.getCollection()
      setCollection(data)
    } catch (error) {
      console.error('Failed to load collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCard = async (card) => {
    try {
      await collectionService.addCard({
        scryfall_id: card.id,
        quantity: 1,
        foil: false,
        condition: 'NM'
      })
      loadCollection()
      setShowAddCard(false)
    } catch (error) {
      console.error('Failed to add card:', error)
    }
  }

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await collectionService.updateCard(id, { quantity: newQuantity })
      loadCollection()
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const handleRemoveCard = async (id) => {
    try {
      await collectionService.removeCard(id)
      loadCollection()
    } catch (error) {
      console.error('Failed to remove card:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Collection</h1>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showAddCard ? 'Cancel' : 'Add Cards'}
        </button>
      </div>

      {showAddCard && (
        <CardSearch onCardSelect={handleAddCard} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collection.map(item => (
          <div key={item.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  {item.foil ? 'Foil' : 'Normal'} - {item.condition}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                  className="w-16 p-1 border rounded"
                  min="1"
                />
                <button
                  onClick={() => handleRemoveCard(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collection
