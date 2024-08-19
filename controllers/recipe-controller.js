import initKnex from "knex";
import configuration from "../knexfile.js";
import { body, param, validationResult } from "express-validator";
const knex = initKnex(configuration);

const getAllRecipes = async (req, res) => {
  try {
    const response = await knex("recipes").select(
      "recipes.id",
      "recipes.title",
      "recipes.description",
      "recipes.likes"
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving recipe list : ${error}`,
    });
  }
};

const getOneRecipe = async (req, res) => {
  try {
    const response = await knex("recipes").where({ id: req.params.id }).first();

    if (!response) {
      return res.status(404).json({
        message: `Recipe with ID ${req.params.id} not found`,
      });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve recipe data with the ID ${req.params.id}`,
    });
  }
};

const createRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }

  try {
    const fileBuffer = req.file.buffer; // File data as a Buffer
    const fileName = req.file.originalname; // Original file name
    const splitFileName = fileName.split(".");
    const fileType = splitFileName[splitFileName.length - 1];

    const reqBodyWithImg = {
      ...req.body,
      image: fileBuffer,
      image_type: fileType,
    };

    const result = await knex("recipes").insert(reqBodyWithImg);
    const newRecipeId = result[0];

    const createdRecipe = await knex("recipes")
      .where({ id: newRecipeId })
      .first();

    const createdRecipeWithImage = convertImage(createdRecipe);

    res.status(201).json(createdRecipeWithImage);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const convertImage = (recipe) => {
  const imageBase64 = recipe?.image ? recipe.image.toString("base64") : null;

  const recipeWithConvertedImg = {
    ...recipe,
    image: imageBase64,
  };

  return recipeWithConvertedImg;
};

const updateRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }

  try {
    const fileBuffer = req.file.buffer; // File data as a Buffer
    const fileName = req.file.originalname; // Original file name
    const splitFileName = fileName.split(".");
    const fileType = splitFileName[splitFileName.length - 1];

    const reqBodyWithImg = {
      ...req.body,
      image: fileBuffer,
      image_type: fileType,
    };

    const rowsUpdated = await knex("recipes")
      .where({ id: req.params.id })
      .update(reqBodyWithImg);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Recipe with ID ${req.params.id} not found`,
      });
    }
    const updatedRecipe = await knex("recipes")
      .where({
        id: req.params.id,
      })
      .first();

    const updatedRecipeWithImg = convertImage(updatedRecipe);

    res.json(updatedRecipeWithImg);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update recipe with ID ${req.params.id}: ${error}`,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const rowsDeleted = await knex("recipes")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Recipe with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete recipe: ${error}`,
    });
  }
};

const getOneImage = async (req, res) => {
  try {
    const recipe = await knex("recipes").where({ id: req.params.id }).first();

    if (!recipe) {
      return res.status(404).json({
        message: `Recipe with ID ${req.params.id} not found`,
      });
    }

    let imageData = null;

    if (recipe.image) {
      const imageBase64 = recipe.image.toString("base64");

      imageData = {
        image: imageBase64,
        image_type: recipe.image_type,
      };
    }
    res.json(imageData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve recipe data with the ID ${req.params.id}`,
    });
  }
};

const validate = (method) => {
  switch (method) {
    case "createRecipe": {
      return [
        body("title", "Please provide a valid title")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Title cannot be empty"),

        body("description", "Please provide a valid description")
          .trim()
          .isString()
          .optional(),

        body("ingredients", "Please provide valid ingredients")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Ingredients cannot be empty"),

        body("steps", "Please provide valid steps")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Steps cannot be empty"),
      ];
    }
    case "updateRecipe": {
      return [
        param("id", "Please provide a valid recipe ID")
          .isNumeric()
          .withMessage("Recipe ID must be a number"),

        body("title", "Please provide a valid title")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Title cannot be empty"),

        body("description", "Please provide a valid description")
          .trim()
          .isString()
          .optional(),

        body("ingredients", "Please provide valid ingredients")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Ingredients cannot be empty"),

        body("steps", "Please provide valid steps")
          .trim()
          .isString()
          .notEmpty()
          .withMessage("Steps cannot be empty"),
      ];
    }

    default:
      return [];
  }
};

export {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getOneImage,
  validate,
};
