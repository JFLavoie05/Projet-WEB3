export default function CancelPage() {
    return (
      <div className="container mt-5 text-center">
        <h1 className="display-5 text-danger">Commande annulée</h1>
        <p>Il semble que le paiement a été annulé ou a échoué.</p>
        <a href="/panier" className="btn btn-outline-secondary mt-3">Retour au panier</a>
      </div>
    )
}