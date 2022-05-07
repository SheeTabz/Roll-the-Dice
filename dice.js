"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHoldDice = document.querySelector(".btn--hold");
// Initialize the scores to 0, starting point

let score, currentScore, activePlayer, playing;
const initialize = function () {
  score = [0, 0]; // the the cumulative scores of both plays in an array
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
};
initialize();
//store the active player in a variable (we set it to 0 because the first active player by default is player no 1 who is player 0)
//hide the dice image at the begining

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //current score of the active player should be set back to 0
  currentScore = 0;
  //switch to next player
  //reassign the value of the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //the background color should also change
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRollDice.addEventListener("click", function () {
  if (playing) {
    //first a random dice should be generated
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Then it should be displayed
    diceEl.classList.remove("hidden");
    //lets manipulate the source attribute so that the random dice generated will match the dices number of the image
    diceEl.src = `dice-${dice}.png`;

    //if roll is 1 switch to the next player
    //Check if it is 1, if not add the current dice to the current score for the active player.
    if (dice !== 1) {
      currentScore += dice;
      //select active player dynamically ;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Displays the score for the active player
      //current0El.textContent = currentScore; //Displays the score ofthe first player
    } else {
      switchPlayer();
    }
  }
});

//HOLD BUTTON
btnHoldDice.addEventListener("click", function () {
  if (playing) {
    //Add currentScore to the final score
    score[activePlayer] += currentScore;
    //score[1]= score[1]+ currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //if finall score >=100, player wins and game ends
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      //change the background by adding the player--winner class to the current active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initialize);
