import { useEffect, useState } from 'react'
import './Agenda.css'
import ViewModeSelector from '../ViewModeSelector'
import NewAppointmentModal from '../NewAppointmentModal'
import AppointmentMenu from '../AppointmentMenu'
import PatientPage from './PatientPage'

const workers = ['Sergio', 'Jorge', 'Abardia']

const allDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

const defaultPatients = [
  {
    id: crypto.randomUUID(),
    name: 'Carlos Pérez',
  },
  {
    id: crypto.randomUUID(),
    name: 'Laura Gómez',
  },
  {
    id: crypto.randomUUID(),
    name: 'Marta Ruiz',
  },
]

const defaultAppointments = [
  {
    id: crypto.randomUUID(),
    day: 'Lunes',
    worker: 'Jorge',
    start: '10:00',
    slots: 4,
    patient: 'Carlos',
    color: '#7dd3fc',
  },
]

const generateTimeSlots = (start = 8, end = 22) => {
  const slots = []

  for (let hour = start; hour <= end; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === end && minute > 0) continue

      slots.push(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      )
    }
  }

  return slots
}

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function Agenda() {
  const hours = generateTimeSlots()
  const [viewDays, setViewDays] = useState(3)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [appointmentMenu, setAppointmentMenu] = useState(null)
  const [cutAppointment, setCutAppointment] = useState(null)
  const [copiedAppointment, setCopiedAppointment] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const [patients, setPatients] = useState(() =>
    loadFromStorage('patients', defaultPatients)
  )

  const [appointments, setAppointments] = useState(() =>
    loadFromStorage('appointments', defaultAppointments)
  )

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  }, [patients])

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }, [appointments])

  const visibleDays = allDays.slice(0, viewDays)

  const gridTemplateColumns = `80px repeat(${
    visibleDays.length * workers.length
  }, 170px)`

  function getColumnIndex(day, worker) {
    const dayIndex = visibleDays.indexOf(day)
    const workerIndex = workers.indexOf(worker)

    return 2 + dayIndex * workers.length + workerIndex
  }

  function canCreateAppointment(day, worker, hour, slots, ignoredAppointmentId) {
    const startIndex = hours.indexOf(hour)
    const endIndex = startIndex + slots

    return !appointments.some((appt) => {
      if (appt.id === ignoredAppointmentId) return false
      if (appt.day !== day || appt.worker !== worker) return false

      const apptStartIndex = hours.indexOf(appt.start)
      const apptEndIndex = apptStartIndex + appt.slots

      return startIndex < apptEndIndex && endIndex > apptStartIndex
    })
  }

  function getDayBorderClass(worker) {
    return [
      worker === workers[0] ? 'day-start' : '',
      worker === workers[workers.length - 1] ? 'day-end' : '',
    ].join(' ')
  }

  function handleSlotClick(day, worker, hour) {
  setAppointmentMenu(null)

  if (cutAppointment) {
    const canMove = canCreateAppointment(
      day,
      worker,
      hour,
      cutAppointment.slots,
      cutAppointment.id
    )

    if (!canMove) {
      alert('No se puede mover aquí porque pisa otra cita')
      return
    }

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === cutAppointment.id
          ? {
              ...appt,
              day,
              worker,
              start: hour,
            }
          : appt
      )
    )

    setCutAppointment(null)
    return
  }

  if (copiedAppointment) {
    const canCopy = canCreateAppointment(
      day,
      worker,
      hour,
      copiedAppointment.slots
    )

    if (!canCopy) {
      alert('No se puede copiar aquí porque pisa otra cita')
      return
    }

    setAppointments((prev) => [
      ...prev,
      {
        ...copiedAppointment,
        id: crypto.randomUUID(),
        day,
        worker,
        start: hour,
      },
    ])

    setCopiedAppointment(null)
    return
  }

    setSelectedSlot({ day, worker, hour })
  }

  function handleOpenAppointmentMenu(event, appointment) {
    event.stopPropagation()

    setAppointmentMenu({
      appointment,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    })
  }

  function handleDeleteAppointment(appointmentId) {
    const confirmed = confirm('¿Seguro que quieres cancelar esta cita?')

    if (!confirmed) return

    setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId))

    if (cutAppointment?.id === appointmentId) {
      setCutAppointment(null)
    }

    setAppointmentMenu(null)
  }

  if (selectedPatient) {
  return (
    <PatientPage
      patient={selectedPatient}
      onBack={() => setSelectedPatient(null)}
    />
  )
}
  return (
    <main className="agenda-page" onClick={() => setAppointmentMenu(null)}>
      <h1>Agenda semanal</h1>

      {cutAppointment && (
        <div className="cut-banner">
          Cita cortada: <strong>{cutAppointment.patient}</strong>. Pulsa un hueco
          libre para moverla.
          <button type="button" onClick={() => setCutAppointment(null)}>
            Cancelar movimiento
          </button>
        </div>
      )}

      <ViewModeSelector viewDays={viewDays} setViewDays={setViewDays} />

      <section className="agenda-card">
        <div className="days-row" style={{ gridTemplateColumns }}>
          <div className="empty-day-cell" />

          {visibleDays.map((day) => (
            <div
              key={day}
              className="day-title"
              style={{ gridColumn: `span ${workers.length}` }}
            >
              {day}
            </div>
          ))}
        </div>

        <div
          className="schedule-grid"
          style={{
            gridTemplateColumns,
            gridTemplateRows: `48px repeat(${hours.length}, 34px)`,
          }}
        >
          <div className="header-cell">Hora</div>

          {visibleDays.map((day) =>
            workers.map((worker) => (
              <div
                key={`${day}-${worker}`}
                className={`header-cell worker-header ${getDayBorderClass(
                  worker
                )}`}
              >
                {worker}
              </div>
            ))
          )}

          {hours.map((hour, index) => (
            <div
              key={hour}
              className="time-cell"
              style={{
                gridColumn: 1,
                gridRow: index + 2,
              }}
            >
              {hour}
            </div>
          ))}

          {hours.map((hour, rowIndex) =>
            visibleDays.map((day) =>
              workers.map((worker) => (
                <button
                  key={`${day}-${worker}-${hour}`}
                  className={`slot-cell ${getDayBorderClass(worker)} ${
                    cutAppointment ? 'paste-target' : ''
                  }`}
                  style={{
                    gridColumn: getColumnIndex(day, worker),
                    gridRow: rowIndex + 2,
                  }}
                  onClick={() => handleSlotClick(day, worker, hour)}
                />
              ))
            )
          )}

          {appointments
            .filter((appt) => visibleDays.includes(appt.day))
            .map((appt) => {
              const startRow = hours.indexOf(appt.start) + 2
              const isCut = cutAppointment?.id === appt.id

              return (
                <button
                  key={appt.id}
                  className={`appointment-block ${getDayBorderClass(
                    appt.worker
                  )} ${isCut ? 'appointment-cut' : ''}`}
                  style={{
                    gridColumn: getColumnIndex(appt.day, appt.worker),
                    gridRow: `${startRow} / span ${appt.slots}`,
                    background: appt.color,
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="appointment-topbar">
                    <button
                      type="button"
                      className="appointment-menu-button"
                      onClick={(event) => handleOpenAppointmentMenu(event, appt)}
                    >
                      ☰
                    </button>

                    <button
                      type="button"
                      className="appointment-edit-button"
                      onClick={(event) => {
                        event.stopPropagation()
                        const patient = patients.find((p) => p.name === appt.patient)

if (patient) {
  setSelectedPatient(patient)
}
                      }}
                    >
                      ✏️
                    </button>
                  </div>

                  <span className="appointment-text">{appt.patient}</span>
                </button>
              )
            })}
        </div>
      </section>

      <AppointmentMenu
        appointment={appointmentMenu?.appointment}
        position={appointmentMenu?.position}
        onClose={() => setAppointmentMenu(null)}
        onCut={(appointment) => {
          setCutAppointment(appointment)
          setAppointmentMenu(null)
        }}
        onDelete={handleDeleteAppointment}
      />

<AppointmentMenu
  appointment={appointmentMenu?.appointment}
  position={appointmentMenu?.position}
  onClose={() => setAppointmentMenu(null)}
  onCut={(appointment) => {
    setCutAppointment(appointment)
    setCopiedAppointment(null)
    setAppointmentMenu(null)
  }}
  onCopy={(appointment) => {
    setCopiedAppointment(appointment)
    setCutAppointment(null)
    setAppointmentMenu(null)
  }}
  onDelete={handleDeleteAppointment}
/>


      <NewAppointmentModal
        selectedSlot={selectedSlot}
        patients={patients}
        onCreatePatient={(patientData) => {
          const newPatient = {
            id: patientData.id || crypto.randomUUID(),
            name: patientData.name,
            phone: patientData.phone || '',
            type: patientData.type || 'Readaptación',
          }

          setPatients((prev) => [...prev, newPatient])

          return newPatient
        }}
        onClose={() => setSelectedSlot(null)}
        onSave={({ patientName, slots }) => {
          if (
            !canCreateAppointment(
              selectedSlot.day,
              selectedSlot.worker,
              selectedSlot.hour,
              slots
            )
          ) {
            alert('No se puede crear la cita porque pisa otra cita')
            return
          }

          setAppointments((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              day: selectedSlot.day,
              worker: selectedSlot.worker,
              start: selectedSlot.hour,
              slots,
              patient: patientName,
              color: '#fde68a',
            },
          ])

          setSelectedSlot(null)
        }}
      />
    </main>
  )
}

export default Agenda