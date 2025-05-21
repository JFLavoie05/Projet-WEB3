'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import React from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PanierPage() {
  const [panier, setPanier] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (!token) return

    

    fetch(`https://projet-prog4e10.cegepjonquiere.ca/api/paniers/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Non autorisé'))
      .then(data => setPanier(data))
      .catch(err => console.error(err))
  }, [])

  const handleCheckout = async () => {

    if (!panier || !panier.siteWeb || panier.siteWeb.length === 0) {
      alert("Votre panier est vide. Veuillez ajouter des articles avant de passer une commande.");
      return;
    }

    const stripe = await stripePromise

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: panier.siteWeb }),
    })

    const { id } = await res.json()

    const result = await stripe.redirectToCheckout({ sessionId: id })
    if (result.error) {
      console.error(result.error.message)
    }
  }

  if (!panier) return <p className="container mt-5">Chargement du panier...</p>

  return (
    <div className="container my-5">
    <h2 className="text-center fw-bold mb-4">Mon panier</h2>
    <p className="text-center text-muted fs-5">Total : <strong className="text-success">{panier.total}$</strong></p>
  
    {panier.siteWeb && panier.siteWeb.length > 0 ? (
      <div className="row justify-content-center g-4">
        {panier.siteWeb.map(item => (
          <div className="col-md-4 col-sm-6" key={item.id}>
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">{item.nom}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text text-primary fw-semibold">{item.prix}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="alert alert-info text-center mt-4">
        Votre panier est vide.
      </div>
    )}
  
    <div className="text-center mt-5">
      <button className="btn btn-lg btn-success shadow px-4" onClick={handleCheckout}>
        Passer la commande
      </button>
    </div>
  </div>
  )
}


