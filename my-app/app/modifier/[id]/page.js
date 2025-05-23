'use client'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getRoleFromToken } from '../../../components/GetRole'

export default function ModifierProduit() {
  const [form, setForm] = useState(null);
  const router = useRouter();
  const { id } = useParams();


  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = getRoleFromToken(token)

    if (role !== 'Admin') {
      alert("Accès refusé. Réservé aux administrateurs.")
      router.push('/')
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) 
    {
      alert('Produit modifié !')
      router.push("/");
    }
    else
    {
      const message = await res.text();
      throw new Error(message);
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm("Es-tu sûr de vouloir supprimer ce produit ?");
    if (!confirmation) return;
  
    const token = localStorage.getItem('token');
    const res = await fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (res.ok) {
      alert("Produit supprimé !");
      router.push('/');
    } else {
      const message = await res.text();
      alert("Erreur lors de la suppression : " + message);
    }
  };

  if (!form) return <p>Chargement...</p>;

  return (

    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: "600px" }}>
  <h2 className="mb-4">Modifier produit</h2>

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

  <div className="d-flex justify-content-between mt-4">
    <button type="submit" className="btn btn-primary">Sauvegarder</button>
    <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
  </div>
</form>
  )
}
