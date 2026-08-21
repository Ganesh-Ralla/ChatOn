import React, { useContext, useEffect, useRef, useState } from 'react'
import { ArrowLeft, MoreVertical, Send } from 'lucide-react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ChatScreen = ({ room_id, selectedPerson, setSelectedPerson }) => {

    const [messages, setMessages] = useState([])
    const [text_message, setTextMessage] = useState("")

    const navigate = useNavigate()

    const accessToken = localStorage.getItem('accessToken')

    const { loggedInUser } = useContext(AuthContext)

    const socketRef = useRef(null)

    const messageEndRef = useRef(null)
    const previousMessageCount = useRef(0)


    // --------------------------------------------------
    // Get previous messages
    // --------------------------------------------------
    const chat_room_messages = async () => {
        try {
            console.log("FETCHING MESSAGES FOR ROOM:", room_id)

            const response = await api.get(
                `chat/${room_id}/messages/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            console.log("MESSAGES FROM API:", response.data)

            setMessages(response.data)

        } catch (error) {
            console.error(error.response?.data || error)
        }
    }

    // --------------------------------------------------
    // Load previous messages when room changes
    // --------------------------------------------------

    useEffect(() => {
        if (!room_id || !loggedInUser?.id) return

        setMessages([])
        chat_room_messages()

    }, [room_id, loggedInUser?.id])

    // --------------------------------------------------
    // WebSocket connection
    // --------------------------------------------------

    useEffect(() => {

        if (!room_id) return

        console.log("WEBSOCKET EFFECT", room_id)

        const socket = new WebSocket(
            `ws://localhost:8000/ws/chat/${room_id}/?token=${accessToken}`
        )

        socketRef.current = socket

        socket.onopen = () => {
            console.log("WebSocket connected", room_id)
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            console.log("WebSocket message:", data)

            if (data.type === "message") {
                setMessages(prev => [...prev, data])
            }
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected", room_id)
        }

        socket.onerror = (error) => {
            console.log("WebSocket error:", error)
        }

        return () => {
            console.log("WEBSOCKET CLEANUP", room_id)

            socket.close()
            socketRef.current = null
        }

    }, [room_id])

    // --------------------------------------------------
    // Send message through WebSocket
    // --------------------------------------------------

    const send_message = (e) => {

        e.preventDefault()

        if (!text_message.trim()) return

        if (
            !socketRef.current ||
            socketRef.current.readyState !== WebSocket.OPEN
        ) {

            console.log("WebSocket is not connected")

            return

        }


        socketRef.current.send(
            JSON.stringify({
                type: "message",
                text: text_message.trim()
            })
        )


        setTextMessage("")

    }


    // --------------------------------------------------
    // Auto scroll when new message arrives
    // --------------------------------------------------

    useEffect(() => {

        if (messages.length > previousMessageCount.current) {

            messageEndRef.current?.scrollIntoView({
                behavior: "smooth"
            })

        }

        previousMessageCount.current = messages.length

    }, [messages])


    // --------------------------------------------------
    // No person selected
    // --------------------------------------------------

    if (!selectedPerson?.id) {

        return (

            <div className="flex flex-col items-center justify-center h-full">

                <p className="mb-2 p-4 bg-indigo-500/40 rounded-full">

                    <Send
                        size={34}
                        className="text-indigo-400"
                    />

                </p>

                <p className="font-medium">
                    Select someone to start chatting
                </p>

                <p className="text-sm text-gray-500">
                    Choose a person from the list
                </p>

            </div>

        )

    }


    // --------------------------------------------------
    // Chat screen
    // --------------------------------------------------

    return (

        <div className="flex flex-col h-full min-h-0">

            {/* Header */}

            <div className="shrink-0 border-b border-b-gray-50/30 pb-4">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        {/* Back button */}

                        <div
                            onClick={() => {
                                setSelectedPerson({})
                                navigate('/chat')
                            }}
                            className="lg:hidden cursor-pointer"
                        >

                            <ArrowLeft />

                        </div>


                        {/* Avatar */}

                        <p className="font-bold bg-indigo-500/20 w-12 h-12 rounded-full flex items-center justify-center text-2xl">

                            {selectedPerson?.username?.[0]?.toUpperCase()}

                        </p>


                        {/* Username */}

                        <p className="font-bold text-xl">

                            {selectedPerson?.username}

                        </p>

                    </div>


                    <p>

                        <MoreVertical />

                    </p>

                </div>

            </div>


            {/* Messages */}

            <div className="mt-4 overflow-y-auto overscroll-contain scrollbar-thin min-h-0 flex-1">

                {messages.map((message) => (

                    <div
                        key={message.id}
                        className={`flex ${Number(loggedInUser?.id) === Number(message.sender)
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >

                        <p
                            className={`font-medium p-2 px-4 mb-2 rounded-t-2xl ${Number(loggedInUser?.id) === Number(message.sender)
                                ? "rounded-l-2xl border border-indigo-500/10 bg-indigo-400"
                                : "rounded-r-2xl bg-gray-500/20 border border-gray-100/10"
                                }`}
                        >

                            {message.text}

                        </p>

                    </div>

                ))}


                <div ref={messageEndRef} />

            </div>


            {/* Send message */}

            <div className="shrink-0">

                <form
                    onSubmit={send_message}
                    className="flex items-center gap-2"
                >

                    <input
                        name="text"
                        value={text_message}
                        onChange={(e) => {
                            setTextMessage(e.target.value)
                        }}
                        type="text"
                        placeholder="type a message"
                        className="min-w-0 flex-1 rounded-3xl border border-[#292d38] bg-[#171a22] px-4 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-600 focus:border-indigo-500/50"
                    />


                    <button
                        type="submit"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                        <Send size={18} />

                    </button>

                </form>

            </div>

        </div>

    )
}

export default ChatScreen