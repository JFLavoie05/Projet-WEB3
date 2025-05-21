'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/style.css'
import '@/styles/styleMobile.css'

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
  
 /*return (
    <div className="container-fluid bodyBlog">
      
      <img className="imageHaut" src="/images/image card.png" width="100%" height="350px" />
    
      <div className="text-center mt-4">
        <h1>{blog.nom}</h1>
        <p className="text-muted"><em>Prix :{blog.prix}</em></p>
        <p>{blog.description}</p>
      </div>

      
      <div className="imageMillieu text-center mt-4">
        <img src="/images/image card.png" width="15%" height="130px" alt="Image milieu" />
        <p>Caption</p>
      </div>

    </div> 
  )
  

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src="/images/image card.png"
            alt={blog.nom}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '400px' }}
          />
        </div>

        <div className="col-md-6">
          <h2>{blog.nom}</h2>
          <h4 className="text-primary">{blog.prix} $</h4>
          <p className="mt-3">{blog.description}</p>
          <p className="fw-bold">Quantité disponible : {blog.nbRestant}</p>

          <button className="btn btn-success btn-lg mt-3">Acheter maintenant</button>
        </div>
      </div>
    </div>
  )
  */

  return (
    <div className="container my-5">
      <div className="row g-5">
        
        {/* Image principale */}
        <div className="col-md-6 text-center">
          <img
            src={blog.image || "/images/image card.png"}
            alt={blog.nom}
            className="img-fluid rounded border"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        {/* Infos produit */}
        <div className="col-md-6">
          <h1 className="mb-3">{blog.nom}</h1>
          <h3 className="text-success mb-4">{blog.prix} $</h3>
          <p className="mb-4">{blog.description}</p>
          
          <p className="text-muted">Stock disponible : {blog.nbRestant}</p>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">Ajouter au panier</button>
          </div>
        </div>
      </div>

      {/* Footer/infos supplémentaires */}
      <div className="mt-5">
        <h4>Informations supplémentaires</h4>
        <p>Ce produit est développé pour répondre à vos besoins numériques. Pour toute question, contactez notre support technique ou consultez notre FAQ.</p>
      </div>
    </div>
  )
}
