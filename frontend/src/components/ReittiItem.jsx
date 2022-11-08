import { useDispatch } from 'react-redux'
import { deleteReitti } from '../features/reitit/reittiSlice'

function ReittiItem({ reitti }) {
  const dispatch = useDispatch()

  return (
    <div className="reitti">
      <div>{new Date(reitti.createdAt).toLocaleString('en-US')}</div>
      <h2>{reitti.text}</h2>
      <button onClick={() => dispatch(deleteReitti(reitti._id))} className="close">
        X
      </button>
    </div>
  )
}

export default ReittiItem



// import {useDispatch} from 'react-redux'
// import {deleteReitti} from '../features/reitit/reittiSlice'

// function ReittiItem({reitti}) {
//     const dispatch = useDispatch()

//   return (
//     <div className="reitti">
//         <div>
//             {new Date(reitti.createdAt).toLocaleString          //time formatting
//             ('en-US')}                      
//         </div>
//         <h2>{reitti.text}</h2>
//         <button onClick={() => dispatch(deleteReitti(reitti._id))} className="close">X</button>
//     </div>
//   )
// }

// export default ReittiItem