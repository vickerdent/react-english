import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'


function MovieCard({$id, movie_title, featured_image, movie_year}) {
  return (
    <Link to={`/movie/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featured_image)} alt={movie_title} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>{movie_title}</h2>
            <p className='justify-center w-full mt-1'>{movie_year}</p>
        </div>
    </Link>
  )
}

export default MovieCard