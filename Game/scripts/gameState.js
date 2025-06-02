class GameState {
  constructor() {
    this.scoreCount = 0;
    this.shotTimer = null;
    this.shotTimeLeft = TIMER_SETTINGS.shotTime;
    this.isShotAllowed = false;
    this.isPaused = false;
    this.difficulty = "normal";
    
    this.elements = {
      score: document.getElementById("score"),
      message: document.getElementById("message"),
      ball: document.getElementById("ball"),
      goalkeeper: document.getElementById("goalkeeper"),
      shotTimer: document.getElementById("shotTimer"),
      difficultySelect: document.getElementById("difficulty"),
      startGameBtn: document.getElementById("startGame"),
      pauseGameBtn: document.getElementById("pauseGame"),
      endGameBtn: document.getElementById("endGame")
    };
  }

  updateScore(newScore) {
    this.scoreCount = newScore;
    this.elements.score.textContent = `Голи: ${this.scoreCount}`;
  }

  setMessage(text) {
    this.elements.message.textContent = text;
  }

  updateShotTimer(timeLeft) {
    this.shotTimeLeft = timeLeft;
    this.elements.shotTimer.textContent = `Час на удар: ${timeLeft}`;
    
    if (timeLeft === TIMER_SETTINGS.criticalTime) {
      this.elements.shotTimer.classList.add("critical");
    }
  }

  clearShotTimer() {
    this.elements.shotTimer.textContent = "Час на удар: -";
    this.elements.shotTimer.classList.remove("critical");
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  reset() {
    this.scoreCount = 0;
    this.shotTimeLeft = TIMER_SETTINGS.shotTime;
    this.isShotAllowed = false;
    this.isPaused = false;
    
    this.updateScore(0);
    this.clearShotTimer();
    this.setMessage("Натисніть кнопку 'Почати гру' щоб почати");
  }

  getKeeperAccuracy() {
    return difficultySettings[this.difficulty].keeperAccuracy;
  }
}

const gameState = new GameState();