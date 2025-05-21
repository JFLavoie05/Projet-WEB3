'use client'

export default function GlobalError(error) {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">Une erreur est survenue</h1>
      <p>{error.message || "Quelque chose s’est mal passé."}</p>
      <a href="/" className="btn btn-outline-secondary mt-3">Retour à l'accueil</a>
    </div>
  )
}
