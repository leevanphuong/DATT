import registers from "./Api/register.js"
import signIn from "./Api/signIn.js"
import getAllUser from "./Api/getAllUser.js"
import getOneUser from "./Api/getOneUser.js"
import deleteUser from './Api/deleteUser.js';
import updateUser from './Api/updateUser.js';
const authController = {
    registers,
    signIn,
    getAllUser,
    getOneUser,
    deleteUser,
    updateUser
}
export default authController