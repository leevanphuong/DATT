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
export const addCategory = async (req) => {
    const fileImages = req.files
    const check = fileImages.flatMap((item) => item.path)
    const categorys = await Category.create({
        ...req.body,
        images: check
    })
    return categorys
}
export const updateCategory = async (req) => {
    const id = req.params.id
    const fileImages = req.files
    const check = fileImages.flatMap((item) => item.path)
    const update = await Category.updateOne({
        _id: id
    },
        {
            ...req.body,
            images: check
        }
    )
    return update
}

