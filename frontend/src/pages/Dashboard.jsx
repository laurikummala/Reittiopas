import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReittiForm from '../components/ReittiForm'
import ReittiItem from '../components/ReittiItem'
//import Spinner from '../components/Spinner'
import { getReitit, reset } from '../features/reitit/reittiSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { reitit, isLoading, isError, message } = useSelector(
    (state) => state.reitit
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getReitit())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Reitit Dashboard</p>
      </section>

      <ReittiForm />

      <section className='content'>
        {reitit.length > 0 ? (
          <div className='reitit'>
            {reitit.map((reitti) => (
              <ReittiItem key={reitti._id} reitti={reitti} />
            ))}
          </div>
        ) : (
          <h3>You have not set any reitit</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard



// import {useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import ReittiForm from '../components/ReittiForm'

// import {getReitit, reset} from '../features/reitit/reittiSlice'
// import ReittiItem from '../components/ReittiItem'

// function Dashboard() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {user} = useSelector((state) => state.auth)
//   const {reitit, isLoading, isError, message} = useSelector((state) => state.reitit)

//   useEffect(()=> {
//     if(isError) {
//       console.log(message);
//     }

//     if(!user){
//       navigate('/login')
//     }

//     dispatch(getReitit())

//     return () => {
//       dispatch(reset())
//     }
//   }, [user, navigate, isError, message, dispatch])


//   return <>
//     <section className='heading'>
//       <h1>Welcome {user && user.name}</h1>
//       <p>Goals Dashboard</p>
//     </section>
//     <ReittiForm />

//     <section className='content'>
//       {reitit.length > 0 ? (
//         <div className="reitit">
//           {reitit.map((reitti) => (
//             <ReittiItem key={reitti._id} reitti={reitti} />
//           ))}
//         </div>
//       ) : (<h3>You have not set any goals</h3>)}
//     </section>
//     </>
// }

// export default Dashboard