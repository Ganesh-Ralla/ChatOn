import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import People from '../components/People'
import ChatScreen from '../components/ChatScreen'
import { Link, useParams } from 'react-router-dom'

const Home = () => {

  const { userId } = useParams()

  console.log("HOME RENDER")

  const [selectedPerson, setSelectedPerson] = useState({})
  const [room_id, setRoomId] = useState()

  useEffect(() => {
    if (!userId) {
      setSelectedPerson({})
      setRoomId(undefined)
    }
  }, [userId])

  console.log("HOME room_id:", room_id)
  console.log("HOME selectedPerson:", selectedPerson)

  return (
    <div className='h-screen flex flex-col'>

      {/* Navbar */}
      <div className={selectedPerson.id ? 'hidden lg:block' : 'block'}>
        <Navbar />
      </div>

      {/* Main content */}
      <div className='flex-1 p-4 flex gap-4 min-h-0'>

        {/* People Sidebar */}
        <div
          className={`w-full lg:w-90 shrink-0 min-h-0 flex flex-col lg:border-r lg:border-r-gray-100/40 ${
            selectedPerson?.id
              ? 'hidden lg:flex'
              : 'flex'
          }`}
        >

          {/* People heading */}
          <div className='shrink-0'>
            <p className='font-bold text-xl mb-3'>
              People
            </p>

            <hr className='opacity-20 mb-3' />
          </div>

          {/* People list */}
          <div className='flex-1 min-h-0 overflow-y-auto'>

            <People
              setRoomId={setRoomId}
              selectedPerson={selectedPerson}
              setSelectedPerson={setSelectedPerson}
            />

          </div>

          {/* Footer */}
          <div className='shrink-0 text-center py-3'>

            <p className='text-sm text-gray-400'>
              Developed by <b>Ganesh Ralla</b>{' '}

              <Link
                to='/about'
                className='text-indigo-400 hover:text-indigo-300'
              >
                know more
              </Link>
            </p>

          </div>

        </div>


        {/* Chat Screen */}
        <div
          className={`flex-1 min-h-0 min-w-0 ${
            selectedPerson?.id
              ? 'block'
              : 'hidden lg:block'
          }`}
        >

          <ChatScreen
            room_id={room_id}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />

        </div>

      </div>

    </div>
  )
}

export default Home