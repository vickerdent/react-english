import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  let newArr = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <h1 className='text-3xl bg-green-400 p-3 rounded-md'>Vite with Tailwind</h1>
      <Card username="vickerdent" post="Chairman" imag='https://miro.medium.com/v2/resize:fit:720/format:webp/1*FuiVXC4rijxdn_yB2F87Hw.png'/>
      <Card username='Jason' post='Staff Engr.' myArr={newArr}/>
      <Card />
    </>
  )
}

export default App
