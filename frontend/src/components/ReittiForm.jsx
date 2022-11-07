import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createReitti } from '../features/reitit/reittiSlice'

function ReittiForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Reitti</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Lisää reitti
          </button>
        </div>
      </form>
    </section>
  )
}

export default ReittiForm



// import {useState} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {createReitti} from '../features/reitit/reittiSlice'

// function ReittiForm() {

//     const [text, setText] = useState('')

//     const dispatch = useDispatch()

//     const onSubmit = e => {
//         e.preventDefault()

//         dispatch(createReitti({text}))
//         setText('')
//     }


//   return <section className='form'>
//     <form onSubmit={onSubmit}>
//         <div className='form-group'>
//             <label htmlFor='text'>Reitti</label>
//             <input type="text" 
//             name='text' 
//             id='text' 
//             value={text} 
//             onChange={(e) => setText(e.target.value)}/>

//         </div>
//         <div className='form-group'>
//             <button className='btn btn-block'
//             type='submit'>
//                 Add Goal
//             </button>
//         </div>
//     </form>
//   </section>
// }

// export default ReittiForm