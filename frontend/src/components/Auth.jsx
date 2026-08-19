import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'

const Auth = ({ setOpenAuth }) => {
    const [authMode, setAuthMode] = useState('login')

    const{isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

    const [login,setLogin] = useState({
        "username":'',
        "password":''
    })

    const handleLogin=(e)=>{
        const {name,value} = e.target
        setLogin({...login,[name]:value})
    }

    const submitLogin=async(e)=>{
        e.preventDefault()
        try{
            const response = await api.post('login/',login)
            console.log(response.data);

            localStorage.setItem('accessToken',response.data.access)
            localStorage.setItem('refreshToken',response.data.refresh)
            setIsLoggedIn(true)
            setOpenAuth(false)
        
        }catch(error){
            console.error(error.response.data);
        }
    }


    const [register,setRegister] = useState({
        "username":'',
        "email":'',
        "password":''
    })

    const handleRegister=(e)=>{
        const{name,value} = e.target
        setRegister({...register,[name]:value})
    }

    const submitRegister=async(e)=>{
        e.preventDefault()
        try{
            const response = await api.post('users/',register)
            console.log(response.data);
        }catch(error){
            console.error(error.response.data);
        }
    }

    return (
        <>
            <div className=' fixed inset-0 z-10 flex min-h-screen items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
                <div className=' w-full max-w-md rounded-2xl border  border-[#292d38] bg-[#171a22]  shadow-2xl p-5 sm:p-6  '>

                    <div className=' flex items-center justify-between border-b border-[#292d38] pb-4'>
                        <div>
                            <p className=' text-xl font-bold'>Chat<span className=' text-indigo-300'>On</span></p>
                            <p className=' text-sm text-gray-500 mt-0.5'>Simple Private Connected</p>
                        </div>
                        <button onClick={() => { setOpenAuth(false) }} className="rounded-full p-2 text-gray-400 transition hover:bg-[#252a35] hover:text-white"><X size={20} /></button>
                    </div>

                    {
                        authMode === 'login' && (
                            <div className=' pt-6'>
                                <div className=' mb-6 text-center'>
                                    <h1 className=' font-bold text-2xl'>Welcome Back</h1>
                                    <p className=' text-gray-500 mt-1 text-sm'>Sign in to continue chatting</p>
                                </div>
                                <form onSubmit={submitLogin} className=' flex flex-col'>

                                    <label className=' mb-2 text-sm font-medium text-gray-300'>username</label>
                                    <input name='username' value={login.username} onChange={handleLogin} type="text" placeholder='Enter your username' className=' mb-4 rounded-xl border border-[#303642] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500 ' />

                                    <label className=' mb-2 text-sm font-medium text-gray-300'>password</label>
                                    <input name='password' value={login.password} onChange={handleLogin} type="password" placeholder='Enter your password' className=' mb-4 rounded-xl border border-[#303642] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500 ' />

                                    <button type='submit' className=' rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 active:scale-[0.98]'>Login</button>
                                </form>
                                <p className=' mt-5 text-center text-sm text-gray-500'>
                                    Don't have an account? <button onClick={() => { setAuthMode('register') }} className=' font-medium text-indigo-400 transition hover:text-indigo-300'>Sign up</button>
                                </p>
                            </div>

                        )
                    }

                    {
                        authMode === 'register' && (
                            <div className=' pt-6'>
                                <div className=' mb-6 text-center'>
                                    <h1 className=' font-bold text-2xl'>Create an account</h1>
                                    <p className=' text-gray-500 mt-1 text-sm'>Join ChatOn and start chatting</p>
                                </div>
                                <form onSubmit={submitRegister} className=' flex flex-col'>

                                    <label className=' mb-2 text-sm font-medium text-gray-300'>username</label>
                                    <input name='username' value={register.username} onChange={handleRegister} type="text" placeholder='Enter your username' className=' mb-4 rounded-xl border border-[#303642] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500 ' />

                                    <label className=' mb-2 text-sm font-medium text-gray-300'>email</label>
                                    <input name='email' value={register.email} onChange={handleRegister} type="email" placeholder='Enter your email' className=' mb-4 rounded-xl border border-[#303642] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500 ' />

                                    <label className=' mb-2 text-sm font-medium text-gray-300'>password</label>
                                    <input name='password' value={register.password} onChange={handleRegister} type="password   " placeholder='Enter your password' className=' mb-4 rounded-xl border border-[#303642] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500 ' />

                                    <button type='submit' className=' rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 active:scale-[0.98]'>Register</button>
                                </form>
                                <p className=' mt-5 text-center text-sm text-gray-500'>
                                    Already have an account? <button onClick={() => { setAuthMode('login') }} className=' font-medium text-indigo-400 transition hover:text-indigo-300'>Sign in</button>
                                </p>
                            </div>

                        )
                    }



                </div>


            </div>
        </>
    )
}

export default Auth