import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import Button from './button'
import Input from './input'
import Logo from './logo'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const loginUser = async (data) => {
        try {
            const userData = await authService.login(data)

            if (userData) {
                const currUser = await authService.getCurrentUser()
                if (currUser) dispatch(login({currUser}))
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Log in to Movies Database</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(loginUser)} className="mt-8">
                        <div className="space-y-5">
                            <Input
                                {...register("email", {
                                    required: true,
                                })}
                                label="Email : "
                                placeholder="Email Address"
                                type="email"
                            />
                            <Input
                                {...register("password", { required: true })}
                                label="Password : "
                                type="password"
                                placeholder="Password"
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
      )
}

export default Login