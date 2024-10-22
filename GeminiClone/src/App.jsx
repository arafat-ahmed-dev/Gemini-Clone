import React from 'react'
import SideLayout from './Components/SideLayout'
import Main from './Components/Main'

const App = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-gray-800 text-white flex'>
      <SideLayout/>
      <Main/>
    </div>
    </>
  )
}

export default App