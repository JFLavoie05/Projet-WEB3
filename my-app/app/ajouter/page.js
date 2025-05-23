'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRoleFromToken } from '../../components/GetRole'

export default function AjouterProduitPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    nbRestant: '',
    image: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = getRoleFromToken(token)

    if (role !== 'Admin') {
      alert("Accès refusé. Réservé aux administrateurs.")
      router.push('/')
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message)
      }

      alert("Produit ajouté avec succès !")
      router.push('/')

    } catch (err) {
      alert("Erreur : " + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Ajouter un produit</h2>

      <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          name="nom"
          value={form.nom}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="prix" className="form-label">Prix</label>
        <input
          type="number"
          className="form-control"
          id="prix"
          name="prix"
          value={form.prix}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nbRestant" className="form-label">Stock disponible</label>
        <input
          type="number"
          className="form-control"
          id="nbRestant"
          name="nbRestant"
          value={form.nbRestant}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image (URL)</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success">Ajouter le produit</button>
    </form>
  )
}