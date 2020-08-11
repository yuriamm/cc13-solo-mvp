exports.up = function(knex) {
  return knex.schema.createTable("faqs", (table) => {
    table.increments().index();

    table.text("question").notNullable();

    table.text("answer");

    table.text("solved");
  });
};

exports.down = function(knex, Promise) {};
