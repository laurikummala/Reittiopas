import Reitti from "../pages/Reitti"
import Comments from '../comments/Comments'

function ReittiComponent() {
  
   const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <Reitti />
      <Comments currentUserId={user._id} />
    </div>
  )
}

export default ReittiComponent
