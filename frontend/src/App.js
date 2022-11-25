import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Reitit from './pages/Reitit'
import Reitti from './pages/Reitti'
import Login from './pages/Login'
import Register from './pages/Register'
import LisaaReitti from './pages/LisaaReitti'
import MuokkaaReittia from './pages/MuokkaaReittia'

function App() {
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
            <Route path='/lisaareitti' element={<LisaaReitti />} />
            <Route path='/muokkaareittia/:id' element={<MuokkaaReittia />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
