import { ToastContainer } from 'react-toastify'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthProvider from './context/AuthContext'
import About from './pages/About'


function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:userId?' element={<Home/>}/>
            <Route path='/about' element={<About/>} />
          </Routes>
        </BrowserRouter>

        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
