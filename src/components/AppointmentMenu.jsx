function AppointmentMenu({
  appointment,
  position,
  onClose,
  onCut,
  onCopy,
  onDelete,
}) {
  if (!appointment || !position) return null

  function handlePending(feature) {
    alert(`${feature} todavía no está implementado`)
    onClose()
  }

  return (
    <div className="appointment-menu-backdrop" onClick={onClose}>
      <div
        className="appointment-menu"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={() => handlePending('Información')}>
          ℹ️ Información
        </button>

        <button type="button" onClick={() => onCut(appointment)}>
          ✂️ Cortar
        </button>

        <button type="button" onClick={() => onCopy(appointment)}>
          📋 Copiar
        </button>

        <button type="button" onClick={() => handlePending('Dejar nota')}>
          📝 Dejar nota
        </button>

        <button type="button" onClick={() => handlePending('Programar')}>
          📅 Programar
        </button>

        <button type="button" onClick={() => handlePending('Notificaciones')}>
          🔔 Notificaciones
        </button>

        <button type="button" onClick={() => handlePending('Cobrar')}>
          💶 Cobrar
        </button>

        <button
          type="button"
          className="delete-option"
          onClick={() => onDelete(appointment.id)}
        >
          🗑️ Cancelar
        </button>
      </div>
    </div>
  )
}

export default AppointmentMenu