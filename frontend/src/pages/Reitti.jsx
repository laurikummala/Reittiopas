import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { haeReitit, reset } from '../features/reitit/reittiSlice'
import Spinner  from '../components/Spinner'


function Reitti() {

  const [arvo, setArvo] = useState({luku: null})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  const { reitit, isLoading, isError, message} = useSelector((state) => state.reitit)

  const id = useParams().id

  useEffect(() => {
    if(isError) {
       console.log(message);
    }

  dispatch(haeReitit())
  console.log(reitit)
  console.log(id)

  const kokeilu = reitit.find(n => n._id === id)
  console.log(kokeilu)
  console.log(kokeilu.nimi)
  setArvo({...arvo, luku: kokeilu})
  console.log(arvo.luku.nimi)

  return () => {
    dispatch(reset())
  }

  }, [user, navigate])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3>{arvo.luku.nimi}</h3>
      <p>Kuvaus: {arvo.luku.kuvaus}</p>
      <p>Pituus: {arvo.luku.pituus} km</p>
    </div>
    )
}

export default Reitti
