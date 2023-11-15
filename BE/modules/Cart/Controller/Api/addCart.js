import { addCart } from '../../Service/cart.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import Cart from '../../Model/cart.js';
const addCarts = catchAsync(async (req, res) => {
    const { productID } = req.body;
    const checkCart = await Cart.findOne({ productID });
    if (checkCart) {
        return res.status(status.BAD_REQUEST).json('Sản phẩm đã có trong giỏ hàng.');
    }
    const newCart = await addCart(req);
    return res.status(status.OK).json(newCart);
});
export default addCarts