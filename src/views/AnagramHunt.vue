<template>
  <main class="anagram-page">

    <!-- START SCREEN -->
    <section v-if="screen === 'start'" class="game-card">

      <h1>Anagram Hunt</h1>

      <h2>How many anagrams can you find in a minute?</h2>

      <div class="setting">
        <label for="wordLength">Word Length</label>

        <select id="wordLength" v-model="wordLength">
          <option :value="5">5</option>
          <option :value="6">6</option>
          <option :value="7">7</option>
          <option :value="8">8</option>
        </select>
      </div>

      <button class="play-button" @click="startGame">
        Play!
      </button>

</section>


    <!-- GAME SCREEN -->
    <section v-if="screen === 'game'" class="game-card">

      <h1>Anagram Hunt</h1>

      <div class="game-info">

        <div class="info-box">
          <span>Time</span>
          <strong>{{ timeLeft }}</strong>
        </div>

        <div class="info-box">
          <span>Score</span>
          <strong>{{ score }}</strong>
        </div>

        <div class="info-box">
          <span>Anagrams Left</span>
          <strong>{{ anagramsLeft }}</strong>
        </div>

      </div>


      <div class="current-word">

        <p>Find the anagrams of:</p>

        <h2>{{ currentWord }}</h2>

      </div>


      <form @submit.prevent="submitAnswer">

        <input
          ref="answerInput"
          v-model="answer"
          type="text"
          :maxlength="wordLength"
          autocomplete="off"
          placeholder="Type an anagram"
          autofocus
        >

        <button type="submit">
          Enter
        </button>

      </form>


      <div class="answers">

        <h3>Correct Answers</h3>

        <div v-if="foundAnswers.length === 0">
          No answers yet.
        </div>

        <ul>
          <li
            v-for="word in foundAnswers"
            :key="word"
          >
            {{ word }}
          </li>
        </ul>

      </div>

    </section>


    <!-- GAME OVER SCREEN -->
    <section v-if="screen === 'over'" class="game-card">

      <h1>Game Over!</h1>

      <h2>Your Score</h2>

      <div class="final-score">
        {{ score }}
      </div>

      <p v-if="gameOverReason === 'time'">
        Time's up!
      </p>

      <p v-else>
        You completed all of the available anagram groups!
      </p>

       <button class="play-button" @click="startGame">
        Play!
      </button>

  <div class="button-row">
      <button class="back-button" @click="goToStart">
        ← Back to Start Screen
      </button>

     
    </div>
  </section>

  </main>
</template>

<script>

import anagrams from "@/data/anagrams.json";

export default {
  name: "AnagramHunt",

  data() {
    return {
      screen: "start",

      wordLength: 5,

      currentArray: [],

      currentWord: "",

      foundAnswers: [],

      answer: "",

      score: 0,

      timeLeft: 30,

      timer: null,

      usedArrays: [],

      gameOverReason: ""
    };
  },

  computed: {
    anagramsLeft() {
      return Math.max(
        this.currentArray.length - this.foundAnswers.length,
        0
      );
    }
  },

  methods: {

    startGame() {
      // Stop any old timer
      this.stopTimer();

      // Reset game
      this.score = 0;
      this.timeLeft = 60;
      this.answer = "";
      this.foundAnswers = [];
      this.usedArrays = [];
      this.currentArray = [];
      this.currentWord = "";
      this.gameOverReason = "";

   // Get the groups for the selected word length
      const matchingArrays =
        anagrams[String(this.wordLength)] || [];

      // Make sure groups exist
      if (matchingArrays.length === 0) {
        alert(
          `No ${this.wordLength}-letter anagrams are available.`
        );
        return;
      }

      // Choose the first random group
      let randomIndex = Math.floor(
        Math.random() * matchingArrays.length
      );

      this.usedArrays.push(randomIndex);

      // Get the words in that group
      this.currentArray =
        matchingArrays[randomIndex].words;

      // Choose a random word to display
      const randomWordIndex = Math.floor(
        Math.random() * this.currentArray.length
      );

      this.currentWord =
        this.currentArray[randomWordIndex];


      // The displayed word is already known
      this.foundAnswers = [
        this.currentWord.toLowerCase()
      ];

      // Switch to game screen
      this.screen = "game";

      // Start 60-second timer
      this.startTimer();

      // Focus answer box
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    },

    submitAnswer() {
      const guess =
        this.answer.trim().toLowerCase();

      // Ignore empty answers
      if (!guess) {
        return;
      }

      // Check word length
      if (
        guess.length !== Number(this.wordLength)
      ) {
        this.answer = "";
        return;
      }

      // Check if answer exists in current group
      const isCorrect =
        this.currentArray
          .map(word => word.toLowerCase())
          .includes(guess);

      // Check for duplicate
      const alreadyFound =
        this.foundAnswers.includes(guess);

      if (isCorrect && !alreadyFound) {
        // Add answer
        this.foundAnswers.push(guess);

        // Increase score
        this.score++;

        // Clear input
        this.answer = "";

        // Check if all words in this group were found
        if (
          this.foundAnswers.length >=
          this.currentArray.length
        ) {
          this.chooseNextArray();
          return;
        }
      } else {
        // Incorrect or duplicate
        this.answer = "";
      }

      // Return focus to input
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    },

    chooseNextArray() {
      // Get groups for selected word length
      const matchingArrays =
        anagrams[String(this.wordLength)] || [];

      // Check whether all groups have been used
      if (
        this.usedArrays.length >=
        matchingArrays.length
      ) {
        this.endGame("completed");
        return;
      }

      // Find a random unused group
      let randomIndex;

      do {
        randomIndex = Math.floor(
          Math.random() * matchingArrays.length
        );
      } while (
        this.usedArrays.includes(randomIndex)
      );

      // Remember that this group was used
      this.usedArrays.push(randomIndex);

      // Load the new group
      this.currentArray =
        matchingArrays[randomIndex].words;

      // Pick a random starting word
      const randomWordIndex = Math.floor(
        Math.random() * this.currentArray.length
      );

      this.currentWord =
        this.currentArray[randomWordIndex];

      // Starting word is already known
      this.foundAnswers = [
        this.currentWord.toLowerCase()
      ];

      // Clear answer
      this.answer = "";

      // Focus input
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.endGame("time");
        }
      }, 1000);
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    endGame(reason) {
      this.stopTimer();

      this.gameOverReason = reason;

      this.screen = "over";
    },

    goToStart() {
      this.stopTimer();

      this.screen = "start";

      this.score = 0;
      this.timeLeft = 60;
      this.answer = "";
      this.foundAnswers = [];
      this.currentArray = [];
      this.currentWord = "";
      this.usedArrays = [];
      this.gameOverReason = "";

      this.$router.push('/');
    }
  },

  beforeUnmount() {
    this.stopTimer();
  }
};
</script>

