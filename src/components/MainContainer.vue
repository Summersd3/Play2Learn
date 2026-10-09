<template>
  <main class="main-container">
    <slot></slot>
    <SelectInput label="Maximum Number" id="max-number" :options="numbers" />
 </main>
</template>


<script>
export default {
  name: 'MainContainer'
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  padding: 30px 20px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #0b1026, #000000);
  color: white;
}
</style>