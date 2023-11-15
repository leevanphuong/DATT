import { addCategory } from '../../Service/Category.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const addCategorys = catchAsync(async (req, res) => {
    const categorys = await addCategory(req)
    return res.status(status.OK).json(categorys)
})
export default addCategorys