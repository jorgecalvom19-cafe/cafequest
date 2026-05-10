import { places } from './MapView'

function Conquests({ conqueredPlaces, setCurrentTab, setSelectedPlace }) {
  const totalPlaces = places.length
  const discovered = conqueredPlaces.length
  const percentage = Math.round((discovered / totalPlaces) * 100)

  const conqueredPlaceObjects = places.filter((place) =>
    conqueredPlaces.includes(place.id)
  )

  function goToPlaceOnMap(place) {
    setSelectedPlace(place)
    setCurrentTab('map')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F2EB', padding: '30px 20px 120px' }}>
      <h1 style={{ margin: '0 0 6px', fontSize: '34px', letterSpacing: '-0.05em', color: '#111' }}>
        Conquistas
      </h1>

      <p style={{ margin: '0 0 22px', color: '#726B63', fontSize: '16px' }}>
        Tu colección de cafeterías descubiertas.
      </p>

      <div style={{ background: '#111', color: 'white', borderRadius: '28px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ margin: '0 0 14px', color: '#B8B8B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Progreso
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div>
            <strong style={{ fontSize: '28px' }}>{discovered}</strong>
            <p style={{ margin: '4px 0 0', color: '#AFAFAF', fontSize: '13px' }}>Descubiertas</p>
          </div>

          <div>
            <strong style={{ fontSize: '28px' }}>{percentage}%</strong>
            <p style={{ margin: '4px 0 0', color: '#AFAFAF', fontSize: '13px' }}>Completado</p>
          </div>

          <div>
            <strong style={{ fontSize: '28px' }}>0</strong>
            <p style={{ margin: '4px 0 0', color: '#AFAFAF', fontSize: '13px' }}>Rutas</p>
          </div>
        </div>
      </div>

      <h2 style={{ margin: '0 0 14px', fontSize: '22px', color: '#111', letterSpacing: '-0.03em' }}>
        Colección
      </h2>

      {conqueredPlaceObjects.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 28px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '21px', color: '#111' }}>
            Todavía no hay conquistas
          </h3>

          <p style={{ margin: 0, color: '#726B63', fontSize: '15px', lineHeight: '1.5' }}>
            Explora el mapa, visita una cafetería y escanea su QR para desbloquearla.
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '26px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.06)' }}>
          {conqueredPlaceObjects.map((place, index) => (
            <div
              key={place.id}
              onClick={() => goToPlaceOnMap(place)}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                borderBottom: index === conqueredPlaceObjects.length - 1 ? 'none' : '1px solid #EFEAE2',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                ☕
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#111', letterSpacing: '-0.02em' }}>
                  {place.name}
                </h3>

                <p style={{ margin: 0, color: '#726B63', fontSize: '14px' }}>
                  {place.category} · Ver en mapa
                </p>
              </div>

              <span style={{ fontSize: '20px', color: '#6D655D' }}>›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Conquests