import Link from 'next/link'
export default function Header() {
    return (
      <header className="container-fluid d-flex my-3 align-items-center">

        <Link  href={`/`}>
        <img src="/images/legoyoda.jpg" alt="Logo" className="logo " />
        </Link>
        
        <nav className="d-flex flex-grow-1 justify-content-center">
          <ul className="nav menuNav d-none d-md-flex">
            <li className="nav-item col-3"><a className="nav-link" href="#">Menu1</a></li>
            <li className="nav-item col-3"><a className="nav-link" href="#">Menu2</a></li>
            <li className="nav-item col-3"><a className="nav-link" href="#">Menu3</a></li>
            <li className="nav-item col-3"><a className="nav-link" href="#">Menu4</a></li>
          </ul>
  
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
        </nav>

        <Link href={`/panier`}>
                  <img src="/images/imagepanier.png" alt="Utilisateur" className="user-icon " />
                </Link>
        <Link href={`/connexion`}>
          <img src="/images/logo_utilisateur.png" alt="Utilisateur" className="user-icon " />
        </Link>
        
      </header>
    )
  }
  