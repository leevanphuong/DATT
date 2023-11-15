import { createSlice } from "@reduxjs/toolkit";
import { getAllcategory, getOneCate } from "./thunk/category.thunk";

const initialState = {
    categorys: [],
    category:{}
} as any
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllcategory.fulfilled, (state, action) => {
            state.categorys = action.payload
        })
        builder.addCase(getOneCate.fulfilled, (state, action) => {
            state.category = action.payload
        })
    }
})

export const { actions } = categorySlice

export default categorySlice.reducer