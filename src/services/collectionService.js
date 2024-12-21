import { supabase } from './supabase'

export const collectionService = {
  async getCollection() {
    const { data, error } = await supabase
      .from('cards_in_collection')
      .select('*')
    if (error) throw error
    return data
  },

  async addCard({ scryfall_id, quantity, foil, condition }) {
    const { data, error } = await supabase
      .from('cards_in_collection')
      .upsert({
        scryfall_id,
        quantity,
        foil,
        condition,
        user_id: (await supabase.auth.getUser()).data.user.id
      })
    if (error) throw error
    return data
  },

  async updateCard(id, updates) {
    const { data, error } = await supabase
      .from('cards_in_collection')
      .update(updates)
      .match({ id })
    if (error) throw error
    return data
  },

  async removeCard(id) {
    const { error } = await supabase
      .from('cards_in_collection')
      .delete()
      .match({ id })
    if (error) throw error
  }
}
