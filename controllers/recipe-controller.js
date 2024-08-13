import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllRecipes = async(req,res) => {
    try{
        const response = await knex("recipes");
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({
            message: `Error retrieving recipe list : ${error}`
        });
    }
}

const getOneRecipe = async(req,res) => {
    try{
        const response = await knex("recipes")
            .where({ id: req.params.id})
            .first();

        if(!response){
            return res.status(404).json({
                message: `Recipe with ID ${req.params.id} not found`
            });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve recipe data with the ID ${req.params.id}`
        });
    }
}

const createRecipe = async(req,res) => {
    if(!req.body.title){
        return res.status(400).json({
            message: "Please provide recipe title in the request"
        });
    }
    try {
        const result = await knex("recipes").insert(req.body);
        const newRecipeId = result[0];
        const createdRecipe = await knex("recipes").where({id:newRecipeId}).first();
        
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`
        });
    }
};

const updateRecipe = async(req,res) => {
    try {
        const rowsUpdated = await knex("recipes")
            .where({id: req.params.id})
            .update(req.body);
        
        if(rowsUpdated === 0){
            return res.status(404).json({
                message: `Recipe with ID ${req.params.id} not found`
            });
        }
        const updatedRecipe = await knex("recipes")
            .where({
                id: req.params.id
            })
            .first();

        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update recipe with ID ${req.params.id}: ${error}`
        });
    }
}

const deleteRecipe = async(req,res) => {
    try {
        const rowsDeleted = await knex("recipes")
            .where({id: req.params.id})
            .delete();
        
        if(rowsDeleted === 0){
            return res
                .status(404)
                .json({message : `Recipe with ID ${req.params.id} not found`});
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete recipe: ${error}`
        });
    }
}

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe };
