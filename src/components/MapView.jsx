import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function createCoffeeIcon({ conquered, selected }) {
  return L.divIcon({
    className: [
      'coffee-marker',
      conquered ? 'conquered' : '',
      selected ? 'selected' : '',
    ]
      .filter(Boolean)
      .join(' '),

    html: '<div class="marker-inner"></div>',

    iconSize: [42, 42],
    iconAnchor: [21, 42],
  })
}

export const places = [
  {
    id: 1,
    name: 'Café Centro',
    category: 'Specialty Coffee',

    heroText:
      'Primera cafetería conquistable de la ciudad.',

    description:
      'Especialidad y ambiente urbano.',

    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',

    xp: 25,

    rewardText:
      'Disponible al registrar visita',

    badges: [
      {
        icon: '☕',
        label: 'Specialty',
      },
      {
        icon: '🌆',
        label: 'Centro',
      },
    ],

    routeProgress: {
      current: 1,
      total: 5,
    },

    position: [41.6488, -0.8891],
  },

  {
    id: 2,
    name: 'La Ruta del Café',

    category: 'Ruta Premium',

    heroText:
      'Local especial dentro de la ruta premium.',

    description:
      'Cafetería seleccionada dentro de una ruta urbana.',

    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',

    xp: 40,

    rewardText:
      'Recompensa exclusiva al completar la ruta',

    badges: [
      {
        icon: '🔥',
        label: 'Premium',
      },
      {
        icon: '☕',
        label: 'Especialidad',
      },
    ],

    routeProgress: {
      current: 2,
      total: 5,
    },

    position: [41.6515, -0.8845],
  },

  {
    id: 3,
    name: 'Coffee Point',

    category: 'Coffee Spot',

    heroText:
      'Cafetería con recompensa al escanear QR.',

    description:
      'Punto rápido de specialty coffee.',

    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',

    xp: 15,

    rewardText:
      'Suma puntos para desbloquear rutas',

    badges: [
      {
        icon: '⚡',
        label: 'Quick stop',
      },
      {
        icon: '☕',
        label: 'Coffee',
      },
    ],

    routeProgress: {
      current: 1,
      total: 3,
    },

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
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {places.map((place) => {
          const isConquered =
            conqueredPlaces.includes(place.id)

          const isSelected =
            selectedPlace?.id === place.id

          return (
            <Marker
              key={place.id}
              position={place.position}
              icon={createCoffeeIcon({
                conquered: isConquered,
                selected: isSelected,
              })}
              eventHandlers={{
                click: () =>
                  setSelectedPlace(place),
              }}
            />
          )
        })}
      </MapContainer>

      {selectedPlace && (
        <div className="place-card">
          <button
            className="place-card-close"
            onClick={() =>
              setSelectedPlace(null)
            }
          >
            ×
          </button>

          <div>
            <h3>{selectedPlace.name}</h3>

            <p>
              {selectedPlace.category}
            </p>
          </div>

          <button
            className="place-card-action"
            onClick={() =>
              setActivePlace(selectedPlace)
            }
          >
            Ver
          </button>
        </div>
      )}
    </>
  )
}

export default MapView