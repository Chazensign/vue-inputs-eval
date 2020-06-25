<template>
  <main>
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
      <div class="button-wrapper">
        <button @click="clearInputs">Clear</button>
        <button @click="onSave">Process Info</button>
      </div>
    </div>
    <div>
      <p>
        You can submit multiple users to and view a list of all the cards. To
        view salary information click on a user card.
      </p>
    </div>
    <div id="lower-boxes">
      <section id="cards-cont">
        <userCard
          v-for="user in users"
          :key="user.userId"
          :userId="user.userId"
          :userName="user.fullName"
          :position="user.position"
          :company="user.companyName"
          :phone="user.phone"
          :selectUser="selectUser"
        />
      </section>
      <aside>
        <SalaryDisplay :salary="salary" />
      </aside>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import UserInput from "@/components/userInput.vue";
import UserCard from "@/components/UserCard.vue";
import SalaryDisplay from "@/components/SalaryDisplay.vue";
import store from "../store/index.js";

export default {
  name: "InputForm",
  computed: mapState({
    inputs: state => state.inputs,
    salary: state => (state.selectedUser ? state.selectedUser.salaryNumber : 0),
    users: state => state.users,
    selectedUser: state => state.selectedUser
  }),

  methods: {
    onSave: function() {
      store
        .dispatch("onSave")
        .then(res => {
          return alert(res);
        })
        .catch(err => {
          if (typeof err === "string") {
            return alert(err);
          }
        });
    },
    selectUser: function(event) {
      const id = event.target.attributes.value.value;
      const clickedUser = this.users.find(user => user.userId === +id);
      store.commit("selectUser", clickedUser);
      store.commit("setValues", clickedUser);
    },
    clearInputs: function() {
      store.commit("setValues", {});
    }
  },
  components: {
    UserInput,
    UserCard,
    SalaryDisplay
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
.button-wrapper {
  display: flex;
  justify-content: space-between;
  width: 75%;
}
#lower-boxes {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}
#cards-cont {
  display: flex;
  flex-wrap: wrap;
}
</style>
