import { supabase } from './supabase'

export const deckService = {
  async getDecks() {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
    if (error) throw error
    return data
  },

  async getDeckById(deckId) {
    const { data, error } = await supabase
      .from('decks')
      .select(`
        *,
        cards_in_deck (*)
      `)
      .eq('id', deckId)
      .single()
    if (error) throw error
    return data
  },

  async createDeck({ name, format, description }) {
    const { data, error } = await supabase
      .from('decks')
      .insert({
        name,
        format,
        description,
        user_id: (await supabase.auth.getUser()).data.user.id
      })
    if (error) throw error
    return data
  },

  async addCardToDeck({ deck_id, scryfall_id, quantity, is_commander, is_sideboard }) {
    const { data, error } = await supabase
      .from('cards_in_deck')
      .upsert({
        deck_id,
        scryfall_id,
        quantity,
        is_commander,
        is_sideboard
      })
    if (error) throw error
    return data
  },

  async removeCardFromDeck(id) {
    const { error } = await supabase
      .from('cards_in_deck')
      .delete()
      .match({ id })
    if (error) throw error
  }
}
