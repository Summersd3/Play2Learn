<template>
  <main class="start-screen">
    <h1>Play2Learn</h1>

    <button @click="$router.push('/math-facts')">
      Math Facts
    </button>

    <button @click="$router.push('/anagram-hunt')">
      Anagram Hunt
    </button>
  </main>
</template>

<script>
export default {
  name: 'StartScreen'
}

</script>

<style scoped>
.start-screen {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0b1026, #000000);
  color: white;
  text-align: center;
  padding-top: 100px;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  color: #00bfff;
  font-size: 48px;
}

h2 {
  font-size: 32px;
}

p {
  font-size: 20px;
}

button {
  margin: 15px;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #0066ff, #00bfff);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style>