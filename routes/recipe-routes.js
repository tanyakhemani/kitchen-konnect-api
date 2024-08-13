import express from "express";
import * as recipeController from "../controllers/recipe-controller.js"

const router = express.Router();

router
    .route("/recipes")
    .get(recipeController.getAllRecipes)
    .post(
        recipeController.validate("createRecipe"),
        recipeController.createRecipe
    );

router
    .route("/recipes/:id")
    .get(recipeController.getOneRecipe)
    .put(
        recipeController.validate("updateRecipe"),
        recipeController.updateRecipe
    )
    .delete(recipeController.deleteRecipe);

export default router;