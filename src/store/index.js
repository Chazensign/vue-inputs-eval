import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      { type: "text", label: "Salary", name: "salary", value: "" },
      {
        type: "checkbox",
        label: "Currenty Employed",
        name: "currentlyEmployed",
        value: "false"
      }
    ],
    users: [],
    selectedUser: null
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

    updateUsers: function(state, payload) {
      return (state.users = payload);
    },

    selectUser: function(state, payload) {
      return (state.selectedUser = payload);
    },

    setValidation: function(state, payload) {
      return payload;
    }
  },
  actions: {
    onSave: function({ state, dispatch, commit }) {
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

            axios.post("/api/user", userObj).then(res => {
              const { users, userId, message } = res.data;

              commit("updateUsers", users);
              commit("selectUser", userId);
              resolve(message);
              console.log("save", userId);
            });
          });
      });
    },

    validateInfo: function({ state }) {
      const { inputs } = state;
      return new Promise((resolve, reject) => {
        const validationErrors = state.inputs.filter(
          input => !input.value && input.type !== "checkbox"
        );

        if (validationErrors.length > 0) {
          resolve(validationErrors);
        }

        const salaryInput = inputs.find(input => input.name === "salary");

        // eslint-disable-next-line no-useless-escape
        const regex = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
        const validSalary = regex.test(salaryInput.value);
        if (!validSalary) {
          resolve("Salary input is invalid.");
        }
        const salaryNumber = salaryInput.value.replace(/[^0-9.]/g, "");
        if (+salaryNumber < 10000) {
          resolve("Salary must be greater than $10,000.");
        }
        reject(false);
      });
    }
  },
  modules: {}
});

export default store;
