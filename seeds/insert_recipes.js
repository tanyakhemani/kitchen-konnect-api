import recipes from "../seed-data/recipes.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("recipe").del()
  await knex("recipe").insert(recipes);
};
