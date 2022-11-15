import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReittiRivi from '../components/ReittiRivi'
import Spinner from '../components/Spinner'
import { haeReitti, reset } from '../features/reitit/reittiSlice'

// function Reitti({reitit}) {
function Reitti() {

  const id = useParams().id
  

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { reitit, reittiId, isLoading, isError, message} = useSelector((state) => state.reitit)

  console.log(reittiId)

  // tässänäin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const reitti = reitit.find(n => n.id === Number(id))
  
  console.log(reitti)
  console.log(id)

  // useEffect(() => {
  //   if(isError) {
  //     console.log(message);
  //   }

  //   if(!user) {
  //     navigate('/login')
  //   }

  //   dispatch(haeReitti(reittiId))

  //   return () => {
  //     dispatch(reset())

  //   }

  // }, [user, navigate])

  // if(isLoading) {
  //   return <Spinner />
  // }

  return (
    <>      
      <section>
      <h3>Tähän pitäs tulla reitin tiedot</h3>
      {/* <h3>{reitti._id}</h3> */}
      <div>
        {/* <h2>{reitti.nimi}</h2>
        <div>{reitti.kuvaus}</div> */}
        {/* <div><strong>{reitti.pituus ? 'tärkeä' : ''}</strong></div> */}
      </div>
      {/* <button onClick={() => navigate("/lisaaReitti")}>Lisää reitti</button> */}
        {/* <h2>Tervetuloa sivuillemme {user && user.name}</h2>
        <p>Valittu reitti</p> */}
      </section>
      {/* <ReititForm/> */}
      {/* <section className="content">
        {reitit.length > 0 ? (
          <div className="reitti">
            {reitit.map((reitti) => (
              <ReittiRivi key={reitti._id} reitti ={reitti} user = {user} />
            ))}
          </div>
        ) : (
          <h3>Ei ole reittiä</h3>
        )}
      </section> */}
    </>
  )
}

export default Reitti