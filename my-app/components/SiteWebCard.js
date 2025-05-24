import Link from 'next/link'
import { getRoleFromToken } from './GetRole'
import { useState } from 'react'
import { useEffect } from 'react'

export default function SiteWebCard({ siteweb }) {

  const [role, setRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const roleFromToken = getRoleFromToken(token)
      setRole(roleFromToken)
    }
  }, [])
  console.log(role)
  const handleModifier = () => {
    window.location.href = `/modifier/${siteweb.id}`;
  };

  
  
  return (
    <div className="col-md-4 d-flex justify-content-center mb-4">
  <div className="card shadow-sm" style={{ width: '20rem', borderRadius: '10px', overflow: 'hidden' }}>
    <Link href={`/siteweb/${siteweb.id}`}>
      <img
        src={siteweb.image || "/images/image card.png"}
        className="card-img-top"
        alt={`Image de ${siteweb.nom}`}
        style={{height: '180px' }}
      />
    </Link>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title text-center bg-dark text-white p-2" style={{ borderRadius: '5px' }}>{siteweb.nom}</h5>
      <p className="card-text mt-2">{siteweb.description}</p>
      <p className="card-text"><strong>Prix :</strong> {siteweb.prix.toLocaleString()} $</p>
      <p className="card-text"><strong>Nombre restant :</strong> {siteweb.nbRestant}</p>
      
      {role === 'Admin' && (
        <button className="btn btn-outline-primary mt-auto" onClick={handleModifier}>
          Modifier
        </button>
      )}
    </div>
  </div>
</div>
  )
}
