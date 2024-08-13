import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllRecipes = async(req,res) => {
    res.send("All Recipes..");
}

const getOneRecipe = async(req,res) => {
    res.send("One Recipe, " + req.param("id"));
}

const createRecipe = async(req,res) => {
    res.send(req.body);
}

const updateRecipe = async(req,res) => {
    res.send({"name":"htrhrth"});
}

const deleteRecipe = async(req,res) => {
    return res.status(204).send();
}

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe };
