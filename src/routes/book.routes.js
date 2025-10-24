import { Router } from "express";
import bookController from "../controllers/book.controllers.js";

const router = Router();

router.post("/livros", bookController.create);
router.get("/livros", bookController.get);
router.get("/livros/:id", bookController.getById);
router.put("/livros/:id", bookController.update);
router.delete("/livros/:id", bookController.delete);

export default router;
