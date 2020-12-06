exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.integer("wins").unsigned();
    table.integer("bigger_score").unsigned();
    table.integer("matches_played").unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("wins");
    table.dropColumn("bigger_score");
    table.dropColumn("matches_played");
  });
};
