<template>
  <div id="user-card"></div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    users: []
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user-card {
  border: 1px solid black;
  margin: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
