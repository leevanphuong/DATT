import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllProduct = async () => {
    return await axiosPrivate.get('/product')
}

export const deleteProduct = async (Id: any) => {
    return await axiosPrivate.delete('/product/' + Id)
}

export const createProduct = async (dataBody: any) => {
    return await axiosPrivate.post("/product/add", dataBody)
}

export const changeProduct = async (bodyRequest: any, userId: any) => {
    return await axiosPrivate.put('/product/edit/' + userId, bodyRequest)
}