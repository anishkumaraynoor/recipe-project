import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'









function Home() {
  return (
    <>
<div style={{ height: '100%' }} className='bg-warning d-flex justify-content-center align-items-center'>
        <div className='row w-100'>
          <Col style={{padding:'10%'}} lg={6}>
              <h1>Project Fair</h1>
              <p>One stop destination for all software development projects where user can add and manage their projects as well as access all projects available in our website... What are you waiting for?!!!</p>
              <Link to={'/login'}><button className='btn btn-info'>Explore</button></Link>
          </Col>
          <Col className='d-flex justify-content-center align-items-center' lg={6}>
            <img style={{height:'70%'}} src="" alt="" />
          </Col>
        </div>
      </div>


    </>
  )
}

export default Home