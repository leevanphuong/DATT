import instance from "~/app/api/instance/api";

export const getAllOrder = async () => {
    return await instance.get('/order/')
 }
 
 export const deleteOrder = async (userId: any) => {
    return await instance.delete('/order/' + userId)
 }
 export const updateOrder = async (dataBody: any, id: any) => {
    return await instance.put('/order/edit/' + id, dataBody)
 }
 
 export const createOrder = async (dataBody: any) => {
    return await instance.post(`/order/add`, dataBody)
 }
 