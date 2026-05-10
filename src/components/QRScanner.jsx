import { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

function QRScanner({
  activePlace,
  setIsScanning,
  setActivePlace,
  setConqueredPlaces,
  setShowSavePrompt,
}) {
  useEffect(() => {
    if (!activePlace) return

    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: 250,
      },
      false
    )

    scanner.render(
      (decodedText) => {
        const expectedQr = `place_id:${activePlace.id}`

        if (decodedText === expectedQr) {
          setConqueredPlaces((prev) => {
            if (prev.includes(activePlace.id)) return prev

            const updatedConquests = [...prev, activePlace.id]

            // Mostrar popup solo en la primera conquista
            if (prev.length === 0) {
              setShowSavePrompt(true)
            }

            return updatedConquests
          })

          setIsScanning(false)
          setActivePlace(null)
        } else {
          alert('❌ QR no válido para este local')
        }
      },
      (error) => {
        console.log(error)
      }
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [
    activePlace,
    setActivePlace,
    setConqueredPlaces,
    setIsScanning,
    setShowSavePrompt,
  ])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        padding: '20px',
        color: 'white',
      }}
    >
      <h1>Escanear QR</h1>

      <button
        onClick={() => setIsScanning(false)}
        style={{
          marginBottom: '20px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: 'none',
          background: 'white',
          color: '#111',
          fontWeight: '700',
        }}
      >
        ← Volver
      </button>

      <div
        id="reader"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      ></div>
    </div>
  )
}

export default QRScanner