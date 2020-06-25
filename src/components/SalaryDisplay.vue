<template>
  <div id="salary-disp">
    <h2>Salary Adjustment</h2>
    <div id="values-wrapper">
      <div class="value-cont">
        <p class="salary-area">Base</p>
        <p class="value">${{ +salary || 0 }}</p>
      </div>
      <div class="value-cont">
        <p class="salary-area">West Coast</p>
        <p class="value">${{ +salary * 0.6 || 0 }}</p>
      </div>
      <div class="value-cont">
        <p class="salary-area">Mid-West</p>
        <p class="value">${{ +salary * 1.2 || 0 }}</p>
      </div>
      <div class="value-cont">
        <p class="salary-area">East Coast</p>
        <p class="value">${{ +salary * 0.8 || 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalaryDisplay",
  props: ["salary"]
};
</script>

<style scoped>
#salary-disp {
  position: relative;
  display: flex;
  width: 450px;
  height: 90px;
  border: 1px solid black;
  margin: 10px;
}
h2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  background: lightgrey;
  margin: 0;
}
#values-wrapper {
  width: 100%;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
}
p {
  margin-bottom: 0;
}
.salary-area {
  font-weight: 600;
}
.value-cont {
  width: 100%;
}
.value {
  border-top: 2px solid black;
  height: 30px;
  background: lightgrey;
  margin-top: 0;
}
</style>
