function TopCard({ conqueredPlaces }) {
  return (
    <div className="top-card">
      <h2>Ritual ☕</h2>

      <div className="stats">
        <div>
          <strong>{conqueredPlaces.length}</strong>
          <span>Conquistas</span>
        </div>

        <div>
          <strong>2🔥</strong>
          <span>Racha</span>
        </div>

        <div>
          <strong>+1</strong>
          <span>Para premio</span>
        </div>
      </div>
    </div>
  )
}

export default TopCard