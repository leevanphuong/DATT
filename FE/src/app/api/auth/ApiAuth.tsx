import { Iuser } from "~/app/interface/Auth"
import { axiosPrivate } from "../ConfigApi"
export const getOneAuth=(id: any)=>{
    return axiosPrivate.get('/auth/'+id)
}
export const removeAuth =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.delete('/auth/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateAuth= async (id: any, data: any)=>{
    return await axiosPrivate.put(`/auth/update/${id}`,data)
}
export const SignupAuth =(auth: Iuser)=>{
    return axiosPrivate.post('/auth/register', auth)
}
export const SigninAuth = async (data: any) => {
    return await axiosPrivate.post("/auth/signin", data)
}
export const getUserDetail = async (id: any) => {
    return await axiosPrivate.get(`/auth/user-detail?userId=${id}`)
}