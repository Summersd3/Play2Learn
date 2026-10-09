<template>
  <MainContainer>

    <div class="math-facts">

      <h1>Math Facts Practice</h1>

      <!-- START SCREEN -->
      <div v-if="!gameStarted && !gameOver" class="start-screen">

        <h2>Choose Your Settings</h2>

        <SelectInput
          label="Operation"
          id="operation"
          :options="operations"
          v-model="operation"
        />

        <SelectInput
          label="Maximum Number"
          id="max-number"
          :options="numbers"
          v-model="maxNumber"
        />

        <button @click="startGame">
          Start Game
        </button>

        <button class="back-button" @click="goToStart">
  ← Back to Start Screen
</button>

      </div>

      <!-- GAME SCREEN -->
      <div v-if="gameStarted && !gameOver">

        <GameScore
          :score="score"
          :timeLeft="timeLeft"
        />

        <GameEquation
          :number1="number1"
          :number2="number2"
          :operator="displayOperator"
          :gameOver="gameOver"
          @answer="checkAnswer"
        />

      </div>

      <!-- GAME OVER SCREEN -->
      <div v-if="gameOver" class="game-over">

        <h2>Game Over!</h2>

        <p>Your score: {{ score }}</p>

        <button class="play-button" @click="startGame">
        Play!
      </button>

       <div class="button-row">
      <button class="back-button" @click="goToStart">
        ← Back to Start Screen
      </button>

    </div>

      </div>

    </div>

  </MainContainer>
</template>


<script>
import SelectInput from './SelectInput.vue'
import MainContainer from './MainContainer.vue'
import GameScore from './GameScore.vue'
import GameEquation from './GameEquation.vue'

export default {
  name: 'MathFacts',

  components: {
    SelectInput,
    MainContainer,
    GameScore,
    GameEquation
  },

  data() {
    return {

      // Operation choices
      operations: ['+', '-', '*', '/'],

      // Maximum number choices
      numbers: [5, 10, 15, 20, 25, 50, 100],

      operation: '+',
      maxNumber: 10,

      number1: 0,
      number2: 0,
      correctAnswer: 0,

      score: 0,
      timeLeft: 30,

      timer: null,

      gameStarted: false,
      gameOver: false
    }
  },

  computed: {
    displayOperator() {

      if (this.operation === '*') {
        return '×'
      }

      if (this.operation === '/') {
        return '÷'
      }

      return this.operation
    }
  },

  methods: {

    goToStart() {
  clearInterval(this.timer)
  this.$router.push('/')
},

    startGame() {

      clearInterval(this.timer)

      this.score = 0
      this.timeLeft = 30
      this.gameOver = false
      this.gameStarted = true

      this.createProblem()

      this.timer = setInterval(() => {

        this.timeLeft--

        if (this.timeLeft <= 0) {
          this.endGame()
        }

      }, 1000)
    },

    createProblem() {

      const maximum = Math.max(1, Number(this.maxNumber))

      this.number1 =
        Math.floor(Math.random() * maximum) + 1

      this.number2 =
        Math.floor(Math.random() * maximum) + 1


      // ADDITION
      if (this.operation === '+') {

        this.correctAnswer =
          this.number1 + this.number2
      }


      // SUBTRACTION
      else if (this.operation === '-') {

        if (this.number2 > this.number1) {

          const temp = this.number1
          this.number1 = this.number2
          this.number2 = temp
        }

        this.correctAnswer =
          this.number1 - this.number2
      }


      // MULTIPLICATION
      else if (this.operation === '*') {

        this.correctAnswer =
          this.number1 * this.number2
      }


      // DIVISION
      else if (this.operation === '/') {

        this.number2 =
          Math.floor(Math.random() * maximum) + 1

        this.correctAnswer =
          Math.floor(Math.random() * maximum) + 1

        this.number1 =
          this.number2 * this.correctAnswer
      }
    },


    checkAnswer(answer) {

      if (Number(answer) === this.correctAnswer) {

        this.score++

        this.createProblem()
      }
    },


    endGame() {

      clearInterval(this.timer)

      this.timer = null

      this.gameStarted = false
      this.gameOver = true
    }
  },


  beforeUnmount() {

    clearInterval(this.timer)
  }
}
</script>


<style scoped>

.math-facts {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 42px;
  margin-bottom: 30px;
}

.start-screen {
  padding: 30px;
}

.start-screen h2 {
  margin-bottom: 20px;
}

button {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #0066ff, #00bfff);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px #00bfff;
}

.game-over {
  margin-top: 40px;
}

.game-over h2 {
  font-size: 36px;
}

.game-over p {
  font-size: 28px;
  margin: 20px;
}

.start-game {
  background: #009cff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;
}

.start-game:hover {
  background: #00b7ff;
  transform: translateY(-1px);
}

.start-game:active {
  background: #0088d8;
  transform: translateY(0);
}


</style>