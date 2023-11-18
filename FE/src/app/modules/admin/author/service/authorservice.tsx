import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllAuthor = async () => {
    return await axiosPrivate.get('/author')
}

export const deleteAuthor = async (userId: any) => {
    return await axiosPrivate.delete('/author/' + userId)
}

export const createAuthor = async (dataBody: any) => {
    return await axiosPrivate.post("/author/add", dataBody)
}

export const changeAuthor = async (bodyRequest: any, userId: any) => {
    return await axiosPrivate.put('/author/edit/' + userId, bodyRequest)
}