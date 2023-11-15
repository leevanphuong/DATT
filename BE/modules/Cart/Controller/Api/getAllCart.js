import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllCart } from "../../Service/cart.js";
const getAllCarts = catchAsync(async (req, res) => {
    const carts = await getAllCart()
    return res.status(status.OK).json(carts)
})
export default getAllCarts