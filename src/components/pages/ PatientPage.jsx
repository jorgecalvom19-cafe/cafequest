function PatientPage({ patient, onBack }) {
  return (
    <main className="agenda-page">
      <button type="button" onClick={onBack}>
        ← Volver a agenda
      </button>

      <h1>{patient.name}</h1>

      <p>Ficha del paciente</p>
    </main>
  )
}

export default PatientPage