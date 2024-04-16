import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Protected from './components/authLayout.jsx'
import Signup from './pages/signup.jsx'
import AllMovies from './pages/allMovies.jsx'
import AddMovie from './pages/addMovie.jsx'
import EditMovie from './pages/editMovie.jsx'
import Movie from './pages/movie.jsx'

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      {
        path: "/", element: <Home />,
      },
      {
        path: "/login", element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup", element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/all-movies", element: (
          <Protected authentication>
            < AllMovies/>
          </Protected>
        )
      },
      {
        path: "/add-movie", element: (
          <Protected authentication>
            <AddMovie />
          </Protected>
        )
      },
      {
        path: "/edit-movie/:slug", element: (
          <Protected authentication>
            <EditMovie />
          </Protected>
        )
      },
      {
        path: "/movie/:slug", element: (
          <Protected authentication>
            <Movie />
          </Protected>
        )
      }
    ]
  },
  {
    path: "*", element: (
      <Protected authentication={false}>
        <div>Not Found</div>
      </Protected>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
