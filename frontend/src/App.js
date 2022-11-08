import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles.css'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App


// import './App.css';
// //import Navbar from './Navbar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import './styles.css'



// function App() {
//   return (
//     <>
//     <Router>
//       <div className="container" >
//         <Header />
//         <Routes>
//           <Route path='/' element={<Dashboard />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//         </Routes>
//     </div>
//     </Router>
//     <ToastContainer />
//     </>
    
//   )
// }

//  /* //<Navbar />
//       <header className="App-header">
//         <p>
//           Reittiopas by eräjormat.
//         </p>
//       </header> */

// export default App;
