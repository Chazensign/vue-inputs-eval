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
      { type: "tel", label: "Phone", name: "phone", value: "" },
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
    },
    setValues: function(state, payload) {
      const inputsWithValues = state.inputs.map(input => {
        return { ...input, value: payload[input.name] || "" };
      });
      return (state.inputs = inputsWithValues);
    }
  },
  actions: {
    onSave: function({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/validate", { inputs: state.inputs })
          .then(res => {
            let userObj = {};

            state.inputs.forEach(infoObj => {
              userObj = { ...userObj, [infoObj.name]: infoObj.value };
            });
            userObj.salaryNumber = +res.data;
            axios.post("/api/user", userObj).then(res => {
              const { users, message } = res.data;

              commit("updateUsers", users);
              commit("selectUser", null);
              commit("setValues", {});
              resolve(message);
            });
          })
          .catch(err => {
            reject(err.response.data.message);
          });
      });
    }
  },
  modules: {}
});

export default store;
