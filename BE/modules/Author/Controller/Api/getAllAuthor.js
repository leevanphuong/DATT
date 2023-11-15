import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllAuthor } from "../../Service/Author.js";
const getAllAuthors = catchAsync(async (req, res) => {
    const Author = await getAllAuthor()
    return res.status(status.OK).json(Author)
})
export default getAllAuthors