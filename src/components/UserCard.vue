<template>
  <div :value="userId" id="user-card" @click="selectUser">
    <div>
      <p>{{ userName }}</p>
      <p>{{ position }}</p>
    </div>
    <div>
      <p>{{ company }}</p>
      <p>{{ phone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ["userId", "userName", "position", "company", "phone", "selectUser"]
};
</script>

<style scoped>
#user-card {
  width: 300px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
#user-card:hover {
  cursor: pointer;
}
</style>
