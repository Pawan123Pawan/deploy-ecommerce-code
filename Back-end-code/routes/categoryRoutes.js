import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  categoryUpdateController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();
//create routes

//category route
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category route
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryUpdateController
);

// get category route
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category route
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
