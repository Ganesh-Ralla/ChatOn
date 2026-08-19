import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import People from '../components/People'
import ChatScreen from '../components/ChatScreen'
import { Link } from 'react-router-dom'


const Home = () => {

  const [selectedPerson,setSelectedPerson] = useState({})
  console.log("selected person",selectedPerson);
  const [room_id,setRoomId] = useState()

  
  

  return (
    <div className=' h-screen flex flex-col'>
      <div className={selectedPerson.id ? 'hidden lg:block':'block'}>
        <Navbar />
      </div>
      <div className=' flex-1 p-4 flex gap-4  min-h-0'>
        <div className={`w-full  lg:w-90 shrink-0 overflow-y-auto lg:border-r lg:border-r-gray-100/40 ${selectedPerson?.id ? 'hidden lg:block':'block'}  `}>
          <p className=' font-bold text-xl mb-3'>People</p>
          <hr className=' opacity-20 mb-3' />
          <People  room_id={room_id} setRoomId={setRoomId} selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />

        </div>
        <div className={` flex-1 min-h-0 min-w-0  ${selectedPerson?.id ? 'block' : 'hidden lg:block'} `}>
          <ChatScreen room_id={room_id} selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson}   />
        </div>
      </div>
    </div>
  )
}

export default Home