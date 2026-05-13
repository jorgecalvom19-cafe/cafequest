import { useState } from 'react'
import QuickPatientForm from './QuickPatientForm'

function NewAppointmentModal({
  selectedSlot,
  patients,
  onCreatePatient,
  onClose,
  onSave,
}) {
  const [search, setSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [durationSlots, setDurationSlots] = useState(4)
  const [showQuickForm, setShowQuickForm] = useState(false)

  if (!selectedSlot) return null

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSave() {
    if (!selectedPatient) {
      alert('Selecciona un paciente o créalo con alta rápida')
      return
    }

    onSave({
      patientName: selectedPatient.name,
      slots: Number(durationSlots),
    })

    setSearch('')
    setSelectedPatient(null)
    setDurationSlots(4)
    setShowQuickForm(false)
  }

  return (
    <div className="modal-backdrop">
      <div className="appointment-modal">
        {!showQuickForm ? (
          <>
            <h2>Nueva cita</h2>

            <p>
              {selectedSlot.day} · {selectedSlot.worker} · {selectedSlot.hour}
            </p>

            <label>
              Buscar paciente
              <input
                type="text"
                placeholder="Nombre del paciente"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setSelectedPatient(null)
                }}
              />
            </label>

            {search && (
              <div className="patient-results">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      type="button"
                      className={
                        selectedPatient?.id === patient.id
                          ? 'patient-result active'
                          : 'patient-result'
                      }
                      onClick={() => {
                        setSelectedPatient(patient)
                        setSearch(patient.name)
                      }}
                    >
                      {patient.name}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    className="quick-create-patient"
                    onClick={() => setShowQuickForm(true)}
                  >
                    + Alta rápida: {search}
                  </button>
                )}
              </div>
            )}

            <label>
              Duración
              <select
                value={durationSlots}
                onChange={(event) => setDurationSlots(event.target.value)}
              >
                <option value={1}>15 min</option>
                <option value={2}>30 min</option>
                <option value={3}>45 min</option>
                <option value={4}>1 hora</option>
              </select>
            </label>

            <div className="modal-actions">
              <button type="button" onClick={onClose}>
                Cancelar
              </button>

              <button type="button" onClick={handleSave}>
                Guardar cita
              </button>
            </div>
          </>
        ) : (
          <QuickPatientForm
            initialName={search}
            onCancel={() => setShowQuickForm(false)}
            onSave={(newPatient) => {
              const savedPatient = onCreatePatient(newPatient)

              setSelectedPatient(savedPatient)
              setSearch(savedPatient.name)
              setShowQuickForm(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default NewAppointmentModal