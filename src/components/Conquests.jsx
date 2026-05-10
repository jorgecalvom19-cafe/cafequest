function Conquests({ conqueredPlaces }) {
  return (
    <div className="conquests-page">
      <h1>🏆 Tus conquistas</h1>

      <p className="conquests-subtitle">
        {conqueredPlaces.length} cafeterías descubiertas
      </p>

      <div className="conquests-list">
        {conqueredPlaces.map((placeId) => (
          <div
            key={placeId}
            className="conquest-item"
          >
            ☕ Cafetería #{placeId}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conquests