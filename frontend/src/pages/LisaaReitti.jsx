import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import { luoReitti } from '../features/reitit/reittiSlice'
import Spinner from '../components/Spinner'

function LisaaReitti() {
  const [formData, setFormData] = useState({
    nimi: '',
    pituus: '',
    kuvaus: '',
  })

  const { nimi, pituus, kuvaus } = formData

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

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const reittiData = {
      nimi,
      pituus,
      kuvaus
    }
    dispatch(luoReitti(reittiData))    
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <p>Lisää reitti</p>
      </section>
      <fieldset>
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
            <div className="form-group">
              <button 
                type='submit' 
                className='btn btn-block'>
                  Lisää reitti
              </button>  
            </div>
          </form>
        </section>
        <p>Valitse mihin toimintaan reitti soveltuu:</p>
        <form>
          <input type="checkbox" id="melonta" name="melonta" value="melonta"/>
          <label htmlFor="melonta"> melontaan</label><br></br>
          <input type="checkbox" id="pyoraily" name="pyoraily" value="pyoraily"></input>
          <label htmlFor="pyoraily"> pyöräilyyn</label><br></br>
          <input type="checkbox" id="vaellus" name="vaellus" value="vaellus"></input>
          <label htmlFor="vaellus"> vaellukseen</label><br></br><br></br>
        </form>

      </fieldset>
    </>
  )
}

export default LisaaReitti