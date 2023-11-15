import instance from "../instance/api"
export const addOrder =(cart: any)=>{
    return instance.post('/order/add', cart)
}
export const getAllOrder =()=>{
    return instance.get('/order/')
}
export const removeOrder =(id:any)=>{
    return instance.delete(`/cart/${id}`)
}