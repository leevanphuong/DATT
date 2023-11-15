import getOneproducts from "./Api/getOneproduct.js";
import getAllProducts from "./api/getAllProduct.js";
import deleteProducts from "./Api/deleteProduct.js";
import addProducts from "./Api/addProduct.js";
import editProduct from "./Api/updateroduct.js";
const productController = {
   getOneproducts,
   getAllProducts,
   deleteProducts,
   addProducts,
   editProduct
}
export default productController