import Order from "../Model/Order.js";
export const getAllOrder = async () => {
    const getAll = await Order.find()
    return getAll
}
export const deleteOrder = async (req) => {
    const remove = await Order.findByIdAndDelete(req.params.id)
    return remove
}
export const addOrder= async (req) => {
    const Orders = await Order.create({
        ...req.body
    })
    return Orders
}
export const updateOrder = async (req) => {
    const id = req.params.id
    const updateOrders = await Order.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return updateOrders
}

