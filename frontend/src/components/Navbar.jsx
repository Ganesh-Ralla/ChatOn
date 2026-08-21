import React, { useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from './Auth'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const [openAuth,setOpenAuth] = useState(false)
  
  const{isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    setLoggedInUser({})
    navigate('/')
  }


  return (
    <>
    <header className=' p-4'>
        <nav className=' flex items-center justify-between'>
            <Link to='/' className=' font-bold text-3xl text-white'>Chat<span className=' text-indigo-400'>On</span></Link>

            <div className=' flex gap-2 items-center'>
                <p className=' p-2 bg-[#1b1f2a] text-gray-200 border border-[#292d38] font-semibold rounded-full px-4 py-2'>{ isLoggedIn ? loggedInUser?.username : 'Guest'}</p>
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