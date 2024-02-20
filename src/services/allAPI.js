import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"







//register
export const registerAPI = async (user)=>{
    return await commonAPI("POST", `${SERVER_URL}/register`, user, "")
}
//login
export const loginAPI = async (user)=>{
    return await commonAPI("POST", `${SERVER_URL}/login`, user, "")
}

export const addRecipeAPI = async (reqBody, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/add-recipe`, reqBody, reqHeader)
}


export const getAllRecipesAPI = async (searchKey, reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/get-all-recipes?search=${searchKey}`, "", reqHeader)
}

export const getUserRecipesAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/get-user-recipes`, "", reqHeader)
}

export const deleteRecipeAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE", `${SERVER_URL}/remove-recipe/${projectId}`,{},reqHeader)
}

export const updateRecipeAPI = async(recipeId,reqBody,reqHeader)=>{
    return await commonAPI("PUT", `${SERVER_URL}/recipe/edit/${recipeId}`,reqBody,reqHeader)
}

