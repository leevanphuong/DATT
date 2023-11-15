import express from "express"
import ProductRouter from "./product.js"
import CategoryRouter from './category.js'
import authRouter from './auth.js'
import OrderRouter from "./order.js"
import AuthorRouter from "./author.js"
import CartRouter from "./cart.js"
const router = express.Router();

const defaultRouter = [
  { path: "/product", route: ProductRouter },
  { path: "/category", route: CategoryRouter },
  { path: '/auth', route: authRouter },
  { path: "/order", route: OrderRouter },
  { path: "/author", route: AuthorRouter },
  { path: "/cart", route: CartRouter}
]
defaultRouter.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
