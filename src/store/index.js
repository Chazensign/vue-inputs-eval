import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
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
        value: "false"
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

    setValidation: function(state, payload) {
      return payload;
    }
  },
  actions: {
    onSave: function({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch("validateInfo")
          .then(errors => {
            reject(errors);
          })
          .catch(() => {
            let userObj = {};

            state.inputs.forEach(infoObj => {
              userObj = { ...userObj, [infoObj.name]: infoObj.value };
            });

            // axios.post("/api/user", userObj);
            console.log("save", userObj);
            router.push("/review");
            resolve(userObj);
          });
      });
    },

    validateInfo: function({ state }) {
      return new Promise((resolve, reject) => {
        const validationErrors = state.inputs.filter(
          input => !input.value && input.type !== "checkbox"
        );

        if (validationErrors.length > 0) {
          resolve(validationErrors);
        }
        reject(false);
      });
    }
  },
  modules: {}
});

export default store;
