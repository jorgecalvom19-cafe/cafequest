function getUserLevel(count) {
  if (count >= 10) {
    return {
      name: 'Leyenda cafetera',
      next: null,
      progress: 100,
      subtitle: 'Has conquistado la ciudad café a café.',
    }
  }

  if (count >= 5) {
    return {
      name: 'Barista urbano',
      next: 10,
      progress: (count / 10) * 100,
      subtitle: `${10 - count} conquistas para subir de nivel.`,
    }
  }

  if (count >= 2) {
    return {
      name: 'Coffee Hunter',
      next: 5,
      progress: (count / 5) * 100,
      subtitle: `${5 - count} conquistas para subir de nivel.`,
    }
  }

  return {
    name: 'Explorador',
    next: 2,
    progress: (count / 2) * 100,
    subtitle: `${2 - count} conquistas para subir de nivel.`,
  }
}

function Profile({ conqueredPlaces }) {
  const conqueredCount = conqueredPlaces.length
  const level = getUserLevel(conqueredCount)

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: '30px 20px 110px',
        color: 'white',
        background:
          'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url("https://tile.openstreetmap.org/15/16585/12342.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(7px)',
          background: 'rgba(0,0,0,0.25)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            margin: '0 0 26px',
            fontSize: '38px',
            letterSpacing: '-0.05em',
            color: '#FFFFFF',
            WebkitTextFillColor: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          Perfil
        </h1>

        <div
          style={{
            background: 'rgba(18,18,18,0.88)',
            backdropFilter: 'blur(18px)',
            borderRadius: '34px',
            padding: '26px 24px',
            boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '24px',
              background: '#F4F1EA',
              color: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 20px',
            }}
          >
            ☕
          </div>

          <p
            style={{
              margin: '0 0 8px',
              color: '#AFAFAF',
              fontSize: '13px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            Invitado
          </p>

          <h2
            style={{
              margin: '0 0 10px',
              fontSize: '34px',
              lineHeight: '1',
              color: '#FFFFFF',
              WebkitTextFillColor: '#FFFFFF',
              letterSpacing: '-0.04em',
              textAlign: 'center',
            }}
          >
            {level.name}
          </h2>

          <p
            style={{
              margin: '0 0 26px',
              color: '#C8C8C8',
              fontSize: '16px',
              lineHeight: '1.5',
              textAlign: 'center',
            }}
          >
            {level.subtitle}
          </p>

          <div
            style={{
              height: '10px',
              background: 'rgba(255,255,255,0.10)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${level.progress}%`,
                background: '#F4F1EA',
                borderRadius: '999px',
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              color: '#9B9B9B',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {level.next
              ? `${conqueredCount} / ${level.next} conquistas`
              : `${conqueredCount} conquistas completadas`}
          </p>
        </div>

        <button
          style={{
            width: '100%',
            marginTop: '18px',
            border: 'none',
            borderRadius: '24px',
            padding: '18px',
            background: '#F4F1EA',
            color: '#111',
            fontSize: '17px',
            fontWeight: '800',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            cursor: 'pointer',
          }}
        >
          Crear cuenta
        </button>
      </div>
    </div>
  )
}

export default Profile