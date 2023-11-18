import { axiosPrivate } from "../ConfigApi"
export const addCart =(cart: any)=>{
    return axiosPrivate.post('/cart/add', cart)
}
export const getAllCart =()=>{
    return axiosPrivate.get('/cart/')
}
export const removeCart =(id:any)=>{
    return axiosPrivate.delete(`/cart/${id}`)
}