import { removeAuthor } from '../../Service/Author.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";

const removeAuthors = catchAsync(async (req, res) => {
    const remove = await removeAuthor(req)
    return res.status(status.OK).json(remove)
})
export default removeAuthors