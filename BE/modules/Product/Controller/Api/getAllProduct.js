import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllProduct } from "../../Service/Product.js";
const getAllProducts = catchAsync(async (req, res) => {
    const limit = req.query.limit || 0; 
    const products = await getAllProduct(limit);
    return res.status(status.OK).json(products);
  });
  
export default getAllProducts