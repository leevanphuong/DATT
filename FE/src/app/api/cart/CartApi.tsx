import { Icart } from "~/app/interface/Cart"
import instance from "../instance/api"
export const addCart =(cart: any)=>{
    return instance.post('/cart/add', cart)
}
export const getAllCart =()=>{
    return instance.get('/cart/')
}
export const removeCart =(id:any)=>{
    return instance.delete(`/cart/${id}`)
}