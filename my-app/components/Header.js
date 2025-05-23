import Link from 'next/link';

export default function Header() {
  return (
    <header className="header container-fluid d-flex align-items-center justify-content-between py-3 px-4 shadow-sm bg-white rounded">
      
      <Link href="/">
        <img src="/images/GoPappyLogo.png" alt="Logo" className="logo me-3" />
      </Link>

      
      <nav className="d-none d-md-block flex-grow-1">
        <ul className="nav justify-content-center gap-4 menuNav">
          <li className="nav-item"><a className="nav-link" href="../ajouter">Ajouter un produit</a></li>
        </ul>
      </nav>

      <nav className="navbar menuHamburger d-md-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mobileMenu">
              <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="#">Menu1</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Menu2</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Menu3</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Menu4</a></li>
              </ul>
            </div>
          </nav>
        

      
      <div className="d-flex align-items-center gap-3 ms-3">
        <Link href="/panier">
          <img src="/images/imagepanier.png" alt="Panier" className="icon" />
        </Link>
        <Link href="/connexion">
          <img src="/images/logo_utilisateur.png" alt="Utilisateur" className="icon" />
        </Link>
      </div>
    </header>
  );
}

  