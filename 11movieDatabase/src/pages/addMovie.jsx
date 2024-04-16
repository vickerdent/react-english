import React from 'react'
import Container from '../components/container/container'
import MovieForm from '../components/movie-form/movieForm'

function AddMovie() {
  return (
    <div className='py-6'>
      <Container>
        <MovieForm />
      </Container>
    </div>
  )
}

export default AddMovie