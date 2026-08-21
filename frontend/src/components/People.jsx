import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const People = ({ setRoomId, selectedPerson, setSelectedPerson }) => {

    console.log("People rendered")

    const [people, setPeople] = useState([])

    const { isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()
    const { userId } = useParams()

    // Select person when opening /chat/:userId directly
    useEffect(() => {

        if (userId && people.length > 0) {

            const person = people.find(
                person => String(person.id) === String(userId)
            )

            if (person) {
                setSelectedPerson(person)
                setRoomId(person.room_id)
            }
        }

    }, [userId, people])


    const accessToken = localStorage.getItem('accessToken')


    // Get people
    const get_people = async () => {

        console.log("GET_PEOPLE FUNCTION CALLED")

        try {

            const response = await api.get(
                'chats/latest/',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            setPeople(response.data)

            console.log("updated chats/users", response.data)

        } catch (error) {

            console.error(
                error.response?.data || error
            )

            console.log(error)
        }
    }


    // Load people after login
    useEffect(() => {

        console.log("PEOPLE EFFECT", {
            isLoggedIn,
            peopleLength: people.length
        })

        if (isLoggedIn) {
            console.log("GETTING PEOPLE")
            get_people()
        }

    }, [isLoggedIn])


    return (
        <div>

            {/* Chimmy */}
            <div
                className='
                    p-2
                    flex
                    gap-3
                    items-center
                    mb-3
                    hover:bg-indigo-500/10
                    hover:cursor-pointer
                    hover:rounded-xl
                '
            >

                <div
                    className='
                        flex
                        items-center
                        justify-center
                        bg-indigo-500/20
                        rounded-full
                        w-12
                        h-12
                        shrink-0
                    '
                >
                    <p className='font-bold text-2xl text-indigo-400'>
                        C
                    </p>
                </div>

                <div className='min-w-0'>

                    <p className='font-semibold text-gray-200'>
                        Chimmy
                    </p>

                    <p className='text-gray-500 truncate text-sm'>
                        Hey i'm your chat bot
                    </p>

                </div>

            </div>


            {/* Users */}
            {isLoggedIn &&
                people.map((person) => (

                    <div
                        key={person.id}
                        onClick={() => {

                            setSelectedPerson(person)
                            setRoomId(person.room_id)

                            navigate(`/chat/${person.id}`)

                        }}
                        className='
                            p-2
                            flex
                            gap-3
                            items-center
                            mb-3
                            hover:bg-indigo-500/10
                            hover:cursor-pointer
                            hover:rounded-xl
                        '
                    >

                        {/* Avatar */}
                        <div
                            className='
                                flex
                                items-center
                                justify-center
                                bg-indigo-500/20
                                rounded-full
                                w-12
                                h-12
                                shrink-0
                            '
                        >

                            <p className='font-bold text-2xl text-indigo-400'>
                                {person.username[0].toUpperCase()}
                            </p>

                        </div>


                        {/* User info */}
                        <div className='min-w-0'>

                            <p className='font-semibold text-gray-200'>
                                {person.username}
                            </p>

                            <p className='text-gray-500 truncate text-sm'>
                                {person.latest_message}
                            </p>

                        </div>

                    </div>

                ))
            }

        </div>
    )
}

export default People