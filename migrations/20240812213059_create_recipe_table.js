/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable().unique();
    table.string("description", 1000);
    table.string("ingredients", 1000).notNullable();
    table.string("steps", 2000).notNullable();
    table.integer("likes").defaultTo(0).notNullable();
    table.specificType("image", "MEDIUMBLOB");
    table.string("image_type");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("recipes");
}
