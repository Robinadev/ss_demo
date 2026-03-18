import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState<string>('Loading...')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(err => setStatus(`Error: ${err.message}`))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>SafeHaven Platform</h1>
      <p>Frontend Status: {status}</p>
      <p>
        <a href="/api/docs">View API Docs</a>
      </p>
    </div>
  )
}

export default App
