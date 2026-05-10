import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const coffeeIcon = L.divIcon({
  className: 'coffee-marker',
  html: '<div class="marker-inner"></div>',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
})

const conqueredIcon = L.divIcon({
  className: 'coffee-marker conquered',
  html: '<div class="marker-inner"></div>',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
})

const places = [
  {
    id: 1,
    name: 'Café Centro',
    description: 'Primera cafetería conquistable',
    position: [41.6488, -0.8891],
  },
  {
    id: 2,
    name: 'La Ruta del Café',
    description: 'Local especial de la ruta premium',
    position: [41.6515, -0.8845],
  },
  {
    id: 3,
    name: 'Coffee Point',
    description: 'Cafetería con recompensa al escanear QR',
    position: [41.6462, -0.8932],
  },
]

function MapView({
  selectedPlace,
  setSelectedPlace,
  setActivePlace,
  conqueredPlaces = [],
}) {
  return (
    <>
      <MapContainer
        center={[41.6488, -0.8891]}
        zoom={15}
        zoomControl={false}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={
              conqueredPlaces.includes(place.id)
                ? conqueredIcon
                : coffeeIcon
            }
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          />
        ))}
      </MapContainer>

      {selectedPlace && (
        <div className="place-card">
          <button
            className="place-card-close"
            onClick={() => setSelectedPlace(null)}
          >
            ×
          </button>

          <div>
            <h3>{selectedPlace.name}</h3>
            <p>{selectedPlace.description}</p>
          </div>

          <button
            className="place-card-action"
            onClick={() => setActivePlace(selectedPlace)}
          >
            Ver
          </button>
        </div>
      )}
    </>
  )
}

export default MapView