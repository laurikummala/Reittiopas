import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { luoReitti } from '../features/reitit/reittiSlice'

function ReititForm() {
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
        {/* <div className='form-group'>
          <label htmlFor="text">Kirjoita reitin nimi:</label>
          <input 
            type='text' 
            name='text' 
            id= 'text'
            value= {text}
            onChange={(e) => setText(e.target.value)}
          />
        </div> */}
        <div className='form-group'>
          <button className='btn-block'
            type='submit'>
              Lisää reitti
          </button>
        </div>
      </form>
    </section>
  )
}

export default ReititForm