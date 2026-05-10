export default function SaveProgressPrompt({ onClose }) {
  return (
    <div className="save-prompt-overlay">
      <div className="save-prompt">
        <h2>☕ Primera cafetería conquistada</h2>

        <p>
          Guarda tu progreso para no perder tus conquistas y seguir desbloqueando rutas.
        </p>

        <button className="google-btn">
          Continuar con Google
        </button>

        <button className="later-btn" onClick={onClose}>
          Más tarde
        </button>
      </div>
    </div>
  )
}