import React, { useContext, useEffect, useRef, useState } from 'react'
import { ArrowLeft, MoreVertical, Send } from 'lucide-react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
const ChatScreen = ({ room_id, selectedPerson,setSelectedPerson }) => {
    const [messages, setMessages] = useState([])

    const accessToken = localStorage.getItem('accessToken')

    const [loggedin_user, setLoggedInUser] = useState({})
    const { isLoggedIn } = useContext(AuthContext)

    const chat_room_messages = async () => {
        try {
            const response = await api.get(`chat/${room_id}/messages/`, { headers: { Authorization: `Bearer ${accessToken}` } })
            console.log("messages==>", response.data);
            setMessages(response.data)


        } catch (error) {
            console.error(error.response.data);
        }
    }

    useEffect(() => {
        if (!room_id || !loggedin_user.id) return
        chat_room_messages()
        const interval = setInterval(() => {
            chat_room_messages()
        }, 2000);
        return () => clearInterval(interval)
    }, [room_id])




    const get_logged_in_user = async () => {
        try {
            const response = await api.get('logged-in-user/', { headers: { Authorization: `Bearer ${accessToken}` } })
            setLoggedInUser(response.data)
        } catch (error) {
            console.error(error.response.data);

        }
    }



    useEffect(() => {
        if (!isLoggedIn) return
        get_logged_in_user()
    }, [])

    // console.log(("logged user id==>",loggedin_user.id));



    const [text_message, setTextMessage] = useState("")

    const message = {
        "text": text_message,
        "sender": loggedin_user.id
    }


    const send_message = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post(`chat/${room_id}/messages/send/`, message, { headers: { Authorization: `Bearer ${accessToken}` } })
            console.log(response.data)
            console.log(message);

            setTextMessage("")

            chat_room_messages()

        } catch (error) {
            console.error(error.response.data);
            console.error(error);

        }
    }

    const messageEndRef = useRef(null)
    const previousMessageCount = useRef(0)

    useEffect(() => {
        if (messages.length > previousMessageCount.current) {
            messageEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            })
        }
        previousMessageCount.current = messages.length
    }, [messages])


    if (!selectedPerson?.id) {
        return (
            <>
                <div className=' flex flex-col items-center justify-center h-full'>
                    <p className=' mb-2 p-4 bg-indigo-500/40 rounded-full'><Send size={34} className=' text-indigo-400' /></p>
                    <p className=' font-medium'>Select someone to start chatting</p>
                    <p className=' text-sm text-gray-500'>Choose a person from the list</p>
                </div>
            </>
        )
    }



    return (
        <>
            <div className=' flex flex-col h-full min-h-0'>
                {/* header */}
                <div className=' shrink-0 border-b border-b-gray-50/30 pb-4'>
                    <div className=' flex items-center justify-between'>

                        <div className=' flex items-center gap-3'>
                            <div onClick={()=>{setSelectedPerson({})}} className=' lg:hidden'>
                                <ArrowLeft />
                            </div>
                            <p className=' font-bold bg-indigo-500/20 w-12 h-12 rounded-full flex items-center justify-center text-2xl'>
                                {selectedPerson?.username?.[0]?.toUpperCase()}
                            </p>
                            <p className=' font-bold text-xl'> {selectedPerson?.username} </p>
                        </div>

                        <p><MoreVertical />  </p>
                    </div>
                </div>

                {/* messages */}
                <div className=' mt-4 overflow-y-auto overscroll-contain scrollbar-thin min-h-0 flex-1'>
                    {messages.map((message) => {
                        return (
                            <div key={message.id} className={` flex  ${Number(loggedin_user.id) === Number(message.sender) ? "justify-end" : "justify-start"} `}>
                                <p className={` font-medium p-2 px-4 mb-2   rounded-t-2xl  ${Number(loggedin_user.id) === Number(message.sender) ? "rounded-l-2xl border border-indigo-500/10 bg-indigo-400" : " rounded-r-2xl bg-gray-500/20 border border-gray-100/10"} `}>{message.text}</p>
                            </div>
                        )
                    })}
                    <div ref={messageEndRef} />
                </div>

                {/* send message */}
                <div className=' shrink-0'>
                    <form onSubmit={send_message} className=' flex items-center gap-2'>
                        <input name='text' value={text_message} onChange={(e) => { setTextMessage(e.target.value) }} type="text" placeholder='type a message' className='min-w-0 flex-1 rounded-3xl border border-[#292d38] bg-[#171a22] px-4 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-600 focus:border-indigo-500/50' />
                        <button type='submit' className=' flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'><Send size={18} /></button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatScreen