import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import authService from '../appwrite/auth'
import Button from '../components/button'
import Container from '../components/container/container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'

function Movie() {
  const [movie, setMovie] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = movie && userData ? movie.userId === userData.$id : false

  useEffect(() => {
    service.getMovie(slug).then((movie) => {
      if (movie) {
        setMovie(movie)
      } else {
        navigate("/")
      }
    })
  }, [slug, navigate])

  const deleteMovie = () => {
    service.deleteMovie(movie.$id).then((status) => {
      if (status) {
        service.deleteFile(movie.featuredImage)
        navigate("/")
      }
    })
  }

  return movie ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={service.getFilePreview(movie.featured_image)} alt={movie.movie_title} className='rounded-xl' />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-movie/${movie.$id}`}>
                <Button bgColor='bg-green-500' className='mr-3' >Edit</Button>
              </Link>
              <Button bgColor='bg-red-500' className='mr-3' onClick={deleteMovie}>Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl flex font-bold w-full justify-center">{movie.movie_title}</h1>
          <p className='w-full flex justify-center'>Director: {movie.movie_director}</p>
          <p>{movie.movie_year}</p>
          <div className="browser-css">
            {parse(movie.movie_plot)}
          </div>
          <br /> <br />
          <p className='w-full flex justify-center'><span className='font-bold'>Cast:</span>.  {movie.movie_cast}</p>
        </div>
      </Container>
    </div>
  ) : null
}

export default Movie