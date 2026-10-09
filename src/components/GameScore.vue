<template>
  <div class="game-score">
    <div class="score">
      Score: {{ score }}
    </div>

    <div class="timer">
      Time: {{ timeLeft }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameScore',

  props: {
    score: {
      type: Number,
      default: 0
    },

    timeLeft: {
      type: Number,
      default: 30
    }
  }
}
</script>

<style scoped>
.game-score {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  font-size: 24px;
  font-weight: bold;
}

.score,
.timer {
  padding: 10px 20px;
  border: 2px solid #00bfff;
  border-radius: 10px;
  background: #111827;
  color: white;
}
</style>