import Layout from './layout/Layout'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Layout />}>
     <Route path='/' element={<Signup />} />
     <Route path='/signin' element={<Signin />} />
     </Route>
     </Routes>
    </>
  )
}

export default App
