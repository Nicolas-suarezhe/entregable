import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CharacterCard from './components/CharacterCard'

function App() {


const [location,setLocation] = useState({})
const [locationId, setLocationId] = useState('')
  useEffect(()=>{
    const randomId = Math.floor(Math.random()* 126)+1
    axios.get(`https://rickandmortyapi.com/api/location/${randomId}`)
      .then(res => setLocation (res.data))
    },[])

    console.log(location)

  const locationName = location.name
  const locationResidents = location.residents?.length
  const locationDimension = location.dimension
  const locationType = location.type

  const searchLocationId = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then(res => setLocation (res.data))
  }
  

  return (
    <div className="App">

      <nav className='nav'>
        <img src="../src/assets/r&mheader.png" alt="" className='banner'/>
        <input type="text" value={locationId} onChange={e => setLocationId(e.target.value)} className="nav-input input-nav"/>
        <button onClick={searchLocationId} className="nav-input">Search</button>
      </nav>





      <div>
          <h1 className='loc-info-data'>Name: {locationName}</h1>
        <div className='location-information'>
          <p className='loc-info-data'>Amount of residents: {locationResidents}</p>
          <p className='loc-info-data'>Dimension: {locationDimension}</p>
          <p className='loc-info-data'>Type: {locationType}</p>
        </div>
      </div>

      <div className='app-cards'>
        <ul className='residents'>
        {location.residents?.map(character => (
          <CharacterCard url={character}
          key={character}></CharacterCard>
        ))}
        </ul>
      </div>
      
    </div>
  )
}

export default App
