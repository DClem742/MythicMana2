import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Decks from './pages/Decks'
import Collection from './pages/Collection'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import DeckView from './pages/DeckView'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/decks/:id" element={<DeckView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
