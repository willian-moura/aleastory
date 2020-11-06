exports.up = function(knex) {
    return knex.schema.createTable('users', function (table){
        table.increments();
        table.string('username').notNullable;
        table.string('password').notNullable;
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('users');
};