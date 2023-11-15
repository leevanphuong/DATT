
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { deleteUsers } from '../../service/Auth.js';
import Auth from '../../Model/Auth.js';

const deleteUser = catchAsync(async (req, res) => {
    const user = await Auth.findById(req.params.id);
    if (user.role === 'ADMIN') {
        return res.status(status.BAD_REQUEST).json("Không thể xóa tài khoản admin");
    }

    const remove = await deleteUsers(req)
    return res.status(status.OK).json(remove)
})
export default deleteUser