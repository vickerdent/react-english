import React from 'react'
import Container from '../container/container'
import Logo from '../logo'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './logoutBtn'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home", slug: "/", active: true
        },
        {
            name: "Login", slug: "/login", active: !authStatus
        },
        {
            name: "Signup", slug: "/signup", active: !authStatus
        },
        {
            name: "All Movies", slug: "/all-movies", active: authStatus
        },
        {
            name: "Add A Movie", slug: "/add-movie", active: authStatus
        },
    ]

  return (
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to="/">
                        <Logo width="100px"/>
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {
                        // Never use for each oh. Just use map
                        navItems.map((item) => item.active ? (
                            <li key={item.name}>
                                <button onClick={() => navigate(item.slug)} 
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {item.name}
                                </button>
                            </li>
                        ) : null)
                    }
                    {/* If authStatus (user is logged in) is true, render logout button */}
                    {
                        authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )
                    }
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header