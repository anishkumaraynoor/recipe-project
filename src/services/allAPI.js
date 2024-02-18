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

export const getUserProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/get-user-projects`, "", reqHeader)
}

export const updateUserProfileAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT", `${SERVER_URL}/user/edit`, reqBody, reqHeader)
}

export const updateProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT", `${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE", `${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}