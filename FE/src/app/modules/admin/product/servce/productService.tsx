import instance from "~/app/api/instance/api"

export const getAllProduct = async () => {
    return await instance.get('/product')
}

export const deleteProduct = async (Id: any) => {
    return await instance.delete('/product/' + Id)
}

export const createProduct = async (dataBody: any) => {
    return await instance.post("/product/add", dataBody)
}

export const changeProduct = async (bodyRequest: any, userId: any) => {
    return await instance.put('/product/edit/' + userId, bodyRequest)
}