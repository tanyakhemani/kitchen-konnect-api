import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllRecipes = async(req,res) => {
    res.send("All Recipes..");
}

const getOneRecipe = async(req,res) => {
    res.send("One Recipe, " + req.param("id"));
}

export { getAllRecipes, getOneRecipe };
