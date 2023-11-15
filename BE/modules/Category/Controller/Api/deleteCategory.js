import { deleteCategory } from "../../Service/Category.js";
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";

const deleteCategorys = catchAsync(async (req, res) => {
    const remove = await deleteCategory(req)
    return res.status(status.OK).json(remove)
})
export default deleteCategorys