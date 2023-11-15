import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/ConfigApi"


export const getAllOrder = createAsyncThunk("order/getallorder", async () => {
    const response = await axiosPrivate.get("/order")
    return response.data
})