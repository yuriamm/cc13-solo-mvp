<template>
  <div>
    <div v-if="currentQuestion" class="edit-form">
      <h4>Question</h4>
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
        class="btn btn-outline-primary mr-4"
        v-if="currentQuestion.solved"
        @click="updateSolved(false)"
      >UnSolved</button>
      <button v-else class="btn btn-outline-primary mr-4" @click="updateSolved(true)">Solved?</button>

      <button class="btn btn-outline-danger mr-4" @click="deleteQuestion">Delete</button>

      <button type="submit" class="btn btn-outline-success" @click="update">Update</button>

      <div class="success" v-if="submitted">
        <p>{{ message }}</p>
      </div>
    </div>

    <div v-if="!currentQuestion">
      <br />
      <p>Click on a question!</p>
    </div>
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
      submitted: false,
    };
  },
  methods: {
    getQuestion(id) {
      DataService.get(id)
        .then((response) => {
          console.log(response);
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
          this.submitted = true;
          this.message = "Question status changed successfully!";
          console.log("is that update", response);
          console.log("submitted", this.submitted);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    update() {
      DataService.update(this.currentQuestion.id, this.currentQuestion)
        .then((response) => {
          console.log(response);
          this.submitted = true;
          this.message = "Question updated successfully!";
          console.log("submitted", this.submitted);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteQuestion() {
      DataService.deleteOne(this.currentQuestion.id)
        .then((response) => {
          console.log(response);
          this.submitted = true;
          console.log("submitted", this.submitted);
          this.message = "Question deleted successfully!";
          this.$router.push({ name: "questions" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.message = "";
    this.getQuestion(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
