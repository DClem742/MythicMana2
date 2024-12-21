import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

function DeckStats({ cards }) {
  // Mana Curve Data
  const manaCurveData = {
    labels: ['0', '1', '2', '3', '4', '5', '6+'],
    datasets: [{
      label: 'Number of Cards',
      data: Array(7).fill(0).map((_, i) => 
        cards.filter(card => 
          i === 6 ? card.cmc >= 6 : card.cmc === i
        ).reduce((acc, card) => acc + card.quantity, 0)
      ),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  }

  // Color Distribution Data
  const colorCount = {
    W: 0, U: 0, B: 0, R: 0, G: 0, C: 0
  }
  cards.forEach(card => {
    if (card.colors?.length > 0) {
      card.colors.forEach(color => {
        colorCount[color] += card.quantity
      })
    } else {
      colorCount.C += card.quantity
    }
  })

  const colorData = {
    labels: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless'],
    datasets: [{
      data: [colorCount.W, colorCount.U, colorCount.B, colorCount.R, colorCount.G, colorCount.C],
      backgroundColor: [
        '#F9FAFB', // White
        '#3B82F6', // Blue
        '#1F2937', // Black
        '#EF4444', // Red
        '#10B981', // Green
        '#9CA3AF'  // Colorless
      ]
    }]
  }

  // Card Type Distribution
  const typeCount = cards.reduce((acc, card) => {
    const type = card.type_line.split('—')[0].trim()
    acc[type] = (acc[type] || 0) + card.quantity
    return acc
  }, {})

  const typeData = {
    labels: Object.keys(typeCount),
    datasets: [{
      data: Object.values(typeCount),
      backgroundColor: [
        '#F59E0B',
        '#10B981',
        '#6366F1',
        '#EC4899',
        '#8B5CF6',
        '#14B8A6'
      ]
    }]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Mana Curve</h3>
        <Bar
          data={manaCurveData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false }
            }
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Color Distribution</h3>
        <Pie
          data={colorData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'right' }
            }
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Card Types</h3>
        <Pie
          data={typeData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'right' }
            }
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Deck Overview</h3>
        <div className="space-y-2">
          <p>Total Cards: {cards.reduce((acc, card) => acc + card.quantity, 0)}</p>
          <p>Average Mana Value: {
            (cards.reduce((acc, card) => acc + (card.cmc * card.quantity), 0) / 
            cards.reduce((acc, card) => acc + card.quantity, 0)).toFixed(2)
          }</p>
          <p>Unique Cards: {cards.length}</p>
        </div>
      </div>
    </div>
  )
}

export default DeckStats
