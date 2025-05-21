'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConnexionPage() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleConnexion = async (e) => {
    e.preventDefault()
    setErreur('')
    setLoading(true)

    try {
      const res = await fetch('https://projet-prog4e10.cegepjonquiere.ca/api/accounts/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) {
        setErreur('Nom d’utilisateur ou mot de passe invalide')
        setLoading(false)
        return
      }

      const data = await res.json()          
      localStorage.setItem('token',  data.token)
      localStorage.setItem('userId', data.userId)

      router.push('/')                      
    } catch (err) {
      console.error(err)
      setErreur('Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Connexion</h2>

      {erreur && (
        <div className="alert alert-danger py-2">{erreur}</div>
      )}

      <form onSubmit={handleConnexion}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d’utilisateur</label>
          <input
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>

        <div className="text-center mt-3">
          <a href="/inscription">Créer un compte</a>
        </div>
      </form>
    </div>
  )
}
