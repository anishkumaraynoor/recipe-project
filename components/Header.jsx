import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';




import icon from '../src/assets/icon.jpg'
import { tokenAuthContext } from '../src/context/TokenAuth';
function Header() {
  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)
  const handleLogout = ()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
  }
  return (
    <div  style={{position:'fixed', width:'100%', zIndex:'101'}}>
      <Navbar expand="lg" style={{height:'80px'}} className="bg-primary">
      <Container>
        <Link to={'/'} style={{textDecoration:'none'}}><Navbar.Brand className='text-white fw-bolder'  href="">
          <img height={50} style={{borderRadius:'50%'}} src={icon} alt="" />
          FoodsApp</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link style={{color:'white', textDecoration:'none'}} to={'/add'}>Add</Link></Nav.Link>
          <Nav.Link><Link style={{color:'white', textDecoration:'none'}} to={'/recipes'}>Recipes</Link></Nav.Link>        
          </Nav>
          <Nav onClick={handleLogout} className='ms-auto'><Nav.Link><Link style={{color:'white', textDecoration:'none'}} to={'/'}>Logout</Link></Nav.Link> </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}





export default Header