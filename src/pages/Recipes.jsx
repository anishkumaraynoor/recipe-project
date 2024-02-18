import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { getAllRecipesAPI } from '../services/allAPI'



import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import images from '../assets/background.jpg'
import SERVER_URL from '../services/serverUrl';

function Recipes() {
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


  

  useEffect(() => {
    getAllRecipes()
  }, [searchKey])



  return (

    <div style={{ minHeight: '100vh' }}>
      <nav className='sidebar'>
        <header>
          <h2>Recipes</h2>
        </header>
        <div className="scrollbox">
          <div className="scrollbox-inner">

            <ListGroup>
              {allRecipes?.length>0? allRecipes.map((recipe, index)=>(
                <ListGroup.Item key={index} as="li" onClick={e=>setShowRecipe(recipe)} className="d-flex justify-content-between align-items-start">
                <img style={{ height: '70px', width: '70px', borderRadius: '50%' }} src={`${SERVER_URL}/uploads/${recipe.recipeimage}`} alt="" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{recipe?.recipename} <Badge bg="primary" pill>Save</Badge></div>{recipe?.description}
                </div> 
              </ListGroup.Item>
              ))
                : <h5>No Recipes</h5>
              }
            </ListGroup>


          </div>
        </div>
        <footer>
          <input onChange={e => setSearchKey(e.target.value)} className='border rounded p-2 w-75' type="text" name="" id="" />
        </footer>

      </nav>

      <div className="content">
        <img style={{height:'250px'}} className='w-25 my-5' src={showRecipe?`${SERVER_URL}/uploads/${showRecipe.recipeimage}`:images} alt="" />
      </div>
    </div>
  )
}



export default Recipes