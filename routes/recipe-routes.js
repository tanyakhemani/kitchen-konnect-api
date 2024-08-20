import express from "express";
import * as recipeController from "../controllers/recipe-controller.js";
import multer from "multer";

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage: storage });

router
  .route("/recipes")
  .get(recipeController.getAllRecipes)
  .post(
    upload.single("image"),
    recipeController.validate("createRecipe"),
    recipeController.createRecipe
  );

router
  .route("/recipes/:id")
  .get(recipeController.getOneRecipe)
  .put(
    upload.single("image"),
    recipeController.validate("updateRecipe"),
    recipeController.updateRecipe
  )
  .delete(recipeController.deleteRecipe);

router.route("/recipes/:id/images").get(recipeController.getOneImage);

router.route("/recipes/:id/likes").put(recipeController.updateRecipeLikes);

export default router;
