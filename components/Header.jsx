import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';





function Header() {
  return (
    <div  style={{position:'fixed', width:'100%', zIndex:'101'}}>
      <Navbar expand="lg" style={{height:'80px'}} className="bg-primary">
      <Container>
        <Link to={'/'} style={{textDecoration:'none'}}><Navbar.Brand href="">FoodsApp</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link style={{color:'black', textDecoration:'none'}} to={'/add'}>Add</Link></Nav.Link>
          <Nav.Link><Link style={{color:'black', textDecoration:'none'}} to={'/recipes'}>Recipes</Link></Nav.Link>
          <Nav.Link><Link style={{color:'black', textDecoration:'none'}} to={'/wishlist'}>Wishlist</Link></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}





export default Header