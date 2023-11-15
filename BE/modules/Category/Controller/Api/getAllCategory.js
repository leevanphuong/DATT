import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllCategory } from "../../Service/Category.js";
const getAllCategorys = catchAsync(async (req, res) => {
    const Category = await getAllCategory()
    return res.status(status.OK).json(Category)
})
export default getAllCategorys