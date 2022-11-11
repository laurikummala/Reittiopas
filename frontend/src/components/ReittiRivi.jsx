import {Link} from 'react-router-dom'

function ReittiRivi({ reitti }) {

  return (
    <div className="reitti">
      <h2><Link to="/reittisivu"> {reitti.nimi}</Link></h2>
    </div>
  )
}

export default ReittiRivi