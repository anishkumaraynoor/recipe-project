import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Add from './pages/Add'
import Recipes from './pages/Recipes'
import Header from '../components/Header'
import { useContext } from 'react'
import { tokenAuthContext } from './context/TokenAuth'





function App() {
  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)
  return (
    <>
      <Header></Header>
      <Routes>
      <Route path='/' element={<Auth></Auth>}></Route>
        <Route path='/register' element={<Auth insideRegister></Auth>}></Route>
        <Route path='/add' element={isAuthorized?<Add></Add>:<Auth></Auth>}></Route>
        <Route path='/recipes' element={isAuthorized?<Recipes></Recipes>:<Auth></Auth>}></Route>
        <Route path='/*' element={<Navigate to={'/'}></Navigate>}></Route>
      </Routes>
    </>
  )
}


export default App
