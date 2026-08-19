import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from './Auth'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

const Navbar = () => {
  const [openAuth,setOpenAuth] = useState(false)
  
  const{isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
  const [current_user,setCurrentUser] = useState('Guest')

  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')
  const get_logged_in_user=async()=>{
    try{
      const response = await api.get('logged-in-user/',{headers:{Authorization: `Bearer ${accessToken}`}})
      setCurrentUser(response.data.username)
      console.log(response.data);
      
    }catch(error){
      console.error(error.response.data);
    }
  }

  useEffect(()=>{
    if(!isLoggedIn) return
    get_logged_in_user()
  },[isLoggedIn])

  const logout=()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    setCurrentUser("Guest")
    navigate('/')
    
  }



  return (
    <>
    <header className=' p-4'>
        <nav className=' flex items-center justify-between'>
            <Link to='/' className=' font-bold text-3xl text-white'>Chat<span className=' text-indigo-400'>On</span></Link>

            <div className=' flex gap-2 items-center'>
                <p className=' p-2 bg-[#1b1f2a] text-gray-200 border border-[#292d38] font-semibold rounded-full px-4 py-2'>{current_user}</p>
                {isLoggedIn ? <button onClick={logout} className=' p-2 bg-indigo-500 text-white  border border-[#292d38] font-semibold rounded-full w-24'>Logout</button> : 
                              <button onClick={()=>{setOpenAuth(true)}} className=' p-2 bg-indigo-500 text-white  border border-[#292d38] font-semibold rounded-full w-24'>Sign in</button> }
                
            </div>
        </nav>

        { openAuth && <Auth setOpenAuth={setOpenAuth}/>}
    </header>
    </>
  )
}

export default Navbar