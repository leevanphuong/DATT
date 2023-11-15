import { createSlice } from "@reduxjs/toolkit";
import { getAllAuthor, getOneAuthor } from "./thunk/author.thunk";
const initialState = {
    authors: [],
    author: {}
} as any
export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAuthor.fulfilled, (state, action) => {
            state.authors = action.payload
        })
        builder.addCase(getOneAuthor.fulfilled, (state: any, action) => {
            state.authors = action.payload
        })
    }
})

export const { actions } = authorSlice

export default authorSlice.reducer