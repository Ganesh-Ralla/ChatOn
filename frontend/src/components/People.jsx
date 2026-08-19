import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const People = ({ room_id, setRoomId, selectedPerson, setSelectedPerson }) => {
    const [people, setPeople] = useState([])
    const { isLoggedIn } = useContext(AuthContext)



    const accessToken = localStorage.getItem('accessToken')
    const get_people = async () => {
        try {
            const response = await api.get('chats/latest/', { headers: { Authorization: `Bearer ${accessToken}` } })
            setPeople(response.data)
            console.log("updated chats/users", response.data);
        } catch (error) {
            console.error(error.response.data);
            console.log(error);

        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            get_people()
        }
    }, [isLoggedIn])



    const get_chat_room = async () => {
        try {
            const response = await api.get(`chat/${selectedPerson.id}/`, { headers: { Authorization: `Bearer ${accessToken}` } })
            console.log("room", response.data);
            setRoomId(response.data.room_id)
        } catch (error) {
            console.error(error.response.data);
        }
    }


    useEffect(() => {
        if (selectedPerson?.id) {
            get_chat_room()
        }
    }, [selectedPerson])

    return (
        <>
            <div>
                <div className=' p-2 flex gap-3 items-center mb-3 hover:bg-indigo-500/10 hover:cursor-pointer hover:rounded-xl'>
                    <div className='flex items-center justify-center  border-indigo-500/30 bg-indigo-500/20 rounded-full w-12 h-12 text-center'>
                        <p className='font-bold text-2xl text-indigo-400'>C</p>
                    </div>
                    <div className=' min-w-0'>
                        <p className=' font-semibold text-gray-200'>Chimmy</p>
                        <p className=' text-gray-500 truncate text-sm'>Hey i'm your chat bot</p>
                    </div>
                </div>

                {isLoggedIn &&
                    people.map((person) => {
                        return (
                            <div onClick={() => { setSelectedPerson(person) }} key={person.id} className=' p-2 flex gap-3 items-center mb-3 hover:bg-indigo-500/10 hover:cursor-pointer hover:rounded-xl'>
                                <div className='flex items-center justify-center  border-indigo-500/30 bg-indigo-500/20 rounded-full w-12 h-12 text-center'>
                                    <p className='font-bold text-2xl text-indigo-400'>{person.username[0].toUpperCase()}</p>
                                </div>
                                <div className=' min-w-0'>
                                    <p className=' font-semibold text-gray-200'>{person.username}</p>
                                    <p className=' text-gray-500 truncate text-sm'>{person.latest_message}</p>
                                </div>
                            </div>

                        )
                    })
                }
                <div className=' text-center flex flex-col justify-end  '>
                    <p className=' fixed bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap mx-auto text-sm'>Developed by <b>Ganesh Ralla </b> <Link className=' text-indigo-400'>know more</Link> </p>
                </div>
            </div >
        </>
    )
}

export default People