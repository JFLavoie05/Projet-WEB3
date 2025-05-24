'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../styles/style.css'
import '../../../styles/styleMobile.css'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function BlogPostPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)


  
  useEffect(() => {
    if (id) {
      fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs/${id}`)
        .then(res => res.json())
        .then(data => setBlog(data))
        .catch(err => console.error(err))
    }
  }, [id])

  
  if (!blog) {
    return <div className="container"><p>Chargement...</p></div>
  }
  
  const handleAjouterAuPanier = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!token || !userId) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      return;
    }
  
    if (blog.nbRestant === 0) {
      alert("Le produit est en rupture de stock.");
      return;
    }
  
    console.log(userId)
    try {
      const res = await fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/paniers/${userId}/ajouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(blog.id), 
      });
      
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }
  
      alert("Ajouté au panier !");
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-5">
        
        
        <div className="col-md-6 text-center">
          <img
            src={blog.image || "/images/image card.png"}
            alt={blog.nom}
            className="img-fluid rounded border"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        
        <div className="col-md-6">
          <h1 className="mb-3">{blog.nom}</h1>
          <h3 className="text-success mb-4">{blog.prix} $</h3>
          <p className="mb-4">{blog.description}</p>
          
          <p className="text-muted">Stock disponible : {blog.nbRestant}</p>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg" onClick={handleAjouterAuPanier}>Ajouter au panier</button>
          </div>
        </div>
      </div>

      
      
    </div>
  )
}
