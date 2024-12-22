import { useState } from 'react'

function BulkAddCards({ onSubmit }) {  // Changed from onAddCards to onSubmit
  const [cardList, setCardList] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cards = cardList
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
    
    await onSubmit(cards)
    setCardList('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={cardList}
        onChange={(e) => setCardList(e.target.value)}
        placeholder="Enter cards (one per line)"
        className="w-full h-32 p-2 border rounded"
      />
      <button 
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Cards
      </button>
    </form>
  )
}

export default BulkAddCards