'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PageInscription() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const router = useRouter()

  const handleInscription = async (e) => {
    e.preventDefault()
    setErreur('')

    try {
      const response = await fetch('https://projet-prog4e10.cegepjonquiere.ca/api/Accounts/register-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })

      if (!response.ok) {
        const msg = await response.text()
        throw new Error(msg)
      }

      alert("Compte créé avec succès")
      router.push('/connexion')
    } catch (err) {
      setErreur(err.message || 'Erreur inconnue')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Inscription</h2>
      {erreur && <div className="alert alert-danger">{erreur}</div>}
      <form onSubmit={handleInscription}>
        <div className="mb-3">
          <label>Nom d'utilisateur</label>
          <input className="form-control" value={username} required
                 onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Courriel</label>
          <input type="email" className="form-control" value={email} required
                 onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input type="password" className="form-control" value={password} required
                 onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Créer le compte</button>
      </form>
    </div>
  )
}