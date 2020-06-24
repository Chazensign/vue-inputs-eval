<template>
  <div class="input-line">
    <label :for="name">{{ inputLabel }}</label>
    <input
      @change="onInputChange"
      :id="name"
      :name="name"
      :type="inputType"
      :value="inputValue"
    />
  </div>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "UserInput",
  props: ["inputValue", "inputLabel", "name", "inputType"],
  methods: {
    onInputChange: function(event) {
      store.commit("handleChange", event.target);
    }
  }
};
</script>

<style scoped>
label {
  font-family: sans-serif;
  font-size: 16px;
  margin: 0 10px;
  font-weight: 500;
}
</style>
