import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { haeReitti, paivitaReitti } from '../features/reitit/reittiSlice'
import Spinner from '../components/Spinner'


function MuokkaaReittia() {
  const id = useParams().id
  const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const { reittiOlio } = useSelector((state) => state.reitit)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    nimi: reittiOlio.nimi,
    pituus: reittiOlio.pituus,
    kuvaus: reittiOlio.kuvaus,
    melonta: reittiOlio.reittityypit[0].melonta, 
    pyoraily: reittiOlio.reittityypit[0].pyoraily, 
    vaellus: reittiOlio.reittityypit[0].vaellus
  })
  
  const { nimi, pituus, kuvaus, melonta, pyoraily, vaellus} = formData

  console.log('reitinmuokkaus')
  // parametrina ei tule muita kuin id
  console.log(useParams())

  useEffect(() => {
    // tässä pitäs oikeasti tutkia että jos et ole luonut tätä reittiä, et voi sitä muokatakaan
    // toisaalta tänne ei ole voinut päästä, jossei ole luonut tätä reittiä, koska muokkaa 
    // nappia ei näy jossei ole luonut
    if (!user) {
      toast.error('Et voi muokata reittiä, jos et ensin kirjaudu sisään!')
      navigate('/login')
    }
    if(isError) {
      toast.error(message)
    }

    dispatch(haeReitti(id))

    setFormData((prevState) => ({
      nimi: reittiOlio.nimi,
      pituus: reittiOlio.pituus,
      kuvaus: reittiOlio.kuvaus,
      melonta: reittiOlio.reittityypit[0].melonta,
      pyoraily: reittiOlio.reittityypit[0].pyoraily,
      vaellus: reittiOlio.reittityypit[0].vaellus
    }))

  }, [])


  // useEffect(() => {
  //   if (!user) {
  //     alert('Et voi muokata reittiä, jos et ensin kirjaudu sisään!')
  //     navigate('/login')
  //   }
  //   if(isError) {
  //     toast.error(message)
  //   }

  //   // tämä aiheutti sen, ettei se näkynyt kuin hetken siinä näytöllä
  //   // if(isSuccess || user){
  //   //   navigate('/')
  //   // }

  //   // onko tää tarpeellinen tässä
  //   //dispatch(reset())

  //   //dispatch(haeReitit)
  //   dispatch(haeReitti(id))

  // }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onChangeChecked = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()
    console.log('melonta='+ melonta +', pyoraily='+ pyoraily +', vaellus='+ vaellus)
    
    const reittiData = {
      nimi,
      pituus,
      kuvaus,
      melonta,
      pyoraily,
      vaellus,
    }
    console.log(id, reittiData )

    // reittiDatassa vaikuttaa olevan kaikki tarvittava tieto kohillaan...
    // kumpi oikein? ei kumpikaan toimi

    // dispatch(paivitaReitti(reittiOlio._id, reittiData))
    // dispatch(paivitaReitti(id, reittiData))
    dispatch(paivitaReitti(reittiData))

    //toastit ei toimi??? tai välillä toimii?
    //toast.error("nyt on dispätsätty")  
  }


  if(isLoading) {
    return <Spinner />
  }


  return (
    <> 
      <fieldset>
      <section className="heading">
        <br></br>
        <p>Muokkaa reittiä</p>
      </section>
        <br></br>
        <section className="form">
          <form onSubmit={onSubmit}>
            <p>Reitin nimi</p>
            <div className="form-group">
              <input 
                type='text' 
                className='form-control' 
                id='nimi' 
                name='nimi' 
                value={nimi} 
                placeholder='Anna reitille nimi:' 
                onChange={onChange} 
              /> 
            </div>
            <p>Reitin pituus</p>
            <div className="form-group">
              <input 
                type='number' 
                className='form-control' 
                id='pituus' 
                name='pituus' 
                value={pituus} 
                placeholder='Anna reitin pituus kilometreinä:' 
                onChange={onChange} 
              /> 
            </div>
            <p>Reitin kuvaus</p>
            <div className="form-group">
              <input 
                type='text' 
                className='form-control' 
                id='kuvaus' 
                name='kuvaus' 
                value={kuvaus} 
                placeholder='Kuvaa reittiä:' 
                onChange={onChange} 
              /> 
            </div>
            <p>Reitti soveltuvuus: </p>
            <div>
              {/* {if(melonta === true)} */}
              {melonta ? (
                  <input type="checkbox" id="melonta" name="melonta" value={melonta} onChange={onChangeChecked} checked ></input>
                ) : (
                  <input type="checkbox" id="melonta" name="melonta" value={melonta} onChange={onChangeChecked}></input>
                )
              }
              <label htmlFor="melonta"> melontaan </label><br></br>
              {pyoraily ? (
                  <input type="checkbox" id="pyoraily" name="pyoraily" value={pyoraily} onChange={onChangeChecked} checked ></input>
                ) : (
                  <input type="checkbox" id="pyoraily" name="pyoraily" value={pyoraily} onChange={onChangeChecked}></input>
                )
              }
              <label htmlFor="pyoraily"> pyöräilyyn </label><br></br>
              {vaellus ? (
                  <input type="checkbox" id="vaellus" name="vaellus" value={vaellus} onChange={onChangeChecked} checked ></input>
                ) : (
                  <input type="checkbox" id="vaellus" name="vaellus" value={vaellus} onChange={onChangeChecked}></input>
                )
              }              
              <label htmlFor="vaellus"> vaellukseen </label><br></br><br></br>
            </div>
            <div className="form-group">
              <button 
                type='submit' 
                className='btn btn-block'>
                  Päivitä reitin tiedot
              </button>  
            </div>
          </form>
        </section>
      </fieldset>
    </>
  )
}

export default MuokkaaReittia

