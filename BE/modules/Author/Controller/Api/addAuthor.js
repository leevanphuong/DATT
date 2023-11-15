import {addAuthor} from "../../Service/Author.js"
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const addAuthors= catchAsync(async (req, res) => {
    const authors = await addAuthor(req)
    return res.status(status.OK).json(authors)
})
export default addAuthors