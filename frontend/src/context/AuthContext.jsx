import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )

    const [loggedInUser,setLoggedInUser] = useState({})

    const get_user= async()=>{
        try{
            const accessToken = localStorage.getItem('accessToken')
            const response = await api.get('logged-in-user/',{headers: {Authorization :`Bearer ${accessToken}`}})
            setLoggedInUser(response.data)
        }catch(error){
            console.error(error.response.data);
        }
    }

    useEffect(()=>{
        if(!isLoggedIn) return
        get_user()
    },[isLoggedIn])
    return(
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider