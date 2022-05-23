import { useParams } from "react-router-dom"
import { useGetFetch } from "../hooks/getFetch"
import { useState } from "react"
import Modal from "../components/Modal"

const Concerts = () => {

	const esp = '\u00A0'
	const {ciudad} = useParams()
  const {data, error, loading} = useGetFetch(`http://localhost:5000/bandas/concertsByCity/${ciudad}`)
  const [showModal, setShowModal] = useState(false)
  const [bodyt, setBodyt] = useState({})

  if(loading){return <h2>Cargando...</h2>}
  if(error !== ''){return <h2>{error}</h2>}

  //console.log(data)

  return (
		<>
		<h1>Conciertos en {ciudad}</h1>
    {showModal && <Modal open={setShowModal} body={bodyt}/>}
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
          {data.map(item => (
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
            <button onClick={() => {setShowModal(true); setBodyt(item)}} className="btn btn-dark">Agregar Concierto</button>
					</tr>
          ))
          }
          </tbody>
      </table>
			</>
    )
  }
  
  export default Concerts