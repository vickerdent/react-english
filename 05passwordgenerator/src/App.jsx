import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const changeNum = (e) => {
    setNumAllowed(e.target.checked)
  }

  const changeChar = (e) => {
    setCharAllowed(e.target.checked)
  }

  const passwordRef = useRef()
  
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+[],."

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed])

  // To implement a function both at startup, and whenever any related variable changes
  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} placeholder='Password' readOnly
          className='outline-none w-full py-1 px-3' ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} 
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name="theLength" id="theLength" 
            />
            <label htmlFor="theLength">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="theNum" id=""
            defaultChecked={numAllowed}
            onChange={changeNum}/>
            <label htmlFor="theNum">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="theChar" id=""
            defaultChecked={charAllowed}
            onChange={changeChar}/>
            <label htmlFor="theChar">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
