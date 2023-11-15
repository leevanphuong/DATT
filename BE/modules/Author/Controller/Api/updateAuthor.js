import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { updateAuthor } from "../../Service/Author.js";
const updateAuthors = catchAsync(async(req,res)=>{
    const Author = await updateAuthor(req)
    return res.status(status.OK).json(Author)
})

export default updateAuthors