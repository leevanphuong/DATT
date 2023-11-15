import instance from "../instance/api"
import { Iproduct } from "~/app/interface/Product"
export const getNumberProduct =()=>{
    return instance.get('/product?limit=6')
}
export const getAllProduct =()=>{
    return instance.get('/product/')
}
export const getOneProduct=(id: any)=>{
    return instance.get('/product/'+id)
}
export const removeProduct =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.delete('/product/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateProduct =(product: Iproduct)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.put('/product/'+product._id, product,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}
export const addProduct =(product:Iproduct )=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return instance.post('/product', product,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}