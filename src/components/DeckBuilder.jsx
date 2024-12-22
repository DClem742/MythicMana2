import CardSearch from './CardSearch'
import BulkAddCards from './BulkAddCards'
import { deckService } from '../services/deckService'

function DeckBuilder({ deckId, deck, onDeckUpdate }) {
  const handleAddCard = async (cardInput) => {
    try {
      let quantity = 1
      let cardName = cardInput

      // Parse quantity if input is a string (from bulk add)
      if (typeof cardInput === 'string') {
        const match = cardInput.match(/^(\d+)\s+(.+)$/)
        if (match) {
          quantity = parseInt(match[1])
          cardName = match[2]
        }
      }

      // Fetch card data from Scryfall
      const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`)
      const card = await response.json()

      await deckService.addCardToDeck({
        deck_id: deckId,
        scryfall_id: card.id,
        quantity: quantity,
        name: card.name,
        is_commander: deck?.format === 'commander' && card?.type_line?.includes('Legendary Creature') || false,
        is_sideboard: false
      })
      
      if (typeof onDeckUpdate === 'function') {
        onDeckUpdate()
      }
    } catch (error) {
      console.error('Failed to add card:', error)
    }
  }

  const handleBulkAdd = async (cardList) => {
    try {
      for (const cardName of cardList) {
        await handleAddCard(cardName)
      }
      if (typeof onDeckUpdate === 'function') {
        onDeckUpdate()
      }
    } catch (error) {
      console.error('Bulk add error:', error)
    }
  }

  return (
    <div>
      <BulkAddCards onSubmit={handleBulkAdd} />
      <CardSearch onCardSelect={handleAddCard} />
    </div>
  )
}
export default DeckBuilder