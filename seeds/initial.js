const fs = require("fs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("faqs")
    .del()
    .then(async function() {
      // Inserts seed entries
      const questions = JSON.parse(fs.readFileSync("./data/faq.json"));
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const answer = questions[i].answer;

        await knex("faqs").insert({ question, answer });
      }
    });
};
