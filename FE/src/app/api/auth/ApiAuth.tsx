import instance from "../instance/api"
import { Iuser } from "~/app/interface/Auth"
export const getOneAuth=(id: any)=>{
    return instance.get('/auth/'+id)
}
export const removeAuth =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.delete('/auth/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateAuth= async (id: any, data: any)=>{
    return await instance.put(`/auth/update/${id}`,data)
}
export const SignupAuth =(auth: Iuser)=>{
    return instance.post('/auth/register', auth)
}
export const SigninAuth = async (data: any) => {
    return await instance.post("/auth/signin", data)
}