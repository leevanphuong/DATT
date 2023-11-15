import catchAsync from "../../../../utils/catchAsync.js";
import { updateCategory } from "../../Service/Category.js";
import status from "http-status"

const editCategory = catchAsync(async(req,res)=>{
    const category = await updateCategory(req)
    return res.status(status.OK).json(category)
})

export default editCategory