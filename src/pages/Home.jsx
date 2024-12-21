function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to Mythic Mana</h1>
      <div className="prose lg:prose-xl">
        <p className="text-xl mb-4">
          Your digital companion for managing Magic: The Gathering decks and collections.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Deck Building</h2>
            <p>Create, manage, and analyze your decks with powerful tools and statistics.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Collection Tracking</h2>
            <p>Keep track of your cards and manage your growing collection efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
