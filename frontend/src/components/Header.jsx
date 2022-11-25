import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { setNaytettavat } from '../features/reitit/reittiSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { naytettavat } = useSelector((state) => state.reitit)

  
  const onChange = (e) => {
    dispatch(setNaytettavat( e.target.value ))
    //console.log('näytettävät: ' + naytettavat)
  }


  const onLogout = () => {
    dispatch(logout())
    // meidän ei oikeastaan tarvi state.reitit tiloja nollata koskaan??
    //dispatch(reset())
    navigate('/')
  }


  const padding = {
    padding: 8
  }


  return (
    <header className='header'>
      <div className='logo'>
        <div>
          <Link style={padding} to="/" >Reitit</Link>
          {user
            ? <Link style={padding} to="/lisaareitti">Lisää reitti</Link>
            :<></>
          }
        </div>
      </div>
      <form onChange={onChange}>
        <label htmlFor="naytettavat">Valitse näytettävät reitit: </label>
        <select id="naytettavat" name="naytettavat">
          <option value="kaikki">Kaikki reitit</option>
          <option value="melonta">Melontareitit</option>
          <option value="pyoraily">Pyöräilyreitit</option>
          <option value="vaellus">Vaellusreitit</option>
        </select>
      </form>
      <ul>
        {user ? (
            <li>
              <p>Tervetuloa sivuillemme {user && user.name}</p>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Kirjaudu ulos
              </button>
            </li>) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Kirjaudu
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Rekisteröidy käyttäjäksi
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header


