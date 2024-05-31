
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('empresas', function(table){
        table.increments();
        table.string('nome').notNullable();
        table.string('cnpj').notNullable();
        table.string('endereco').notNullable();
        table.integer('telefone').notNullable();
        table.string('email').notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
