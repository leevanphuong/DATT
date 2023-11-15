import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosPrivate } from "~/app/api/ConfigApi"

export const getOneUser = createAsyncThunk("auth/getoneuser", async (id: any) => {
    const response = await axiosPrivate.get(`/auth/${id}`)
    return response.data
})