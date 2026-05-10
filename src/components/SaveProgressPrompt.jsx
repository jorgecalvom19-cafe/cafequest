function SaveProgressPrompt({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          background: '#111',
          borderRadius: '32px',
          padding: '28px 22px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          textAlign: 'center',
          animation: 'fadeIn 0.25s ease',
        }}
      >
        <div
          style={{
            fontSize: '44px',
            marginBottom: '14px',
          }}
        >
          ☕
        </div>

        <h2
          style={{
            color: 'white',
            fontSize: '28px',
            lineHeight: '1.1',
            marginBottom: '14px',
            fontWeight: '800',
          }}
        >
          Primera conquista
        </h2>

        <p
          style={{
            color: '#ffffff',
            fontSize: '17px',
            lineHeight: '1.5',
            marginBottom: '30px',
          }}
        >
          Guarda tu progreso y sigue desbloqueando cafeterías únicas.
        </p>

        <button
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '18px',
            border: 'none',
            background: '#F4F1EA',
            color: '#111',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '18px',
          }}
        >
          Continuar con Google
        </button>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#8E8E93',
            fontSize: '16px',
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