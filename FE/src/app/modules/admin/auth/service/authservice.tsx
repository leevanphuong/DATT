import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllAuth = async () => {
    return await axiosPrivate.get('/auth')
}

export const deleteAuth = async (userId: any) => {
    return await axiosPrivate.delete('/auth/' + userId)
}

export const createAuth = async (dataBody: any) => {
    return await axiosPrivate.post("/auth/add", dataBody)
}
