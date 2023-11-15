
import status from 'http-status'
import catchAsync from '../../../../utils/catchAsync.js'
import { getAllUsers } from '../../service/Auth.js'

const getAllUser = catchAsync(async(req, res) => {
  const users = await getAllUsers()
    return res.status(status.OK).json(users)
})

export default getAllUser