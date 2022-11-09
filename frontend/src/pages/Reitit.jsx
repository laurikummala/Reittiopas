import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReititForm from '../components/ReititForm'
import ReittiRivi from '../components/ReittiRivi'
import Spinner from '../components/Spinner'
import { haeReitit, reset } from '../features/reitit/reittiSlice'

function Reitit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { reitit, isLoading, isError, message} = useSelector((state) => state.reitit)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(haeReitit())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h2>Tervetuloa sivuillemme {user && user.name}</h2>
        <p>Valitut reitit</p>
        <ul>
          <li className="active">
            <a href="/kommentit"> Melonta 1</a>
          </li>
        </ul>
      </section>
      <ReititForm/>
      <section className="content">
        {reitit.length > 0 ? (
          <div className="reitit">
            {reitit.map((reitti) => (
              <ReittiRivi key={reitti._id} reitti ={reitti} />
            ))}
          </div>
          
        ) : (
          <h3>Ei ole reittejä!</h3>
        )}
      </section>
    </>
  )
}

export default Reitit
