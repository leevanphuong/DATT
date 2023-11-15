import catchAsync from "../../../../utils/catchAsync.js";
import { getOneAuthor } from "../../Service/Author.js";
import status from "http-status"
const getOneAuthors = catchAsync(async(req, res)=> {
    const Author = await getOneAuthor(req)
    return res.status(status.OK).json(Author)
})

export default getOneAuthors