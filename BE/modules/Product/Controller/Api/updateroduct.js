import catchAsync from "../../../../utils/catchAsync.js";
import { updateProduct } from "../../Service/Product.js";
import status from 'http-status'
const editProduct = catchAsync(async (req,res)=>{
    const product = await updateProduct(req)
    return res.status(status.OK).json(product)
})
export default editProduct