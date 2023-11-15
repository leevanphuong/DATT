import instance from "../instance/api"
import { Icate } from "~/app/interface/Category"
export const getAllCate =()=>{
    return instance.get('/category/')
}
export const getOneCate=(id: any)=>{
    return instance.get('/category/'+id)
}
export const removeCate =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!) // neu co accessToken thì cho thực hiện quyền 
    return instance.delete('/category/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateCate =(category: Icate)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.put('/category/'+category._id, category,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}
export const addProductCate =(category: Icate)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.post('/category', category,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}