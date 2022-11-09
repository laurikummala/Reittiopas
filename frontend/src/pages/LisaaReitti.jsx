import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { luoReitti } from '../features/reitit/reittiSlice'

function LisaaReitti() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    dispatch(luoReitti({text}))
    setText('Kirjoita teksti')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="text">Kirjoita reitin nimi:</label>
          <input 
            type='text' 
            name='text' 
            id= 'text'
            value= {text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn-block'
            type='submit'>
              Lisää reitti
          </button>
        </div>
      </form>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type='text' 
              className='form-control' 
              id='name' 
              name='name' 
              value={name} 
              placeholder='Anna nimesi' 
              onChange={onChange} 
            /> 
          </div>
          <div className="form-group">
            <input 
              type='email' 
              className='form-control' 
              id='email' 
              name='email' 
              value={email} 
              placeholder='Anna sähköpostiosoitteesi' 
              onChange={onChange} 
            /> 
          </div>
          <div className="form-group">
            <input 
              type='password' 
              className='form-control' 
              id='password' 
              name='password' 
              value={password} 
              placeholder='Anna salasana' 
              onChange={onChange} 
            /> 
          </div>
          <div className="form-group">
            <input 
              type='password2' 
              className='form-control' 
              id='password2' 
              name='password2' 
              value={password2} 
              placeholder='Toista salasana' 
              onChange={onChange} 
            />  
          </div>
          <div className="form-group">
            <button 
              type='submit' 
              className='btn btn-block'>
                Lähetä
            </button>  
          </div>
        </form>
    </section>
  )
}

export default LisaaReitti