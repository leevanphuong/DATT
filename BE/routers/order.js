import express from 'express'
import orderController from '../modules/Order/Controller/index.js'
const router = express.Router()
router.post('/add', orderController.addOrders)
router.put('/edit/:id', orderController.updateOrders)
router.get('/', orderController.getAllOrders)
router.delete('/:id', orderController.deleteOrders)
export default router