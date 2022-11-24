import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { haeReitit, poistaReitti, reset } from '../features/reitit/reittiSlice'


function Reitit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { reitit, naytettavat, isLoading, isError, message } = useSelector((state) => state.reitit)

  console.log('Reitit: ' + reitit.length)
  console.log('näytettävät2: ' + naytettavat)

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

  }, [user, navigate])

  if (isLoading) {
    return <Spinner />
  }


  const poistaReittiButton = ({ reitti }) => {
    // console.log(reitti.user)
    // console.log(user)
    if (reitti.user.toString() === user._id) {
      return (
        <button onClick={() => dispatch(poistaReitti(reitti._id))} className="close">
          Poista reitti
        </button>
      )
    }
  }

  function reittifilter(reitti) {
    //console.log("reittifilterkutsuttu")   
    if (naytettavat === 'kaikki') {
      return reitti;
    }
    if (reitti.reittityypit.length > 0) {
      if (reitti.reittityypit[0].melonta === true && naytettavat === 'melonta') {
        return reitti;
      }
      if (reitti.reittityypit[0].vaellus === true && naytettavat === 'vaellus') {
        return reitti;
      }
      if (reitti.reittityypit[0].pyoraily === true && naytettavat === 'pyoraily') {
        return reitti;
      }
    }

  }

  return (
    <>
      <section>
        <div>
          {
            naytettavat === 'kaikki' && <h2>Kaikki reitit</h2>
          }
          {
            naytettavat === 'melonta' && <h2>Melontareitit</h2>
          }
          {
            naytettavat === 'pyoraily' && <h2>Pyöräilyreitit</h2>
          }
          {
            naytettavat === 'vaellus' && <h2>Vaellusreitit</h2>
          }
        </div>
      </section>
      <div>
        {reitit.length > 0 ? (
          <ul>
            {reitit
              .filter(reittifilter)
              .map(reitti =>
                <li key={reitti._id}>
                  <Link to={`/reitit/${reitti._id}`} >{reitti.nimi}, {reitti.pituus} km, ***</Link>
                  {poistaReittiButton({ reitti })}
                  {/* {setReittiId(reitti._id)} */}
                </li>
              )}
          </ul>
        ) : (
          <h3>Ei ole reittejä!</h3>
        )}
      </div>
    </>
  )
}

export default Reitit