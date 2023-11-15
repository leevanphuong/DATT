import cartController from '../modules/Cart/Controller/index.js'
import express from 'express'

const router = express.Router()
router.get('/', cartController.getAllCarts)
router.delete('/:id', cartController.deleteCarts)
router.put('/update/:id', cartController.updateCarts)
router.post('/add', cartController.addCarts)
export default router

