import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import Container from '../components/container/container'
import MovieForm from '../components/movie-form/movieForm'


function EditMovie() {
  const [movie, setMovie] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getMovie(slug).then((movie) => {
        if (movie) {
          setMovie(movie)
        } else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className='py-6'>
      <Container>
        <MovieForm movie={movie} />
      </Container>
    </div>
  )
}

export default EditMovie