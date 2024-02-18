import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Add from './pages/Add'
import Recipes from './pages/Recipes'
import Header from '../components/Header'
import Wishlist from './pages/Wishlist'





function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/register' element={<Auth insideRegister></Auth>}></Route>
        <Route path='/login' element={<Auth></Auth>}></Route>
        <Route path='/add' element={<Add></Add>}></Route>
        <Route path='/recipes' element={<Recipes></Recipes>}></Route>
        <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
        <Route path='/*' element={<Navigate to={'/'}></Navigate>}></Route>
      </Routes>
    </>
  )
}


export default App
