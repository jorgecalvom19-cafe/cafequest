function PlaceDetail({ place, onBack, onScan }) {
  return (
    <div className="detail-page">
      <div className="detail-hero">
        <button className="back-button" onClick={onBack}>
          ←
        </button>

        <div className="hero-overlay">
          <p className="detail-category">
            Specialty Coffee
          </p>

          <h1>{place.name}</h1>
        </div>
      </div>

      <div className="detail-sheet">
        <div className="sheet-handle"></div>

        <p className="detail-description">
          {place.description}
        </p>

        <div className="detail-stats">
          <div>
            <strong>+25</strong>
            <span>Puntos</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Visitas</span>
          </div>

          <div>
            <strong>QR</strong>
            <span>Check-in</span>
          </div>
        </div>

        <button
  className="scan-button"
  onClick={onScan}
>
  Escanear QR
</button>
      </div>
    </div>
  )
}

export default PlaceDetail