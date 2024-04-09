import { useState } from 'react'
import './App.css'

function App() {
  const [colour, setColour] = useState("olive")

  // function changeColour(colour) {
  //   setColour(colour)
  // }

  return (
    <div className='w-full h-screen duration-500 ' style={{backgroundColor: colour}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          {/* Can't pass in a direct function. Need to encapsulate needed function in another function */}
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("red")}}
          style={{backgroundColor: "red"}}>
            Red
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("orange")}}
          style={{backgroundColor: "orange"}}>
            Orange
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("yellow")}}
          style={{backgroundColor: "yellow"}}>
            Yellow
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("green")}}
          style={{backgroundColor: "green"}}>
            Green
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("blue")}}
          style={{backgroundColor: "blue"}}>
            Blue
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("indigo")}}
          style={{backgroundColor: "indigo"}}>
            Indigo
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("violet")}}
          style={{backgroundColor: "violet"}}>
            Violet
          </button>
          <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
          onClick={() => {setColour("olive")}}
          style={{backgroundColor: "olive"}}>
            Default
          </button>
        </div>
      </div> 
    </div>
  )
}

export default App
