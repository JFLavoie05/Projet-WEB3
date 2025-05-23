export default function Footer() {
  return (
    <footer className="footer mt-5 py-4 border-top">
      <div className="d-flex justify-content-center gap-4 mb-3">
        <a href="#"><img src="/images/facebook.png" className="footer-icon" alt="Facebook" /></a>
        <a href="#"><img src="/images/twiiter.png" className="footer-icon" alt="Twitter" /></a>
        <a href="#"><img src="/images/linkedin.png" className="footer-icon" alt="LinkedIn" /></a>
      </div>
      
      
      <div className="text-center">
        <p className="entreprise">Entreprise fictive - Tous droits réservés</p>
        <p className="année">2025</p>
      </div>
    </footer>
  );
}

  