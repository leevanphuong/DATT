import instance from "../instance/api"
import { Iproduct } from "~/app/interface/Product"
import { axiosPrivate } from "../ConfigApi"

export const getNumberProduct =()=>{
    return axiosPrivate.get('/product?limit=6')
}
export const getAllProduct =()=>{
    return axiosPrivate.get('/product/')
}
export const getOneProduct=(id: any)=>{
    return axiosPrivate.get('/product/'+id)
}
export const removeProduct =(id: number|string)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.delete('/product/'+id,{
        headers:{
            Authorization: `Bearer ${accessToken}` 
        },
        
    })
}
export const updateProduct =(product: Iproduct)=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.put('/product/'+product._id, product,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}
export const addProduct =(product:Iproduct )=>{
    const {accessToken}= JSON.parse(localStorage.getItem('user')!)
    return axiosPrivate.post('/product', product,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        },
        
    })
}