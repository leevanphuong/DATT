import instance from "~/app/api/instance/api"

export const getAllAuthor = async () => {
    return await instance.get('/author')
}

export const deleteAuthor = async (userId: any) => {
    return await instance.delete('/author/' + userId)
}

export const createAuthor = async (dataBody: any) => {
    return await instance.post("/author/add", dataBody)
}

export const changeAuthor = async (bodyRequest: any, userId: any) => {
    return await instance.put('/author/edit/' + userId, bodyRequest)
}