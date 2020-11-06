
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.integer('level').unsigned();
      })
};

exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('level');
      })    
};
