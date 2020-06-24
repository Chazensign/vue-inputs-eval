<template>
  <div class="input-form">
    <UserInput
      v-for="(input, index) in inputs"
      :key="index"
      :inputType="input.type"
      :inputLabel="input.label"
      :name="input.name"
      :inputValue="input.value"
      handleChange="handleChange"
    />
    <button @click="onSave">Process Info</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInput from "@/components/userInput.vue";
import store from "../store/index.js";

export default {
  name: "InputForm",
  computed: mapState({
    inputs: state => state.inputs
  }),
  data: function() {
    const vm = this,
      localInputs = vm.inputs;
    return { localInputs };
  },
  methods: {
    onSave: function() {
      store.commit("onSave");
    }
  },
  components: {
    UserInput
  }
};
</script>

<style scoped>
.input-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.input-line {
  padding: 2px;
}

a {
  color: #42b983;
}
</style>
