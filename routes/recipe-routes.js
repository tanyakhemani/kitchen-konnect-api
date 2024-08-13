import express from "express";
import * as recipeController from "../controllers/recipe-controller.js"

const router = express.Router();

router
    .route("/recipes")
    .get(recipeController.getAllRecipes);

router
    .route("/recipes/:id")
    .get(recipeController.getOneRecipe);

router
    .route("/recipes")
    .post(recipeController.createRecipe);

router
    .route("/recipes/:id")
    .put(recipeController.updateRecipe);

router
    .route("/recipes/:id")
    .delete(recipeController.deleteRecipe);

export default router;