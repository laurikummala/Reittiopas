import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Reitit from './pages/Reitit'
import Reitti from './pages/Reitti'
import Login from './pages/Login'
import Register from './pages/Register'
import ReittiSivu from './pages/ReittiSivu'
import LisaaReitti from './pages/LisaaReitti'
import { haeReitit } from './features/reitit/reittiSlice'

function App() {
  // const {user} = useSelector((state) => state.auth)
  // const { reitit, naytettavat, isLoading, isError, message} = useSelector((state) => state.reitit)

  // const dispatch = useDispatch()
  // dispatch(haeReitit())
  // console.log(reitit)
  // console.log(naytettavat)
  // console.log('user:' + user.name)

  // useEffect(() => {
  //   dispatch(haeReitit())
  // }, [dispatch])

  //console.log(reitit)

  return (
    <>

      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Reitit />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reitit/:id' element={<Reitti />} />
            {/* <Route path='/reitit/:id' element={<Reitti reitit={reitit} />} /> */}
            <Route path='/lisaareitti' element={<LisaaReitti />} />
            {/* <Route path='/muokkaareittia/:id' element={<MuokkaaReittia reitti={reitti} />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
