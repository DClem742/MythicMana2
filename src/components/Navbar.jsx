import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">
            Mythic Mana
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            {user && (
              <>
                <Link to="/decks" className="hover:text-blue-200">Decks</Link>
                <Link to="/collection" className="hover:text-blue-200">Collection</Link>
              </>
            )}
            {user ? (
              <button
                onClick={() => signOut()}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth" className="hover:text-blue-200">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar