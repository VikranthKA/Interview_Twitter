import React from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { decrement, increment } from './redux/slices/counter'


const App = () => {
  const count = useAppSelector(state=>state.counter)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Count is : {count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
    </div>
  )
}

export default App
