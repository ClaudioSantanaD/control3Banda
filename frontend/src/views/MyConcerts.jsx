import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userProvider"
import jwt_decode from"jwt-decode"

const MyConcerts = () => {

  const{authToken} = useContext(UserContext)
  const esp = '\u00A0'

  const[concerts, setConcerts] = useState([])

  async function misConciertos (someToken){

    try{
      const resGet = await fetch("http://localhost:5000/user/getMyConcerts",{
        method:'GET',
        headers:{'auth-token':someToken},
        mode:'cors'
      })
      return(await resGet.json())

    }catch(error){
      return(error)
    }

  }

  useEffect( () => {
    misConciertos(authToken).then(res => setConcerts(res))
  },[authToken])

  

  return (
    <>
      <h1>Conciertos de {jwt_decode(authToken).name}</h1>
        <table className="table table-striped table-dark">
    	    <thead>
            <tr>
              <th scope="col">Banda/Artista(s)</th>
              <th scope="col">Fecha y Hora</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Detalle</th>
            </tr>
          </thead>
        <tbody>
          {concerts.map(item => (
          <tr key={item._id}>
						<td>{item.bandaName}</td>
						<td>{item.fechaHora}</td>
						<td>{item.ciudad}</td>
						<td>
							<p>Descripcion:{item.detalle.descriptEvento}</p>
							<p>Lugar:{item.detalle.lugar}</p>
							<p>Producora del evento: {item.detalle.productoraEvento}</p>
							<p>Auspiciadores: {item.detalle.auspiciadores.map(aus => (aus + ',' + esp) )}</p>
						</td>
					</tr>
          ))
          }
          </tbody>
      </table>
      </>
    )
  }
  
  export default MyConcerts