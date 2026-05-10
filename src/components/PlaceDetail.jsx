function PlaceDetail({ place, onBack, onScan }) {
  const routeCurrent = place.routeProgress?.current ?? 1
  const routeTotal = place.routeProgress?.total ?? 5
  const progress = (routeCurrent / routeTotal) * 100

  return (
    <div className="detail-page">
      <div
        className="detail-hero"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.82)),
            url(${place.image})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button className="back-button" onClick={onBack}>
          ←
        </button>

        <div className="hero-overlay">
          <p className="detail-category">
            {place.category}
          </p>

          <h1>{place.name}</h1>

          <p className="hero-subtitle">
            {place.heroText}
          </p>
        </div>
      </div>

      <div className="detail-sheet">
        <div className="sheet-handle"></div>

        <div className="reward-card">
          <div>
            <p className="reward-label">
              Recompensa futura
            </p>

            <h2>+{place.xp} XP</h2>

            <small>
              {place.rewardText}
            </small>
          </div>

          <span>☕</span>
        </div>

        <button className="scan-button" onClick={onScan}>
          Registrar visita
        </button>

        <div className="detail-badges">
          {place.badges?.map((badge) => (
            <div key={badge.label}>
              <strong>{badge.icon}</strong>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="route-progress">
          <div>
            <span>Progreso de ruta</span>

            <strong>
              {routeCurrent} / {routeTotal}
            </strong>
          </div>

          <div className="route-bar">
            <div
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetail