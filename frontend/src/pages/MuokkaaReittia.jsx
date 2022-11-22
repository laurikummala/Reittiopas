import { useNavigate, useParams } from 'react-router-dom'

function MuokkaaReittia() {
  const id = useParams().id

  return (
    <>
      <fieldset>
        <section>
          <br></br>
          <p>Muokkaa reittiä: {id}</p>
        </section>
      </fieldset>
    </>
  )
}

export default MuokkaaReittia

