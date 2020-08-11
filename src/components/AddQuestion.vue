<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Question</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="question.title"
          name="title"
        />
      </div>

      <button @click="save" class="btn btn-outline-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn bte-outine-success" @click="newQuestion">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "AddQuestion",
  data() {
    return {
      question: {
        title: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    save() {
      let data = {
        question: this.question.title,
      };

      DataService.create(data)
        .then((response) => {
          console.log(response);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newQuestion() {
      this.submitted = false;
      this.question = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
