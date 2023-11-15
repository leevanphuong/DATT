import Cart from "../Model/cart.js"

export const getAllCart = async () => {
    const getAll = await Cart.find()
    return getAll
}
export const deleteCart = async (req) => {
    const remove = await Cart.findByIdAndDelete(req.params.id)
    return remove
}
export const addCart= async (req) => {
    const Carts = await Cart.create({
        ...req.body
    })
    return Carts
}
export const updateCart = async (req) => {
    const id = req.params.id
    const updateCarts = await Cart.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return updateCarts
}

