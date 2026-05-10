import { useEffect, useState } from 'react'

import MapView from './components/MapView'
import BottomNav from './components/BottomNav'
import TopCard from './components/TopCard'
import PlaceDetail from './components/PlaceDetail'
import QRScanner from './components/QRScanner'
import Conquests from './components/Conquests'
import SaveProgressPrompt from './components/SaveProgressPrompt'
import Profile from './components/Profile'

import './App.css'

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activePlace, setActivePlace] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [currentTab, setCurrentTab] = useState('map')
  const [showSavePrompt, setShowSavePrompt] = useState(false)

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

  return (
    <div className="app">
      {isScanning ? (
        <QRScanner
          activePlace={activePlace}
          setIsScanning={setIsScanning}
          setActivePlace={setActivePlace}
          setConqueredPlaces={setConqueredPlaces}
          setShowSavePrompt={setShowSavePrompt}
        />
      ) : activePlace ? (
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
          {currentTab === 'profile' && (
  <Profile
  conqueredPlaces={conqueredPlaces}
  setShowSavePrompt={setShowSavePrompt}
/>
)}

          <BottomNav setCurrentTab={setCurrentTab} />
        </>
      )}

      {showSavePrompt && (
        <SaveProgressPrompt
          onClose={() => setShowSavePrompt(false)}
        />
      )}
    </div>
  )
}

export default App