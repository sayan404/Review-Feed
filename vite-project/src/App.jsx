import './App.css'
import Home from './Pages/Home.jsx'
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
