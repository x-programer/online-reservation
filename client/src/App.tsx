import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
// import MovieForm from './components/Movieuploadform/Movieform'
import Register from './components/Form/Register'
import Home from './components/Home/Home'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        {/* Other routes */}
      </Routes>
    </Router>
    <div className='flex justify-center mt-5'>
      {/* <Home/> */}
      {/* <Dashboard/> */}
      {/* <MovieForm/> */}
      {/* <div className='border-red-500'>
        <Register/>
      </div> */}
    </div>
    </>
  )
}

export default App
