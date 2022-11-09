import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onChange = () => {
    // tässä muutetaan jokin muuttuja/tila näyttämään erilaiset reitit
    // dispatch(logout())
    // dispatch(reset())
    // navigate('/')
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Reitit</Link>
      </div>
      <form onChange={onChange}>
        <label for="cars">Valitse näytettävät reitit:</label>
        <select id="näytettävät" name="näytettävät">
          <option value="kaikki">Kaikki reitit</option>
          <option value="melonta">Melontareitit</option>
          <option value="pyöräily">Pyöräilyreitit</option>
          <option value="vaellus">Vaellusreitit</option>
        </select>
      </form>
      <ul>
        {user ? (
            <li>
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