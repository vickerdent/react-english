import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Button from '../button'
import Input from '../input'
import TinyEditor from '../tinyEditor'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import Select from '../select'

export default function MovieForm({movie}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            movie_title: movie?.movie_title || "",
            slug: movie?.slug || "",
            movie_director: movie?.movie_director || "",
            movie_plot: movie?.movie_plot || "",
            movie_cast: movie?.movie_cast || "",
            movie_year: movie?.movie_year || "",  
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
        if (movie) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                await service.deleteFile(movie.featured_image)
            }

            const updateOperation  = await service.updateMovie(movie.$id, {
                ...data,
            featured_image: file ? file.$id : undefined})

            if (updateOperation) {
                navigate(`/post/${updateOperation.$id}`)
            }
        } else {
            // It's not update, but add
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featured_image = fileId

                const addOperation = await service.addMovie({...data, userId: userData.$id})

                if (addOperation) {
                    navigate(`/post/${addOperation.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "_").replace(" ", "_")
        }
    }, [])

    useEffect(() => {
        watch((value, {name}) => {
            if (name === "movie_title") {
                setValue("slug", slugTransform(value.movie_title), {shouldValidate: true})
            }
        })
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input label="Movie Title" placeholder="Aki and Pawpaw" 
                className="mb-4" {...register("movie_title", {required: true})}/>
                <Input label="Slug :" placeholder="aki_and_pawpaw" 
                className="mb-4" {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}/>
                <Input label="Movie Director" placeholder="Christopher Nolan" 
                className="mb-4" {...register("movie_director", {required: true})}/>
                <TinyEditor label={"Movie Plot"} name="movie_plot" control={control} defaultValue={getValues("movie_plot")} />
                <Input label="Movie Cast" placeholder="Chinedu Ikedieze, Osita Iheme..." 
                className="mb-4" {...register("movie_cast", {required: false})}/>
                <Input label="Year of Release" placeholder="2021" 
                className="mb-4" {...register("movie_year", {required: true})}/>
            </div>
            <div className='1/3 px-2'>
                <Input label="Featured Image" type="file" className="mb-4" 
                accept="image/png, image/jpg, image/jpeg, image/heif" 
                {...register("image", {required: !movie})} />
                {movie && (
                    <div className='w-full mb-4'>
                        <img src={service.getFilePreview(movie.featured_image)} alt={movie.movie_title} 
                        className='rounded-lg'/>
                    </div>
                )}
                {/* <Select
                options={["active", "inactive"]} label="Status" className="mb-4"
                {...register("status", {required: true})} /> */}
                <Button type='submit' bgColor={movie ? "bg-green-400" : undefined} className='w-full'>
                    {movie ? "Update Movie" : "Add Movie"}
                </Button>
            </div>
        </form>
    )
}