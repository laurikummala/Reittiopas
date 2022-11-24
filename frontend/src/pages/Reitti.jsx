import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { haeReitit, haeReitti, poistaReitti, reset, setReittiOLio } from '../features/reitit/reittiSlice'

// function Reitti({reitit}) {
function Reitti() {

  const id = useParams().id

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { reitit, reittiOlio, isLoading, isError, message } = useSelector((state) => state.reitit)


  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      toast.error('Reitin tarkempia tietoja ei näytetä, jos et ensin kirjaudu sisään!')
      navigate('/login')
    }

    //dispatch(haeReitit)
    // haetaan vaan yksi reitti, joka tallentuu reittiOlio nimellä state.reitit
    dispatch(haeReitti(id))

    return () => {
      //dispatch(reset())
    }

  }, [user, navigate])


  const painike = ({ reittiOlio, mitaTekee }) => {
    // console.log(reittiOlio.user)
    // console.log(user)
    if (user) {
      // testataan onko kirjautunut käyttäjä luonut reitin ja saako siis muokata sitä
      // tai poistaa sen
      if (reittiOlio.user.toString() === user._id) {
        if (mitaTekee === 'muokkaa') {
          return (
            <button onClick={() => navigate(`/muokkaareittia/${reittiOlio._id}`)}>
              Muokkaa reittiä
            </button>
          )
        }
        if (mitaTekee === 'poistaa') {
          return (
            <button onClick={() => dispatch(poistaReitti(reittiOlio._id))} className="close">
              Poista reitti
            </button>
          )
        }
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h3>Tähän pitäs tulla reitin {id} tiedot</h3>
        {reittiOlio ?
          <section>
            <p>Reitin nimi: {reittiOlio.nimi}</p>
            <p>Pituus: {reittiOlio.pituus} km</p>
            <p>Kuvaus: {reittiOlio.kuvaus}</p>
            <p>Reitti soveltuu:
              {reittiOlio.reittityypit[0].melonta ? ' melontaan' : ''}
              {reittiOlio.reittityypit[0].pyoraily ? ' pyöräilyyn' : ''}
              {reittiOlio.reittityypit[0].vaellus ? ' vaellukseen' : ''}
            </p>
            {painike({ reittiOlio, mitaTekee: 'muokkaa' })}
            {painike({ reittiOlio, mitaTekee: 'poistaa' })}
          </section>
          : <></>
        }
      </section>
    </>
  )
}

export default Reitti


