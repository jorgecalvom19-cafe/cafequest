import { useEffect, useState } from 'react'

import MapView from './components/MapView'
import BottomNav from './components/BottomNav'
import TopCard from './components/TopCard'
import PlaceDetail from './components/PlaceDetail'
import QRScanner from './components/QRScanner'
import Conquests from './components/Conquests'

import './App.css'

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activePlace, setActivePlace] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [currentTab, setCurrentTab] = useState('map')

  const [conqueredPlaces, setConqueredPlaces] = useState(() => {
    const saved = localStorage.getItem('conqueredPlaces')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(
      'conqueredPlaces',
      JSON.stringify(conqueredPlaces)
    )
  }, [conqueredPlaces])

  if (isScanning) {
    return (
      <QRScanner
        activePlace={activePlace}
        setIsScanning={setIsScanning}
        setActivePlace={setActivePlace}
        setConqueredPlaces={setConqueredPlaces}
      />
    )
  }

  return (
    <div className="app">
      {activePlace ? (
        <PlaceDetail
          place={activePlace}
          onBack={() => setActivePlace(null)}
          onScan={() => setIsScanning(true)}
        />
      ) : (
        <>
          {currentTab === 'map' && (
            <>
              <TopCard conqueredPlaces={conqueredPlaces} />

              <MapView
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
                setActivePlace={setActivePlace}
                conqueredPlaces={conqueredPlaces}
              />
            </>
          )}

          {currentTab === 'conquests' && (
            <Conquests conqueredPlaces={conqueredPlaces} />
          )}

          <BottomNav setCurrentTab={setCurrentTab} />
        </>
      )}
    </div>
  )
}

export default App