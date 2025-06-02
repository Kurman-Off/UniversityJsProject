class EventHandlers {
  constructor(gameState, gameMechanics) {
    this.gameState = gameState;
    this.gameMechanics = gameMechanics;
  }

  init() {
    this.setupButtonHandlers();
    this.setupSectionClicks();
    this.setupDifficultyHandler();
  }

  setupButtonHandlers() {
    this.gameState.elements.startGameBtn.addEventListener("click", () => {
      this.gameMechanics.showGameButtons();
      this.gameState.setMessage("Виберіть секцію для удару!");
      this.gameMechanics.startShotTimer();
    });

    this.gameState.elements.endGameBtn.addEventListener("click", () => {
      clearInterval(this.gameState.shotTimer);
      this.gameState.reset();
      this.gameMechanics.disableSectionHover();
      this.gameState.setMessage("Гру завершено. Натисніть 'Почати гру' щоб почати знову.");
      this.gameMechanics.showStartButton();
      this.gameMechanics.resetRound();
    });

    this.gameState.elements.pauseGameBtn.addEventListener("click", () => {
      if (!this.gameState.isPaused) {
        this.pauseGame();
      } else {
        this.resumeGame();
      }
    });
  }

  pauseGame() {
    clearInterval(this.gameState.shotTimer);
    this.gameState.isPaused = true;
    this.gameState.isShotAllowed = false;
    this.gameMechanics.disableSectionHover();
    this.gameState.elements.pauseGameBtn.textContent = "Продовжити";
    this.gameState.setMessage("Пауза. Натисніть 'Продовжити' щоб грати далі.");
  }

  resumeGame() {
    this.gameState.isPaused = false;
    this.gameState.isShotAllowed = true;
    this.gameMechanics.enableSectionHover();
    this.gameState.elements.pauseGameBtn.textContent = "Пауза";
    this.gameState.setMessage("Виберіть секцію для удару!");
    this.gameMechanics.resumeShotTimer();
  }

  setupSectionClicks() {
    for (let i = 1; i <= 9; i++) {
      document
        .getElementById(`section${i}`)
        .addEventListener("click", () => {
          if (!this.gameState.isShotAllowed) return;

          clearInterval(this.gameState.shotTimer);
          this.gameMechanics.shootBall(i);
          this.gameState.isShotAllowed = false;
        });
    }
  }

  setupDifficultyHandler() {
    this.gameState.elements.difficultySelect.addEventListener("change", (e) => {
      this.gameState.setDifficulty(e.target.value);
    });
  }
}

const eventHandlers = new EventHandlers(gameState, gameMechanics);