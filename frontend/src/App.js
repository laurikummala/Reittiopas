import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Reitit from './pages/Reitit';
import Login from './pages/Login';
import Register from './pages/Register';
import ReittiSivu from './pages/ReittiSivu';
import LisaaReitti from './pages/LisaaReitti';

function App() {
  return (
    <>

      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/lisaareitti' element={<LisaaReitti />} />
            <Route path='/reittisivu' element={<ReittiSivu />} />
            <Route path='/' element={<Reitit />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
