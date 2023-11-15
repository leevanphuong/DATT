import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { addProduct } from "../../Service/Product.js";


const addProducts = catchAsync(async (req, res) => {
    if (!req.body.categoryId) {
        return res.status(status.NOT_FOUND).json("Đang thiếu danh mục")
    }
    const products = await addProduct(req)
    return res.status(status.OK).json(products)
})
export default addProducts