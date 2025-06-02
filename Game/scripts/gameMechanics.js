class GameMechanics {
  constructor(gameState) {
    this.gameState = gameState;
  }

  shootBall(targetSection) {
    const position = ballPositions[targetSection];
    this.gameState.elements.ball.style.left = position.left;
    this.gameState.elements.ball.style.bottom = position.bottom;

    const keeperTarget = this.calculateKeeperPosition(targetSection);
    
    if (targetSection === keeperTarget) {
      this.gameState.elements.ball.style.zIndex = "1";
    } else {
      this.gameState.elements.ball.style.zIndex = "0";
    }

    this.drawKeeper(keeperTarget);

    setTimeout(() => {
      this.processShotResult(targetSection, keeperTarget);
    }, TIMER_SETTINGS.animationDelay);
  }

  calculateKeeperPosition(targetSection) {
    const accuracy = this.gameState.getKeeperAccuracy();
    
    return Math.random() < accuracy
      ? targetSection
      : Math.floor(Math.random() * 9) + 1;
  }

  processShotResult(targetSection, keeperTarget) {
    if (targetSection === keeperTarget) {
      this.handleSave();
    } else {
      this.handleGoal();
    }
  }

  handleSave() {
    const randomPhrase = funnySavePhrases[Math.floor(Math.random() * funnySavePhrases.length)];
    this.gameState.setMessage(randomPhrase);
    
    this.showGameOverButtons();
    
    setTimeout(() => {
      this.resetGame();
      this.disableSectionHover();
    }, TIMER_SETTINGS.gameOverDelay);
  }

  handleGoal() {
    this.gameState.updateScore(this.gameState.scoreCount + 1);
    
    const randomPraise = funnyPraises[Math.floor(Math.random() * funnyPraises.length)];
    this.gameState.setMessage(randomPraise);
    
    this.resetRound();
    this.startShotTimer();
  }

  drawKeeper(keeperTarget) {
    const keeper = keeperPositions[keeperTarget - 1];
    const goalkeepperEl = this.gameState.elements.goalkeeper;
    
    goalkeepperEl.style.background = `url('./Game${keeper.src}') no-repeat center`;
    goalkeepperEl.style.backgroundSize = "cover";
    goalkeepperEl.style.width = `${keeper.width}px`;
    goalkeepperEl.style.height = `${keeper.height}px`;
    goalkeepperEl.style.bottom = `${keeper.offsetY}px`;
    goalkeepperEl.style.left = `${keeper.offsetX}px`;
  }

  resetRound() {
    this.gameState.elements.ball.style.left = "375px";
    this.gameState.elements.ball.style.bottom = "100px";
    
    const goalkeeper = this.gameState.elements.goalkeeper;
    goalkeeper.style.left = "290px";
    goalkeeper.style.bottom = "220px";
    goalkeeper.style.height = "380px";
    goalkeeper.style.width = "220px";
    goalkeeper.style.background = "url(./Game/goalkeeper/default.png) no-repeat center";
    goalkeeper.style.backgroundSize = "cover";

    this.gameState.clearShotTimer();
    this.gameState.isShotAllowed = false;
  }

  resetGame() {
    this.gameState.reset();
    this.resetRound();
    this.showStartButton();
  }

  showGameOverButtons() {
    this.gameState.elements.pauseGameBtn.style.display = "none";
    this.gameState.elements.endGameBtn.style.display = "none";
    this.gameState.elements.startGameBtn.style.display = "inline-block";
  }

  showStartButton() {
    this.gameState.elements.startGameBtn.style.display = "inline-block";
    this.gameState.elements.pauseGameBtn.style.display = "none";
    this.gameState.elements.endGameBtn.style.display = "none";
  }

  showGameButtons() {
    this.gameState.elements.startGameBtn.style.display = "none";
    this.gameState.elements.pauseGameBtn.style.display = "inline-block";
    this.gameState.elements.endGameBtn.style.display = "inline-block";
  }

  enableSectionHover() {
    document
      .querySelectorAll(".goal-section")
      .forEach((el) => el.classList.add("hover-enabled"));
  }

  disableSectionHover() {
    document
      .querySelectorAll(".goal-section")
      .forEach((el) => el.classList.remove("hover-enabled"));
  }

  startShotTimer() {
    if (this.gameState.isShotAllowed) return;
    
    this.gameState.setMessage("Виберіть секцію для удару!");
    this.gameState.isShotAllowed = true;
    this.gameState.isPaused = false;
    this.enableSectionHover();
    this.gameState.elements.shotTimer.classList.remove("critical");
    this.gameState.shotTimeLeft = TIMER_SETTINGS.shotTime;
    this.resumeShotTimer();
  }

  resumeShotTimer() {
    this.gameState.updateShotTimer(this.gameState.shotTimeLeft);

    this.gameState.shotTimer = setInterval(() => {
      if (this.gameState.isPaused) return;
      
      this.gameState.shotTimeLeft--;
      this.gameState.updateShotTimer(this.gameState.shotTimeLeft);
      
      if (this.gameState.shotTimeLeft <= 0) {
        clearInterval(this.gameState.shotTimer);
        this.gameState.setMessage("Час вичерпано! Виконуємо випадковий удар...");
        const randomSection = Math.floor(Math.random() * 9) + 1;
        this.shootBall(randomSection);
        this.gameState.isShotAllowed = false;
      }
    }, 1000);
  }
}

const gameMechanics = new GameMechanics(gameState);