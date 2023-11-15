import instance from "~/app/api/instance/api"

export const getAllCategory = async () => {
    return await instance.get('/category')
}

export const deleteCategory = async (userId: any) => {
    return await instance.delete('/category/' + userId)
}

export const createCategory = async (dataBody: any) => {
    return await instance.post("/category/add", dataBody)
}

export const changeCategory = async (bodyRequest: any, userId: any) => {
    return await instance.put('/category/edit/' + userId, bodyRequest)
}