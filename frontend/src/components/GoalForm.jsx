import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('Kirjoita tavoitteesi')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    dispatch(createGoal({text}))
    setText('Kirjoita tavoitteesi')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="text">Tavoite</label>
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
              Lisää tavoite
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm