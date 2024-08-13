import express from "express";
import * as recipeController from "../controllers/recipe-controller.js"

const router = express.Router();

router
    .route("/recipes")
    .get(recipeController.getAllRecipes);

router
    .route("/recipes/:id")
    .get(recipeController.getOneRecipe);

export default router;