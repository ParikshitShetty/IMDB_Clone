import { useState } from 'react'
import Movies from './routes/Movies'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-screen min-h-screen bg-slate-950 text-white'>
        <Routes>
          <Route path='/' element={<Movies />}/>
          <Route path='/signin' element={<div>signin</div>}/>
          <Route path='/signup' element={<div>signup</div>}/>
          <Route path='/add' element={<div>add</div>}/>
          <Route path='*' element={<div>Not Found</div>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
