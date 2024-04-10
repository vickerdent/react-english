import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("RUB")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyData = useCurrencyInfo(from)
  const options = Object.keys(currencyData)

  const swap = () => {
    console.log(amount);
    console.log(convertedAmount);
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    console.log(amount);
    console.log(convertedAmount);
  }

  const convert = () => {
    setConvertedAmount(Number(amount * currencyData[to]).toFixed(2))
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
    style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg)'}}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className='w-full mb-1'>
              <InputBox label={"From"} amount={amount} currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)} onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}/>
            </div>
            <div className='relative w-full h-0.5'>
              <button onClick={swap}
              className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'>
                Swap
              </button>
            </div>
            <div className='w-full mb-1'>
              <InputBox label={"To"} amount={convertedAmount} currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)} onAmountChange={(amount) => setConvertedAmount(amount)}
              selectedCurrency={to} amountDisabled/>
            </div>
            <button className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg' type='submit'>Convert {from} to {to}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
