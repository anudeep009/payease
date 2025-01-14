import Layout from './layout/Layout'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Layout />}>
     <Route path='/' element={<Signup />} />
     <Route path='/signin' element={<Signin />} />
     <Route path='/home' element={<Home />} />
     <Route path='/dashboard' element={<Dashboard />} />
     </Route>
     </Routes>
    </>
  )
}

export default App
