import { deleteOrder } from '../../Service/order.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const deleteOrders = catchAsync(async (req, res) => {
    const remove = await deleteOrder(req)
    return res.status(status.OK).json(remove)
})
export default deleteOrders