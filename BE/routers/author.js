import express from "express";
import authorController from "../modules/Author/Controller/index.js";
const router = express.Router()
router.get('/', authorController.getAllAuthors)
router.get('/:id', authorController.getOneAuthors)
router.delete('/:id', authorController.removeAuthor)
router.post('/add', authorController.addAuthors)
router.put('/edit/:id', authorController.updateAuthors)
export default router