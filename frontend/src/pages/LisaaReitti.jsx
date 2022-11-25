import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { luoReitti } from '../features/reitit/reittiSlice'
import Spinner from '../components/Spinner'


function LisaaReitti() {
  const [formData, setFormData] = useState({
    nimi: '',
    pituus: '',
    kuvaus: '',
    melonta: false, 
    pyoraily: false, 
    vaellus: false,
  })

  const { nimi, pituus, kuvaus, melonta, pyoraily, vaellus} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message} = useSelector
  (
    (state) => state.auth
  )

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
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
    dispatch(luoReitti(reittiData))
    toast.info('Uusi reitti lisätty!')
    navigate('/')   
  }


  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <fieldset>
      <section className="heading">
        <br></br>
        <p>Lisää reitti</p>
      </section>
        <br></br>
        <section className="form">
          <form onSubmit={onSubmit}>
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
            <p>Valitse mihin toimintaan reitti soveltuu:</p>
            <div>
              <input type="checkbox" id="melonta" name="melonta" value={melonta} onChange={onChangeChecked}></input>
              <label htmlFor="melonta"> melontaan</label><br></br>
              <input type="checkbox" id="pyoraily" name="pyoraily" value={pyoraily} onChange={onChangeChecked}></input>
              <label htmlFor="pyoraily"> pyöräilyyn</label><br></br>
              <input type="checkbox" id="vaellus" name="vaellus" value={vaellus} onChange={onChangeChecked}></input>
              <label htmlFor="vaellus"> vaellukseen</label><br></br><br></br>
            </div>
            <div className="form-group">
              <button 
                type='submit' 
                className='btn btn-block'>
                  Lisää reitti
              </button>  
            </div>
          </form>
        </section>
      </fieldset>
    </>
  )
}

export default LisaaReitti






