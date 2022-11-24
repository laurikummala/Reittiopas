// tähän lisätty reittityypit

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { FaUser } from 'react-icons/fa'
import { luoReitti, reset } from '../features/reitit/reittiSlice'
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

  const { nimi, pituus, kuvaus, melonta, pyoraily, vaellus } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector
    (
      (state) => state.auth
    )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // tämä aiheutti sen, ettei se näkynyt kuin hetken siinä näytöllä
    // if(isSuccess || user){
    //   navigate('/')
    // }

    // mitä tää tekeekään?????
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])


  // // kokeilin tätä jotenkin checkboxin kans, mutten saanut toimimaan
  // const isChecked = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }


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
    console.log('melonta=' + melonta + ', pyoraily=' + pyoraily + ', vaellus=' + vaellus)
    const reittiData = {
      nimi,
      pituus,
      kuvaus,
      melonta,
      pyoraily,
      vaellus,
    }
    dispatch(luoReitti(reittiData))
  }

  if (isLoading) {
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