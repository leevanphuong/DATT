import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/ConfigApi"

export const getAllAuthor = createAsyncThunk("author/getAllauthor", async () => {
    const response = await axiosPrivate.get("/author")
    return response.data
})
export const getOneAuthor = createAsyncThunk("product/getoneauthor", async (id: any) => {
    const response = await axiosPrivate.get(`/author/${id}`)
    return response.data
})