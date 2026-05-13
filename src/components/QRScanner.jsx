import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

function QRScanner({
  activePlace,
  setIsScanning,
  setActivePlace,
  setConqueredPlaces,
  setShowSavePrompt,
}) {
  const scannedRef = useRef(false)

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
        if (scannedRef.current) return
        scannedRef.current = true

        const expectedQr = `place_id:${activePlace.id}`

        if (decodedText === expectedQr) {
          setConqueredPlaces((prev) => {
            if (prev.includes(activePlace.id)) return prev

            if (prev.length === 0) {
              setShowSavePrompt(true)
            }

            return [...prev, activePlace.id]
          })

          setTimeout(() => {
            setIsScanning(false)
            setActivePlace(null)
          }, 150)
        } else {
          scannedRef.current = false
          alert('❌ QR no válido para este local')
        }
      },
      () => {}
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
      />
    </div>
  )
}

export default QRScanner