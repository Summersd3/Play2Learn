<template>
  <div class="game-equation">

    <h2>{{ number1 }} {{ operator }} {{ number2 }} = ?</h2>

    <input
      ref="answerInput"
      v-model="answer"
      type="number"
      placeholder="Enter answer"
      @keyup.enter="submitAnswer"
      :disabled="gameOver"
    >

    <button
      @click="submitAnswer"
      :disabled="gameOver"
    >
      Go
    </button>

    <p v-if="gameOver" class="game-over">
      Game Over!
    </p>

  </div>
</template>

<script>
export default {
  name: 'GameEquation',

  props: {
    number1: {
      type: Number,
      default: 0
    },

    number2: {
      type: Number,
      default: 0
    },

    operator: {
      type: String,
      default: '+'
    },

    gameOver: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      answer: ''
    }
  },

  methods: {
    submitAnswer() {
      if (this.answer === '' || this.gameOver) {
        return
      }

      this.$emit('answer', Number(this.answer))

      this.answer = ''

      this.$nextTick(() => {
        if (!this.gameOver && this.$refs.answerInput) {
          this.$refs.answerInput.focus()
        }
      })
    }
  }
}
</script>

<style scoped>
.game-equation {
  text-align: center;
  margin: 30px auto;
}

.game-equation h2 {
  font-size: 40px;
  color: white;
  margin-bottom: 25px;
}

input {
  width: 180px;
  padding: 12px;
  font-size: 20px;
  text-align: center;
  border-radius: 8px;
  border: 2px solid #00bfff;
}

button {
  margin-left: 10px;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #0066ff, #00bfff);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.game-over {
  color: white;
  font-size: 30px;
  font-weight: bold;
}
</style>