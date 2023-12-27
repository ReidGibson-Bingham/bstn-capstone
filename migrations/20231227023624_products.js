/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('category').notNullable();
      table.string('brand').notNullable();
      table.string('description').notNullable();
      table.string('title').notNullable();
      table.decimal('price', 10, 2).notNullable(); // Assuming a decimal type for price, adjust as needed
      table.string('imageURL').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('products');
  };
  