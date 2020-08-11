<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by keyword" v-model="keyword" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Questions</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(question, index) in questions"
          :key="index"
          @click="setActivequestion(question, index)"
        >{{ question.question }}</li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentQuestion">
        <h4>Detail</h4>
        <div>
          <label>
            <strong>Question:</strong>
          </label>
          {{ currentQuestion.question }}
        </div>
        <div>
          <label>
            <strong>Answer:</strong>
          </label>
          {{ currentQuestion.answer }}
        </div>
        <div>
          <label>
            <strong>Status:</strong>
          </label>
          {{ currentQuestion.solved ? "Solved" : "Unsolved" }}
        </div>

        <a class="btn btn-outline-warning" :href="'/questions/' + currentQuestion.id">Edit</a>
      </div>
      <div v-else>
        <br />
        <p>Choose a question</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "QuestionList",
  data() {
    return {
      questions: [],
      currentQuestion: null,
      currentIndex: -1,
      keyword: "",
    };
  },
  methods: {
    retrieve() {
      DataService.getAll()
        .then((response) => {
          this.questions = response;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setActivequestion(question, index) {
      this.currentQuestion = question;
      this.currentIndex = index;
    },

    search() {
      DataService.findByKeyword(this.keyword)
        .then((response) => {
          this.questions = response;
          console.log("is this", response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieve();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
