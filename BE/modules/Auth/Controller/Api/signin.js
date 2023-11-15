import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { signin } from "../../service/Auth.js";
import Auth from '../../Model/Auth.js';
import bcrypt from 'bcrypt'

const signIn=catchAsync(async(req,res)=>{
    const {email, password} = req.body
    const user = await Auth.findOne({email});
    if(!user){
        return res.status(status.BAD_REQUEST).json('Người dùng không tồn tại')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(status.BAD_REQUEST).json("Mật khẩu không đúng");
      }

    const auth = await signin(user)
    return res.status(status.OK).json(auth)
})
export default signIn

