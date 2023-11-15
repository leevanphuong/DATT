import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { deleteProduct } from "../../Service/Product.js";
const deleteProducts = catchAsync(async(req,res)=>{
    const remove = await deleteProduct(req)
    return res.status(status.OK).json(remove)
})
export default deleteProducts