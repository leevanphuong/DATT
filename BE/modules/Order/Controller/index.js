import addOrders from "./Api/addOrder.js";
import deleteOrders from "./Api/deleteOrder.js";
import updateOrders from "./Api/updateOrder.js";
import getAllOrders from "./Api/getallOrder.js";
const orderController = {
    getAllOrders,
    addOrders,
    deleteOrders,
    updateOrders
}
export default orderController