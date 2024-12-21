import axios from 'axios'

const SCRYFALL_API = 'https://api.scryfall.com'

export const searchCards = async (query) => {
  try {
    const response = await axios.get(`${SCRYFALL_API}/cards/search?q=${query}`)
    return response.data
  } catch (error) {
    console.error('Error searching cards:', error)
    throw error
  }
}

export const getCardById = async (id) => {
  try {
    const response = await axios.get(`${SCRYFALL_API}/cards/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching card:', error)
    throw error
  }
}
