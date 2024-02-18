import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'




import images from '../assets/images.png'
import { addRecipeAPI } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'

function Add() {
  const navigate = useNavigate()
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [recipeData, setRecipeData] = useState({
    recipename:"", description:"", ingredients:"", instructions:"", cookingtime:"", recipeimage:""
  })
  
  const handleCancel = ()=>{
    setRecipeData({recipename:"", description:"", ingredients:"", instructions:"", cookingtime:"", recipeimage:""})
    setPreview(images)
  }

  const handleRecipeUpload = async()=>{
    const {recipename, description, ingredients, instructions, cookingtime, recipeimage} = recipeData
    if(!recipename || !description || !ingredients || !instructions || !cookingtime || !recipeimage){
      alert("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("recipename",recipename)
      reqBody.append("description",description)
      reqBody.append("ingredients",ingredients)
      reqBody.append("instructions",instructions)
      reqBody.append("cookingtime",cookingtime)
      reqBody.append("recipeimage",recipeimage)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        console.log("proceed to API");

        try {
        const result = await addRecipeAPI(reqBody, reqHeader)
        console.log(result);
        if(result.status===200){
          alert("added successfully")
          console.log(result.data);
          navigate('/recipes')
        }else{
          alert(result.response.data)
        }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }





  useEffect(()=>{
    if(recipeData.recipeimage?.type=="image/png" || recipeData.recipeimage?.type=="image/jpg" || recipeData.recipeimage?.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(recipeData.recipeimage))
    }else{
      setPreview(images)
      setRecipeData({...recipeData, recipeimage:""})
      setImageFileStatus(false)
    }
  },[recipeData.recipeimage])


  return (
    <>
    <Container>
      <div style={{paddingTop:'100px'}} className='row'>
      
              <div style={{marginTop:'50px'}} className='col-lg-5'>
              <h2>Create Your Own Recipe</h2>
                <label className='border rounded p-2 w-75 d-flex justify-content-center align-items-center'>
                  <input onChange={e=>setRecipeData({...recipeData, recipeimage:e.target.files[0]})} className='text-center' type="file" style={{display:'none'}} name="" id="" />
                  <img height={'200px'} width={'200px'} className='mt-5' src={preview?preview:images} alt="" />
                </label>
                {!imageFileStatus && <div className="text-danger">*Upload only the following file types (jpg, jpeg, png)*</div>}
              </div>
  
              <div className='col-lg-7'>
                <div className='mb-1'>
                  <input onChange={e=>setRecipeData({...recipeData, recipename:e.target.value})} value={recipeData.recipename} className='border rounded p-2 w-75' placeholder='Recipe Name' type="text" name="" id="" />
                </div>
                <div className='mb-1'>
                <textarea onChange={e=>setRecipeData({...recipeData, description:e.target.value})} value={recipeData.description} className='border rounded p-2 w-75' placeholder='Description' cols="30" rows="3"></textarea>
                </div>
                <div className='mb-1'>
                  <textarea onChange={e=>setRecipeData({...recipeData, ingredients:e.target.value})} value={recipeData.ingredients} className='border rounded p-2 w-75' placeholder='Ingredients' cols="30" rows="7"></textarea>
                </div>
                <div className='mb-1'>
                  <input onChange={e=>setRecipeData({...recipeData, instructions:e.target.value})} value={recipeData.instructions} className='border rounded p-2 w-75' placeholder='Instructions' type="text" name="" id="" />
                </div>
                <div className='mb-1'>
                  <input onChange={e=>setRecipeData({...recipeData, cookingtime:e.target.value})} value={recipeData.cookingtime} className='border rounded p-2 w-75' placeholder='Coocking Time (in Minutes)' type="text" name="" id="" />
                </div>

                
                  <button onClick={handleCancel} className='btn btn-secondary my-2'>Cancel</button>
                  <button onClick={handleRecipeUpload} className='btn btn-primary my-2'>Create</button>
               
                
              </div>
            </div>
    </Container>
    
    </>
  )
}





export default Add