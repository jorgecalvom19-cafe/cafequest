function SaveProgressPrompt({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          background: '#111111',
          borderRadius: '34px',
          padding: '34px 24px 26px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '74px',
            height: '74px',
            margin: '0 auto 22px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '38px',
          }}
        >
          ☕
        </div>

        <h2
          style={{
            margin: '0 0 14px 0',
            fontSize: '30px',
            lineHeight: '1.05',
            fontWeight: '800',
            color: '#FFFFFF',
            WebkitTextFillColor: '#FFFFFF',
            letterSpacing: '-0.03em',
          }}
        >
          Primera conquista
        </h2>

        <p
          style={{
            margin: '0 0 30px 0',
            fontSize: '16px',
            lineHeight: '1.55',
            color: '#B8B8B8',
            WebkitTextFillColor: '#B8B8B8',
          }}
        >
          Guarda tu progreso para no perder tus cafeterías conquistadas y seguir desbloqueando rutas nuevas.
        </p>

        <button
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '20px',
            padding: '18px',
            background: '#F4F1EA',
            color: '#111111',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '18px',
            boxShadow: '0 6px 18px rgba(255,255,255,0.08)',
          }}
        >
          Continuar con Google
        </button>

        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#8E8E93',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Más tarde
        </button>
      </div>
    </div>
  )
}

export default SaveProgressPrompt