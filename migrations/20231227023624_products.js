/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('brand').notNullable();
        table.string('title').notNullable();
        table.string('price').notNullable();
        table.string('imagePath').notNullable();
        table.string('itemURL').notNullable();
        table.json('sizing').nullable(); //json allows a filed to be either a string or an array
        table.json('description').nullable();
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
  