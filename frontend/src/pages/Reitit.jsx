import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { haeKaikkiReitit, poistaReitti } from '../features/reitit/reittiSlice'


function Reitit() {
  const dispatch = useDispatch()  

  const {user} = useSelector((state) => state.auth)
  const { reitit, naytettavat, isLoading, isError, isSuccess, message} = useSelector((state) => state.reitit)

  //console.log('Reitit: '+ reitit.length)
  //console.log('näytettävät2: '+ naytettavat)

  const [naytettavatReitit, setNaytettavatReitit] = useState(reitit)

  useEffect(() => {

    dispatch(haeKaikkiReitit())

    // tässä katotaan onko reittejä ja onko saatu ladattua tietokannasta, tulostetaan naytettavan mukaan
    if(reitit.length > 0 && isSuccess){
      if(naytettavat === 'kaikki'){
        setNaytettavatReitit(reitit)
      }
      if(naytettavat === 'melonta'){
        let filtered = reitit.filter(reittiItem => reittiItem.reittityypit[0].melonta === true)
        setNaytettavatReitit(filtered)
      }
      if(naytettavat === 'pyoraily'){
        let filtered = reitit.filter(reittiItem => reittiItem.reittityypit[0].pyoraily === true)
        setNaytettavatReitit(filtered)
      }
      if(naytettavat === 'vaellus'){
        let filtered = reitit.filter(reittiItem => reittiItem.reittityypit[0].vaellus === true)
        setNaytettavatReitit(filtered)
      }
    }


    if(isError) {
      console.log(message);
    }

    return () => {
      //dispatch(reset())
    }

  }, [naytettavat, isSuccess])


  if(isLoading) {
    return <Spinner />
  }


  const poistaReittiButton = ({reittiItem}) => {
    // console.log(reitti.user)
    // console.log(user)
    if(user){
      if(reittiItem.user.toString() === user._id){
        return (
          <button onClick={() => dispatch(poistaReitti(reittiItem._id))} className="close">
            Poista reitti
          </button>
        )
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
    {naytettavatReitit.length > 0 ? (
          <ul>
            {naytettavatReitit
            .map(reittiItem =>
              <li key={reittiItem._id}>
                <Link to={`/reitit/${reittiItem._id}`} >{reittiItem.nimi}, _id:{reittiItem._id}, {reittiItem.pituus} km, ***</Link>
                {poistaReittiButton({reittiItem})}
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






// import { useEffect } from 'react'
// import { FaPlusSquare } from 'react-icons/fa'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import ReittiRivi from '../components/ReittiRivi'
// import Spinner from '../components/Spinner'
// import { haeReitit, reset } from '../features/reitit/reittiSlice'

// function Reitit() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { user } = useSelector((state) => state.auth)
//   const { reitit, isLoading, isError, message } = useSelector((state) => state.reitit)

//   useEffect(() => {
//     if (isError) {
//       console.log(message);
//     }

//     if (!user) {
//       navigate('/login')
//     }

//     dispatch(haeReitit())

//     return () => {
//       dispatch(reset())
//     }

//   }, [user, navigate, dispatch, isError, message])

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <>
//       <section>
//         <h1>Tervetuloa sivuillemme {user && user.name}</h1>
//         <p>Valitut reitit </p>
//       </section>
//       <section className="content">
//         {reitit.length > 0 ? (
//           <div className="reitti">
//             {reitit.map((reitti) => (
//               <ReittiRivi key={reitti._id} reitti={reitti} />
//             ))}
//             <Link to="/lisaareitti">
//               <button
//                 type='btn'
//                 className='btn btn-block'>
//                 <FaPlusSquare />Lisää reitti
//               </button>
//             </Link>
//           </div>

//         ) : (
//           <h3>Ei ole reittejä!</h3>
//         )}
//       </section>
//     </>
//   )
// }

// export default Reitit
