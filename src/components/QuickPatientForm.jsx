import { useState } from 'react'

function QuickPatientForm({ initialName, onCancel, onSave }) {
  const [name, setName] = useState(initialName || '')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('Readaptación')

  function handleSave() {
    if (!name.trim()) {
      alert('Escribe el nombre del paciente')
      return
    }

    onSave({
      id: crypto.randomUUID(),
      name: `${name.trim()} ${surname.trim()}`.trim(),
      phone: phone.trim(),
      type,
    })
  }

  return (
    <div className="quick-patient-form">
      <h3>Alta rápida de paciente</h3>

      <label>
        Nombre
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Apellidos
        <input
          type="text"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
      </label>

      <label>
        Teléfono
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>

      <label>
        Tipo
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="Readaptación">Readaptación</option>
          <option value="Fisio">Fisio</option>
          <option value="Grupo">Grupo</option>
        </select>
      </label>

      <div className="modal-actions">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>

        <button type="button" onClick={handleSave}>
          Guardar paciente
        </button>
      </div>
    </div>
  )
}

export default QuickPatientForm