<style scoped>

.anagram-page {

  min-height: 100vh;

  box-sizing: border-box;

  padding: 60px 20px;

  background:
    linear-gradient(
      to bottom,
      #0b1026,
      #000000
    );

  color: white;

  text-align: center;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


.game-card {

  max-width: 700px;

  margin: 0 auto;

  padding: 40px;

  background: #111827;

  border: 2px solid #00bfff;

  border-radius: 15px;

  box-shadow:
    0 0 20px rgba(0, 191, 255, 0.25);

}


h1 {

  color: #00bfff;

  font-size: 48px;

  margin-bottom: 20px;

}


h2 {

  font-size: 22px;

  margin-bottom: 30px;

}


.setting {

  margin: 30px 0;

}


.setting label {

  display: block;

  font-size: 20px;

  margin-bottom: 10px;

}


select {

  padding: 12px 20px;

  font-size: 18px;

  border-radius: 8px;

  border: 2px solid #00bfff;

}


button {

  padding: 12px 25px;

  border: none;

  border-radius: 10px;

  background:
    linear-gradient(
      90deg,
      #0066ff,
      #00bfff
    );

  color: white;

  font-size: 18px;

  font-weight: bold;

  cursor: pointer;

}


button:hover {

  transform: translateY(-2px);

  box-shadow:
    0 0 15px #00bfff;

}

.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

.back-button,
.play-button {
  padding: 7px 14px;
  border: none;
  border-radius: 5px;
  background: #009cff;
  color: white;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.back-button:hover,
.play-button:hover {
  background: #00b7ff;
  transform: translateY(-1px);
}

.game-info {

  display: flex;

  justify-content: space-around;

  gap: 15px;

  margin: 30px 0;

}


.info-box {

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.info-box span {

  color: #aaa;

  font-size: 15px;

}


.info-box strong {

  color: #00bfff;

  font-size: 28px;

}


.current-word {

  margin: 35px 0;

}


.current-word p {

  font-size: 20px;

}


.current-word h2 {

  color: #00bfff;

  font-size: 48px;

  letter-spacing: 8px;

}


form {

  display: flex;

  justify-content: center;

  gap: 10px;

}


form input {

  width: 300px;

  padding: 13px;

  border: 2px solid #00bfff;

  border-radius: 8px;

  font-size: 20px;

  text-align: center;

}


.answers {

  margin-top: 35px;

}


.answers h3 {

  color: #00bfff;

}


.answers ul {

  list-style: none;

  padding: 0;

}


.answers li {

  display: inline-block;

  margin: 5px;

  padding: 8px 15px;

  background: #1f2937;

  border: 1px solid #00bfff;

  border-radius: 8px;

}


.final-score {

  font-size: 70px;

  color: #00bfff;

  font-weight: bold;

  margin: 20px;

}


@media (max-width: 600px) {

  .game-card {

    padding: 25px 15px;

  }


  .game-info {

    gap: 10px;

  }


  .current-word h2 {

    font-size: 35px;

    letter-spacing: 5px;

  }


  form {

    flex-direction: column;

  }


  form input {

    width: auto;

  }

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