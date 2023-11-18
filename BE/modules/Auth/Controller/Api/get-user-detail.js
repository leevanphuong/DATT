import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { getUserDetails } from '../../service/Auth.js';
const getUserDetail = catchAsync(async(req,res)=>{
    const user = await getUserDetails(req.query)
    return res.status(status.OK).json(user)
})
export default getUserDetail