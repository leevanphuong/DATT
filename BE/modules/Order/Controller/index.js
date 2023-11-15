import addOrders from "./Api/addOrder.js";
import deleteOrders from "./Api/deleteOrder.js";
import updateOrders from "./Api/updateOrder.js";
import getAllOrders from "./Api/getallOrder.js";
import getOneOrders from "./Api/getOneOrder.js";
const orderController = {
    getAllOrders,
    addOrders,
    deleteOrders,
    updateOrders,
    getOneOrders
}
export default orderController