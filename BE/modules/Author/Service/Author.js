import Author from '../Model/Author.js'

export const getAllAuthor = async (req) => {
    const Authors = await Author.find()
    return Authors
}
export const getOneAuthor = async (req) => {
    const Authors = await Author.findById(req.params.id)
    return Authors
}
export const removeAuthor = async (req) => {
    const removeAuthor = await Author.findByIdAndDelete(req.params.id)
    return removeAuthor
}
export const addAuthor= async (req) => {
    const addAuthor = await Author.create({
        ...req.body
    })
    return addAuthor
}
export const updateAuthor = async (req) => {
    const id = req.params.id
    const updateAuthor = await Author.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return updateAuthor
}