import Category from "../Model/Category.js";

export const getAllCategory = async () => {
    const getAll = await Category.find()
    return getAll
}
export const getOneCategory = async (req) => {
    const getOne = await Category.findById(req.params.id)
    return getOne
}
export const deleteCategory = async (req) => {
    const remove = await Category.findByIdAndDelete(req.params.id)
    return remove
}
export const addCategory= async (req) => {
    const categorys = await Category.create(req.body)
    return categorys
}
export const updateCategory= async (req) => {
    const id = req.params.id
    const update= await Category.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return update
}

