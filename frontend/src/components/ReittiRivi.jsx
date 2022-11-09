import { useDispatch } from 'react-redux'
import { poistaReitti } from '../features/reitit/reittiSlice'

function ReittiRivi({ reitti }) {
  const dispatch = useDispatch()

  return (
    <div className="reitti">
      <div>
        {new Date(reitti.createdAt).toLocaleString('fi-FI')}
      </div>
      <h2>{reitti.nimi}</h2>
      <h3>{reitti.pituus}</h3>
      <h4>{reitti.kuvaus}</h4>
      <button onClick={() => dispatch(poistaReitti(reitti._id))} className="close">
        Poista Reitti
      </button>
    </div>
  )
}

export default ReittiRivi