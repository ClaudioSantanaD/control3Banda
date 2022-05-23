import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userProvider"

const Navbar = () => {

  const{user} = useContext(UserContext)

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        {user ? (
        <div className="container">  
          <NavLink to='/' className='btn btn-outline-primary'>Home</NavLink>
          <NavLink to='/logout' className='btn btn-outline-primary'>Logout</NavLink>
          <NavLink to='/myConcerts' className='btn btn-outline-primary'>Mis Conciertos</NavLink>
        </div>
        ) : (
          <div className="container">  
          <NavLink to='/' className='btn btn-outline-primary'>Home</NavLink>
          <NavLink to='/login'className='btn btn-outline-primary'>Login</NavLink>
          <NavLink to='/register'className='btn btn-outline-primary'>Registrate</NavLink>
        </div>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar