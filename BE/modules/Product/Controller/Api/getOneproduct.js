import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getOneproduct } from "../../Service/Product.js";
const getOneproducts = catchAsync(async(req,res)=>{
    const getOne = await getOneproduct(req)
    return res.status(status.OK).json(getOne)
})
export default getOneproducts