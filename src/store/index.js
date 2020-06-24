import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    inputs: [
      { type: "text", label: "Full Name", name: "fullName", value: "" },
      { type: "text", label: "Position", name: "position", value: "" },
      {
        type: "text",
        label: "Manager's Name",
        name: "managerName",
        value: ""
      },
      { type: "text", label: "Company Name", name: "companyName", value: "" },
      { type: "phone", label: "Phone", name: "phone", value: "" },
      { type: "number", label: "Salary", name: "salary", value: "" },
      {
        type: "checkbox",
        label: "Currenty Employed",
        name: "currentlyEmployed",
        value: ""
      }
    ]
  },
  mutations: {
    handleChange: function(state, payload) {
      console.log(state);
      const index = state.inputs.findIndex(
        input => input.name === payload.name
      );
      if (payload.type === "checkbox") {
        return (state.inputs[index].value = payload.checked);
      }
      return (state.inputs[index].value = payload.value);
    },
    onSave: function() {
      console.log("save");
      router.push("/review");
    }
  },
  actions: {},
  modules: {}
});

export default store;
