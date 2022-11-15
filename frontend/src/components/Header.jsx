import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { setNaytettavat } from '../features/reitit/reittiSlice'
import LisaaReitti from '../pages/LisaaReitti';


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { naytettavat } = useSelector((state) => state.reitit)


  const onChange = (e) => {
    // tähän täytyy laittaa jokin setStatea vastaava, mikä se sitten onkaan????
    // ei saa suoraan sijoittaa constiin... nythän tää toimii
    dispatch(setNaytettavat( e.target.value ))
    console.log('näytettävät: ' + naytettavat)
  }


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  const padding = {
    padding: 8
  }


  return (
    <header className='header'>
      <div className='logo'>

        <div>
          {/* <Link style={padding} to="/" >Reitit</Link> */}
          <Link style={padding} to="/" naytettavat = {naytettavat}>Reitit</Link>
          {/* <Link style={padding} to="/reitti/6369f30779ae3a342ad0b926">Reitti</Link> */}
          {/* <Link style={padding} to={`/reitti/${reittiId}`}>Reitti</Link> */}
          {/* // <Link to={`/notes/${note.id}`}>{note.content}</Link> */}
          <Link style={padding} to="/lisaareitti">Lisää reitti</Link>
          {/* <Link style={padding} to="/muokkaareittia">Muokkaa reittiä</Link> */}
          {/* {user
            ? <em>{user} logged in</em>
            : <Link style={padding} to="/login">login</Link>
          } */}
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


// import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
// import {Link, useNavigate} from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'
// import { setNaytettavat } from '../features/reitit/reittiSlice'
// import LisaaReitti from '../pages/LisaaReitti';


// function Header() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth)
//   const { naytettavat } = useSelector((state) => state.reitit)
//   // let naytettavat = 'kaikki'

  
//   const onChange = (e) => {
//     // tähän täytyy laittaa jokin setStatea vastaava, mikä se sitten onkaan????
//     // ei saa suoraan sijoittaa constiin, nythän tää toimii
//     dispatch(setNaytettavat( e.target.value ))
//     console.log('näytettävät: ' + naytettavat)
//     // tuo valinta toimii
//     // tässä pitää laittaa tulostamaan näytölle vain naytettavat, mutta miten?
//     // dispatch(logout())
//     // dispatch(reset())
//     // navigate('/')
//   }


//   const onLogout = () => {
//     dispatch(logout())
//     dispatch(reset())
//     navigate('/')
//   }


//   const padding = {
//     padding: 8
//   }


//   // const reittiId='6369f30779ae3a342ad0b926'

//   return (
//     <header className='header'>
//       <div className='logo'>

//         <div>
//           <Link style={padding} to="/" naytettavat = {naytettavat}>Reitit</Link>
//           {/* <Link style={padding} to="/reitti/6369f30779ae3a342ad0b926">Reitti</Link> */}
//           {/* <Link style={padding} to={`/reitti/${reittiId}`}>Reitti</Link> */}
//           {/* // <Link to={`/notes/${note.id}`}>{note.content}</Link> */}
//           <Link style={padding} to="/lisaareitti">Lisää reitti</Link>
//           {/* <Link style={padding} to="/muokkaareittia">Muokkaa reittiä</Link> */}
//           {/* {user
//             ? <em>{user} logged in</em>
//             : <Link style={padding} to="/login">login</Link>
//           } */}
//         </div>

//       </div>
//       <form onChange={onChange}>
//         <label htmlFor="naytettavat">Valitse näytettävät reitit: </label>
//         <select id="naytettavat" name="naytettavat">
//           <option value="kaikki">Kaikki reitit</option>
//           <option value="melonta">Melontareitit</option>
//           <option value="pyoraily">Pyöräilyreitit</option>
//           <option value="vaellus">Vaellusreitit</option>
//         </select>
//       </form>
//       <ul>
//         {user ? (
//             <li>
//               <button className='btn' onClick={onLogout}>
//                 <FaSignOutAlt /> Kirjaudu ulos
//               </button>
//             </li>) : (
//           <>
//             <li>
//               <Link to='/login'>
//                 <FaSignInAlt /> Kirjaudu
//               </Link>
//             </li>
//             <li>
//               <Link to='/register'>
//                 <FaUser /> Rekisteröidy käyttäjäksi
//               </Link>
//             </li>
//           </>
//         )}

//       </ul>
//     </header>
//   )
// }

// export default Header

