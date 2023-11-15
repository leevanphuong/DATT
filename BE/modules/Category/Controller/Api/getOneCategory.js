import catchAsync from "../../../../utils/catchAsync.js";
import { getOneCategory } from "../../Service/Category.js";
import status from "http-status"
const getOneCategorys = catchAsync(async(req, res)=> {
    const categoryAPI = await getOneCategory(req)
    return res.status(status.OK).json(categoryAPI)
})

export default getOneCategorys