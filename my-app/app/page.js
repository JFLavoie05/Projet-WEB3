'use client'

import { useEffect, useState } from 'react'
import SiteWebCard from '../components/SiteWebCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.css'
import '../styles/styleMobile.css'

export default function HomePage() {
  const [sitewebs, SetSiteWebs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('')

  const [nomUtilisateur, setNomUtilisateur] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) 
      setNomUtilisateur(payload.sub)
    } catch (e) {
      console.error('Token invalide')
    }
  }, [])

 

  useEffect(() => {
    fetch("https://projet-prog4e10.cegepjonquiere.ca/api/SiteWebs")
      .then(res => res.json())
      .then(data => SetSiteWebs(data))
      .catch(err => console.error(err))
  }, [])

  const filteredBlogs = sitewebs
    .filter(blog =>
      blog.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'prix') {
        return a.prix - b.prix 
      } else if (sortOption === 'alpha') {
        return a.nom.localeCompare(b.nom) 
      }
      return 0 
    })

  return (
    
    <main className="container my-3">
      <section className="navbar1 container-fluid mb-4">
      
        <div className="row align-items-center">
        <h2>
        {nomUtilisateur ? `Bienvenue, ${nomUtilisateur} !` : 'Bienvenue sur notre site !'}
      </h2>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un site web"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="selectForm col d-flex align-items-center justify-content-between">
            <label className="me-2">Trier par :</label>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sans tri</option>
              <option value="alpha">Alphabétique</option>
              <option value="prix">Prix</option>
            </select>
          </div>
        </div>
      </section>

      <div className="row BlogPost">
        {filteredBlogs.map(blog => (
          <SiteWebCard key={blog.id} siteweb={blog} />
        ))}
      </div>
    </main>
    )
}
