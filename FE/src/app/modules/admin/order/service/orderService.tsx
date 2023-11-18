import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllOrder = async () => {
    return await axiosPrivate.get('/order/')
 }
 
 export const deleteOrder = async (userId: any) => {
    return await axiosPrivate.delete('/order/' + userId)
 }
 export const updateOrder = async (dataBody: any, id: any) => {
    return await axiosPrivate.put('/order/edit/' + id, dataBody)
 }
 
 export const createOrder = async (dataBody: any) => {
    return await axiosPrivate.post(`/order/add`, dataBody)
 }
 