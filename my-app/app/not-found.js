export default function NotFound() {
    return (
      <div className="container mt-5 text-center">
        <h1 className="display-4">Produit introuvable</h1>
        <p className="lead">Le produit que vous recherchez n’existe pas ou a été supprimé.</p>
        <a href="/" className="btn btn-primary mt-3">Retour à l'accueil</a>
      </div>
    );
  }