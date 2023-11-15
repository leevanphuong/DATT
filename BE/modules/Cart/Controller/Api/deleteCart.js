import { deleteCart } from '../../Service/cart.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const deleteCarts = catchAsync(async (req, res) => {
    const remove = await deleteCart(req)
    return res.status(status.OK).json(remove)
})
export default deleteCarts