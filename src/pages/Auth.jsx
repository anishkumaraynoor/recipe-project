import React, { useState } from 'react'





import { Col, Row } from 'react-bootstrap'


import { Link, useNavigate } from 'react-router-dom'

import { loginAPI, registerAPI } from '../services/allAPI'




function Auth({ insideRegister }) {
  return (
    <>
      <div style={{ height: '100vh' }} className='d-flex bg-danger align-items-center justify-content-center'>
        <div className='container w-75'>
          <Link to={'/'}><button>back to home</button></Link>
          <Row style={{ margin: '20px' }} className='d-flex bg-warning align-items-center justify-content-center'>

            <Col className='text-center' lg={6}>
              <img style={{ height: '300px', padding: '50px' }} className='' src="" alt="" />
            </Col>
            <Col lg={6}>
              {insideRegister ?
                <Register></Register> :
                <Login></Login>
              }
            </Col>

          </Row>
        </div>
      </div>
    </>
  )
}

const Register = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    username: "", email: "", password: ""
  })
  console.log(userInput);
  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userInput
    try {
      if (!username || !email || !password) {
        alert("please fill all")
      } else {
        const result = await registerAPI(userInput)
        if (result.status === 200) {
          alert(`Welcome ${result.data.username}... Please Login`)
          setUserInput({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          console.log(result);
          alert(result.response.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <input onChange={e => setUserInput({ ...userInput, username: e.target.value })} value={userInput.username} className='form-control w-75 mt-2' placeholder='Username' type="text" />
      <input onChange={e => setUserInput({ ...userInput, email: e.target.value })} value={userInput.email} className='form-control w-75 mt-2' placeholder='Email' type="text" />
      <input onChange={e => setUserInput({ ...userInput, password: e.target.value })} value={userInput.password} className='form-control w-75 mt-2' placeholder='Password' type="text" />
      <div onClick={handleRegister} className='btn btn-success mt-2'>Register</div>
      <p>Have already an Account?... <Link to={'/login'}>Login</Link></p>
    </>

  )
}

const Login = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    email: "", password: ""
  })
  console.log(userInput);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await loginAPI(userInput)
      console.log(result);
      if (result.status === 200) {
        sessionStorage.setItem("username", result.data.existingUser.username)
        sessionStorage.setItem("token", result.data.token)
        setUserInput({ email: "", password: "" })
        navigate('/recipes')
      } else {
        console.log(result);
        alert(result.response.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <input onChange={e => setUserInput({ ...userInput, email: e.target.value })} value={userInput.email} className='form-control w-75 mt-2' placeholder='Email' type="text" />
      <input onChange={e => setUserInput({ ...userInput, password: e.target.value })} value={userInput.password} className='form-control w-75 mt-2' placeholder='Password' type="text" />
      <div onClick={handleLogin} className='btn btn-success mt-2'>Login</div>
      <p>Not Registered Yet?... <Link to={'/register'}>Register</Link></p>
    </>
  )
}





export default Auth