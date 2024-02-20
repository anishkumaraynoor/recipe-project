import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { updateRecipeAPI } from '../src/services/allAPI';
import SERVER_URL from '../src/services/serverUrl';
import { editResponseContext } from '../src/context/ContextShare';


function Edit({showRecipe}) {
    const {editResponse, setEditResponse} = useContext(editResponseContext)
    const [recipeData, setRecipeData] = useState({
        id:showRecipe._id, recipename:showRecipe.recipename, description:showRecipe.description, ingredients:showRecipe.ingredients, instructions:showRecipe.instructions, cookingtime:showRecipe.cookingtime, recipeimage:""
      })
      const [preview, setPreview] = useState("")

      console.log(showRecipe);

      const handleClose = () =>{
        setShow(false)
        setRecipeData({
            id:showRecipe._id, recipename:showRecipe.recipename, description:showRecipe.description, ingredients:showRecipe.ingredients, instructions:showRecipe.instructions, cookingtime:showRecipe.cookingtime, recipeimage:""
        })
        setPreview("")
      }

      function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true)
        setRecipeData({id:showRecipe._id, recipename:showRecipe.recipename, description:showRecipe.description, ingredients:showRecipe.ingredients, instructions:showRecipe.instructions, cookingtime:showRecipe.cookingtime, recipeimage:""})
      }

      


      const handleUpdateRecipe = async()=>{
        const {id,recipename,description,ingredients,instructions,cookingtime,recipeimage} = recipeData
        if(!recipename || !description || !ingredients || !instructions || !cookingtime){
          alert("Please fill the form completely")
        }else{
          const reqBody = new FormData()
          reqBody.append('recipename',recipename)
          reqBody.append('description',description)
          reqBody.append('ingredients',ingredients)
          reqBody.append('instructions',instructions)
          reqBody.append('cookingtime',cookingtime)
          preview?reqBody.append('recipeimage',recipeimage):reqBody.append('recipeimage',showRecipe.recipeimage)
    
          const token = sessionStorage.getItem("token")
          if(token){
            const reqHeader = {
              "Content-Type":preview?"multipart/form-data":"application/json",
              "Authorization": `Bearer ${token}`
            }
            console.log("proceed to api call");
            try {
              const result = await updateRecipeAPI(id,reqBody,reqHeader)
              if(result.status===200){
                handleClose()
                setEditResponse(result.data)
              }else{
                console.log(result);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }

      useEffect(()=>{
        if(recipeData.recipeimage){
          setPreview(URL.createObjectURL(recipeData.recipeimage))
        }else{
          setPreview("")
        }
      },[recipeData.recipeimage])

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    
  return (
    
    <>
    <div onClick={handleShow} style={{width:'100px'}} className='btn btn-primary shadow mx-1 mb-1'>Edit</div>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        
        <Modal.Body>

        <Container>
      <div style={{paddingTop:'100px'}} className='row'>
      
              <div style={{marginTop:'50px'}} className='col-lg-5'>
              <h2>Edit Your Recipe</h2>
                <label className='border rounded p-2 w-75 d-flex justify-content-center align-items-center'>
                  <input onChange={e=>setRecipeData({...recipeData, recipeimage:e.target.files[0]})} className='text-center' type="file" style={{display:'none'}} name="" id="" />
                  <img height={'200px'} width={'200px'} className='mt-5' src={preview?preview:`${SERVER_URL}/uploads/${showRecipe.recipeimage}`} alt="" />
                </label>
                <div className="text-danger">*Upload only the following file types (jpg, jpeg, png)*</div>
              </div>
  
              <div className='col-lg-7'>
                <div className='mb-1'>
                  <input onChange={e=>setRecipeData({...recipeData, recipename:e.target.value})} value={recipeData.recipename} className='border rounded p-2 w-75' placeholder='Recipe Name' type="text" name="" id="" />
                </div>
                <div className='mb-1'>
                <textarea onChange={e=>setRecipeData({...recipeData, description:e.target.value})} value={recipeData.description} className='border rounded p-2 w-75' placeholder='Description' cols="30" rows="2"></textarea>
                </div>
                <div className='mb-1'>
                  <textarea onChange={e=>setRecipeData({...recipeData, ingredients:e.target.value})} value={recipeData.ingredients} className='border rounded p-2 w-75' placeholder='Ingredients' cols="30" rows="3"></textarea>
                </div>
                <div className='mb-1'>
                  <textarea onChange={e=>setRecipeData({...recipeData, instructions:e.target.value})} value={recipeData.instructions} className='border rounded p-2 w-75' placeholder='Instructions' cols="30" rows="3"></textarea>
                </div>
                <div className='mb-1'>
                  <input onChange={e=>setRecipeData({...recipeData, cookingtime:e.target.value})} value={recipeData.cookingtime} className='border rounded p-2 w-75' placeholder='Coocking Time (in Minutes)' type="text" name="" id="" />
                </div>

                
                  <button onClick={handleClose}  className='btn btn-secondary my-2'>Cancel</button>
                  <button onClick={handleUpdateRecipe}  className='btn btn-primary my-2'>Create</button>
               
                
              </div>
            </div>
    </Container>


        </Modal.Body>
      </Modal>




    </>
  )
}

export default Edit