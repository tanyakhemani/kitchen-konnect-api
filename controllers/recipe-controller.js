import initKnex from "knex";
import configuration from "../knexfile.js";
import { body, param, validationResult } from "express-validator";
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors
            .array()
            .map((err) => extractedErrors.push({ [err.path]: err.msg }));
        return res.status(400).json({ errors: extractedErrors });
    }

    try {
        const result = await knex("recipes").insert(req.body);
        const newRecipeId = result[0];
        const createdRecipe = await knex("recipes").where({id: newRecipeId}).first();
        
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`
        });
    }
};

const updateRecipe = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors
            .array()
            .map((err) => extractedErrors.push({ [err.path]: err.msg }));
        return res.status(400).json({ errors: extractedErrors });
    }

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

const validate = (method) => {
    switch(method){
        case "createRecipe": {
            return [
                body("title", "Please provide a valid title")
                    .isString()
                    .notEmpty()
                    .withMessage('Title cannot be empty'),

                body("description", "Please provide a valid description")
                    .isString()
                    .optional(),

                body("ingredients", "Please provide valid ingredients")
                    .isString()
                    .notEmpty()
                    .withMessage("Ingredients cannot be empty"),

                body("steps", "Please provide valid steps")
                    .isString()
                    .notEmpty()
                    .withMessage("Steps cannot be empty")
            ];
        }
        case "updateRecipe": {
            return [
                param("id", "Please provide a valid recipe ID")
                    .isNumeric()
                    .withMessage("Recipe ID must be a number"),

                body("title", "Please provide a valid title")
                    .isString()
                    .notEmpty()
                    .withMessage('Title cannot be empty'),

                body("description", "Please provide a valid description")
                    .isString()
                    .optional(),

                body("ingredients", "Please provide valid ingredients")
                    .isString()
                    .notEmpty()
                    .withMessage("Ingredients cannot be empty"),

                body("steps", "Please provide valid steps")
                    .isString()
                    .notEmpty()
                    .withMessage("Steps cannot be empty")
            ];
        }

        default:
            return[];
    }
};

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe, validate };
