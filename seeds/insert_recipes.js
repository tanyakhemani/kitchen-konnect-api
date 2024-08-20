import recipes from "../seed-data/recipes.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("recipes").del()
  await knex("recipes").insert(recipes);
};
