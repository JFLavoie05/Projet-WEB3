import Link from 'next/link'

export default function SiteWebCard({ siteweb }) {
  
  
  return (
    <div className="col-4 d-flex justify-content-center mb-4">
      <div className="card" style={{ width: '18rem' }}>
        <Link href={`/siteweb/${siteweb.id}`}>
          <img src="/images/image card.png" className="card-img-top" alt="image blog" />
        </Link>
        <div className="card-body">
          <h5>{siteweb.nom}</h5>
          <p className="card-text">{siteweb.description}</p>
        </div>
      </div>
    </div>
  )
}
