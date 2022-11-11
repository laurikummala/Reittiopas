import { useEffect } from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReittiRivi from '../components/ReittiRivi'
import Spinner from '../components/Spinner'
import { haeReitit, reset } from '../features/reitit/reittiSlice'

function Reitit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { reitit, isLoading, isError, message } = useSelector((state) => state.reitit)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(haeReitit())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, dispatch, isError, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h1>Tervetuloa sivuillemme {user && user.name}</h1>
        <p>Valitut reitit </p>
      </section>
      <section className="content">
        {reitit.length > 0 ? (
          <div className="reitti">
            {reitit.map((reitti) => (
              <ReittiRivi key={reitti._id} reitti={reitti} />
            ))}
            <Link to="/lisaareitti">
              <button
                type='btn'
                className='btn btn-block'>
                <FaPlusSquare />Lisää reitti
              </button>
            </Link>
          </div>

        ) : (
          <h3>Ei ole reittejä!</h3>
        )}
      </section>
    </>
  )
}

export default Reitit
