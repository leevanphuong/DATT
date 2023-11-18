import instance from "../instance/api"
import { Icate } from "~/app/interface/Category"
import { axiosPrivate } from "../ConfigApi"
export const getAllCate =()=>{
    return axiosPrivate.get('/category/')
}
export const getOneCate=(id: any)=>{
    return axiosPrivate.get('/category/'+id)
}
export const removeCate =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!) // neu co accessToken thì cho thực hiện quyền 
    return axiosPrivate.delete('/category/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateCate =(category: Icate)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.put('/category/'+category._id, category,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}
export const addProductCate =(category: Icate)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.post('/category', category,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}