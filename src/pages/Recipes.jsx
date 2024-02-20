import React, { useContext, useEffect, useState } from 'react'
import { deleteRecipeAPI, getAllRecipesAPI } from '../services/allAPI'



import ListGroup from 'react-bootstrap/ListGroup';
import SERVER_URL from '../services/serverUrl';
import { Col, Container, Row } from 'react-bootstrap';
import { getUserRecipesAPI } from '../services/allAPI';
import Slider from "react-slick";
import Edit from '../../components/Edit';
import { addResponseContext, editResponseContext } from '../context/ContextShare';


function Recipes() {
  const [userStatus, setUserStatus] = useState(false)
  const {addResponse, setAddResponse} = useContext(addResponseContext)
  const {editResponse, setEditResponse} = useContext(editResponseContext)
  const [userRecipes, setUserRecipes] = useState([])
  const [selectStatus, setSelectStatus] = useState(false)
  const [showRecipe, setShowRecipe] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [allRecipes, setAllRecipes] = useState([])
  const getAllRecipes = async () => {
    try {
      const token = sessionStorage.getItem('token')
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await getAllRecipesAPI(searchKey, reqHeader)
        console.log(result);
        if (result.status === 200) {
          setAllRecipes(result.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(showRecipe);

  const allShow = (selected) => {
    setShowRecipe(selected)
    setSelectStatus(true)
    setUserStatus(false)
  }

  const userShow = (selected) => {
    setShowRecipe(selected)
    setSelectStatus(true)
    setUserStatus(true)
  }



  const getUserRecipes = async () => {
    try {
      const token = sessionStorage.getItem('token')
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await getUserRecipesAPI(reqHeader)
        if (result.status === 200) {
          setUserRecipes(result.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userRecipes);

  const handleDeleteRecipe = async(recipeId)=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await deleteRecipeAPI(recipeId, reqHeader)
        if(result.status===200){
          getUserRecipes()
          getAllRecipes()
          setSelectStatus(false)
        }else{
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  }


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
    
    
  };



  useEffect(() => {
    getAllRecipes()
    getUserRecipes()
  }, [searchKey, addResponse, editResponse])




  return (

    <div style={{ minHeight: '100vh' }}>
      <nav className='sidebar'>
        <header>
          <h2 className='text-center text-white mb-2'>Recipes</h2>
          <input onChange={e => setSearchKey(e.target.value)} className='border rounded w-50 mb-2' placeholder='Search here.....' type="text" name="" id="" />
        </header>
        <div className="scrollbox">
          <div className="scrollbox-inner">

            <ListGroup>
              {allRecipes?.length > 0 ? allRecipes.map((recipe, index) => (
                <ListGroup.Item key={index} as="li" onClick={e => allShow(recipe)} className="d-flex justify-content-between align-items-start">
                  <img style={{ height: '50px', width: '50px', borderRadius: '50%' }} src={`${SERVER_URL}/uploads/${recipe.recipeimage}`} alt="" />
                  <div className="ms-2 me-auto">
                    <div  className="fw-bold">{recipe?.recipename}</div><span className='description' >{recipe?.description.slice(0,40)}</span>
                  </div>
                </ListGroup.Item>
             )) 
                : <h5>No Recipes</h5>
              }
            </ListGroup>


          </div>
        </div>
        <footer>
          <div className='mt-3'></div>
        </footer>

      </nav>




     
        <div className="content">
  
          <div className='content2'>
          
            <Row className='d-flex align-items-center justify-content-center'>
  
              <Col className='' lg={4}>
                {selectStatus && <div style={{ height: '200px' }}>
                  <h3 className='text-center text-primary'>{showRecipe.recipename}</h3>
                  <p style={{fontSize:'small'}} className='px-3 mb-1'><span className='text-primary'>Ingredients:</span> {showRecipe.ingredients}</p>
                </div>}
                {selectStatus && <p style={{fontSize:'small'}} className='px-3'><span className='text-primary'>Cooking Time:</span> {showRecipe.cookingtime} minutes</p>}
              </Col>
              <Col className='d-flex align-items-center justify-content-center' lg={4}>
                {selectStatus ? <img style={{ height: '250px' }} className='w-100 text-center align-items-center justify-content-center'
                  src={`${SERVER_URL}/uploads/${showRecipe.recipeimage}`} alt="" /> :
                  <div style={{ height: '250px' }} className='w-100 my-5 text-center align-items-center justify-content-center' >Nothing Selected</div>
                }
              </Col>
              <Col lg={4}>
                {selectStatus && <div className='instructions rounded mt-3' style={{ border: 'solid 1px black', height: '320px', marginRight: '50px' }}>
                  <h6 className='text-center text-primary'>Instructions:-</h6>
                  <p style={{fontSize:'small'}} className='px-3'>{showRecipe.instructions}</p>
                </div>}

                

              </Col>
              

            </Row>


            {userStatus?
            <div style={{height:'40px'}}>
              <Edit showRecipe={showRecipe}></Edit>
              <div onClick={()=>handleDeleteRecipe(showRecipe._id)} style={{width:'100px'}} className='btn btn-dark shadow mx-1 mb-1'>Delete</div>
            </div>:
            <div style={{height:'40px'}}>
            </div>
            }
            {selectStatus && <p className='px-3 text-primary fw-bold'>{showRecipe.description}</p>}
            
            
  
  {/* ............................................................... */}
            <div style={{height:'200px', border:'black'}} className='bg-success'>
           <h4 className='text-center text-white'>Your Recipes</h4>
  <div className="slider-container mx-5">
        <Slider {...settings}>
          
            {userRecipes?.length>0 && userRecipes.map((userRecipe, index)=>(
              <div  >
                <div key={index} onClick={e => userShow(userRecipe)}>
                <div className='d-flex align-items-center justify-content-center'><img className='text-center' width={100} height={70} src={`${SERVER_URL}/uploads/${userRecipe.recipeimage}`} alt="" /></div>
                <h6 className='text-center text-white'>{userRecipe.recipename}</h6>
                </div>
              </div>
              
            ))
            }
          
          
        </Slider>
      </div>
          
  
            </div>
  {/* ............................................................... */}
  
  
  
  
  
          </div>
          
        </div>
    

     



    </div>
  )
}




export default Recipes