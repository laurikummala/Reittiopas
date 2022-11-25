import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { haeReitit, haeReitti, poistaReitti, reset, setReittiOLio } from '../features/reitit/reittiSlice'
import Comments from '../comments/Comments'
// function Reitti({reitit}) {
function Reitti() {

  const id = useParams().id  

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { reitit, reittiOlio, isLoading, isError, message} = useSelector((state) => state.reitit)


  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
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


  const painike = ({reittiOlio, mitaTekee}) => {
    // console.log(reittiOlio.user)
    // console.log(user)
    if(user){
      // testataan onko kirjautunut käyttäjä luonut reitin ja saako siis muokata sitä
      // tai poistaa sen
      if(reittiOlio.user.toString() === user._id){
        if(mitaTekee === 'muokkaa'){
          return (
            <button onClick={() => navigate(`/muokkaareittia/${reittiOlio._id}`)}>
              Muokkaa reittiä
            </button>
          )
        }
        if(mitaTekee === 'poistaa'){
          return (
            <button onClick={() => dispatch(poistaReitti(reittiOlio._id))} className="close">
              Poista reitti
            </button>
          )
        }
      }
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>      
      <section>
        <h3>Tähän pitäs tulla reitin {id} tiedot</h3>
        {reittiOlio ? 
          <section>
            <p>{reittiOlio.nimi}</p>
            <p>pituus: {reittiOlio.pituus} km</p>
            <p>{reittiOlio.kuvaus}</p>
            <p>Reitti soveltuu  
              {reittiOlio.reittityypit[0].melonta ? ' melontaan' : ''}
              {reittiOlio.reittityypit[0].pyoraily ? ' pyöräilyyn' : ''}
              {reittiOlio.reittityypit[0].vaellus ? ' vaellukseen' : ''}
            </p>
            {painike({reittiOlio, mitaTekee: 'muokkaa'})}
            {painike({reittiOlio, mitaTekee: 'poistaa'})}
          </section>
          : <></>
        }
      </section>
      <div>
        <Comments  /> 
      </div>
    </>
  )
}

export default Reitti

//currentUserId={user._id}






// import { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { haeReitit, haeReitti, setReittiOlio, reset } from '../features/reitit/reittiSlice'
// import Spinner  from '../components/Spinner'


// function Reitti() {

//   //const [arvo, setArvo] = useState({luku: null})
//   //const [arvo, setArvo] = useState({})
//   // const [arvo, setArvo] = useState({
//   //   nimi: '',
//   //   pituus: '',
//   //   kuvaus: '',
//   //   melonta: false, 
//   //   pyoraily: false, 
//   //   vaellus: false,
//   // })

//   //const { reittiOlio } = arvo

//   const navigate = useNavigate()
//   const dispatch = useDispatch()
  
//   const {user} = useSelector((state) => state.auth)
//   const { reitit, reittiOlio, isSuccess, isLoading, isError, message} = useSelector((state) => state.reitit)

//   const id = useParams().id

//   useEffect(() => {
//     if(isError) {
//        console.log(message);
//     }

//     dispatch(haeReitti())
//     console.log(reitit)
//     console.log(id)

//     // const kokeilu = reitit.find(n => n._id === id)
//     // console.log(kokeilu)
//     // console.log(kokeilu.nimi)

//     // if(isSuccess){
//     //   dispatch(setReittiOlio({kokeilu}))
//     // }
//     //dispatch(setReittiOlio({kokeilu}))
//     //dispatch(setNaytettavat( e.target.value ))

//     //console.log(reittiOlio)
//     //console.log(arvo)
//     // setArvo({...arvo, luku: kokeilu})
//     // console.log(arvo.luku.nimi)

//     // return () => {
//     //   dispatch(reset())
//     // }

//   }, [isSuccess, navigate])

//   if(isLoading) {
//     return <Spinner />
//   }

//   return (
//     <div>
//       <p>Dummie</p>
//       {/* <h3>{arvo.luku.nimi}</h3>
//       <p>Kuvaus: {arvo.luku.kuvaus}</p>
//       <p>Pituus: {arvo.luku.pituus} km</p> */}
//     </div>
//     )
// }

// export default Reitti
