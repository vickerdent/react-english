import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import Container from '../components/container/container'
import MovieCard from '../components/movieCard'
import { Link } from 'react-router-dom'

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    service.getMovies().then((movies) => {
      if (movies) {
        setMovies(movies.documents)
      }
    })
  }, [])

  if (movies.length === 0) {
    return(
      <div className='w-full py-8'>
        <Container>
          <div className="flex flex-wrap">
            <h1>No Movies to see here. Add one to see 'em</h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {movies.map((movie) => (
            <div className="p-2 w-1/4" key={movie.$id}>
                <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home