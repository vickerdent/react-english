import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import service from './appwrite/config'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) dispatch(login({userData}));
      else dispatch(logout());
    })
    .finally(() => setLoading(false))
  })

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <div className='w-full block'>
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap">
      <h1>Loading...</h1>
    </div>
  )
}

export default App
