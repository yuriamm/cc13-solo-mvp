<template>
  <div v-if="currentQuestion" class="edit-form">
    <h4>question</h4>
    <form>
      <div class="form-group">
        <label for="question">Question</label>
        <input type="text" class="form-control" id="question" v-model="currentQuestion.question" />
      </div>
      <div class="form-group">
        <label for="answer">Answer</label>
        <input type="text" class="form-control" id="answer" v-model="currentQuestion.answer" />
      </div>

      <div class="form-group">
        <label>
          <strong>Status:</strong>
        </label>
        {{ currentQuestion.solved ? "Solved" : "Unsolved" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentQuestion.solved"
      @click="updateSolved(false)"
    >UnSolved</button>
    <button v-else class="badge badge-primary mr-2" @click="updateSolved(true)">Solved?</button>

    <button class="badge badge-danger mr-2" @click="deleteQuestion">Delete</button>

    <button type="submit" class="badge badge-success" @click="update">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Click on a question!</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "question",
  data() {
    return {
      currentQuestion: null,
      message: "",
    };
  },
  methods: {
    getquestion(id) {
      DataService.get(id)
        .then((response) => {
          console.log(this.$route);
          this.currentQuestion = response[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateSolved(status) {
      let data = {
        id: this.currentQuestion.id,
        question: this.currentQuestion.question,
        answer: this.currentQuestion.answer,
        solved: status,
      };

      DataService.update(this.currentQuestion.id, data)
        .then((response) => {
          console.log(data);
          this.currentQuestion.solved = status;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    update() {
      DataService.update(this.currentQuestion.id, this.currentQuestion)
        .then((response) => {
          console.log(response);
          this.message = "Question updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteQuestion() {
      DataService.deleteOne(this.currentQuestion.id)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "questions" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.message = "";
    this.getquestion(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
