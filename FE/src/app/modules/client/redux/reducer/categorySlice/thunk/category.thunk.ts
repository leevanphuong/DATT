import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllcategory = createAsyncThunk("category/", async () => {
    const response = await axiosPrivate.get("/category")
    return response.data
})
export const getOneCate = createAsyncThunk("category/getonecate", async (id: any) => {
    const response = await axiosPrivate.get(`/category/${id}`)
    return response.data
})