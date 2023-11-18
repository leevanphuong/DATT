import Product from "../Model/Product.js";
export const getOneproduct = async (req) => {
    const getOne = await Product.findById(req.params.id)
    return getOne
}
export const getAllProduct = async (limit) => {
    const products = await Product.find().limit(limit);
    return products;
  };
export const deleteProduct = async (req) => {
    const remove = await Product.findByIdAndDelete(req.params.id)
    return remove
}
export const addProduct = async (req) => {
    const products = await Product.create(req.body)
    return products
}
export const updateProduct= async (req) => {
    const id = req.params.id
    const update= await Product.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return update
}
