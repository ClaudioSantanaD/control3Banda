import { useGetFetch } from "../hooks/getFetch"
import { NavLink } from "react-router-dom"

const Home = () => {

    const {data, error, loading} = useGetFetch('http://localhost:5000/bandas/cityWithConcerts')

    if(loading){return <h2>Cargando...</h2>}
    if(error !== ''){return <h2>{error}</h2>}

    let citties = []

    for(let i=0; i<data.length; i++){
        citties.push(<NavLink to={`/concerts/${data[i]}`} key={data[i]} className="btn btn-dark">{data[i]}</NavLink>)
    }

    return (
      <div>
          <h1>Ciudades con conciertos</h1>
          {citties}
      </div>
    )
  }
  
  export default Home