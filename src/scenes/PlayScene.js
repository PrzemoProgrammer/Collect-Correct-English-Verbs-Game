// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PlayScene",
      pack: {
        files: [
          {
            type: "scenePlugin",
            key: "SpinePlugin",
            url: "plugins/3.8.95/SpinePlugin.js",
            sceneKey: "spine",
          },
        ],
      },
    });
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.score = 0;
    this.isGameFinish = false;
    this.answers = [];

    this.wordsContainer = WORDS;

    this.correctWords = CORRECT_WORDS;

    this.chosenWordsContainer = null;

    this.audio = this.scene.get("PreloadScene");

    this.addBackground();
    this.addTracks();
    this.addCart();
    this.addTubes();
    this.addScoreText();
    this.addStartScreen();

    this.addFullScreenButton();
    this.addMusicButton();
    this.audio.machine.play();
    this.handleInputs = new HandleInputs(this);
    document.getElementById("loading_page")?.remove();
  }

  update() {
    if (!this.scale.isFullscreen && !this.fullscreen.active) {
      this.fullscreen.setActive(true);
      this.fullscreen.setVisible(true);
    } else if (this.scale.isFullscreen && this.fullscreen.active) {
      this.fullscreen.setActive(false);
      this.fullscreen.setVisible(false);
    }
    this.handleInputs.handleMovement();
  }

  addBackground() {
    this.background = this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.gw, this.gh);
  }

  addFullScreenButton() {
    this.fullscreen = this.add
      .image(this.gw - 5, 5, "full-screen")
      .setOrigin(1, 0)
      .setScale(1)
      .setDepth(99999);
    this.fullscreen.setInteractive();

    this.fullscreen.on("pointerup", () => {
      this.scale.startFullscreen();
    });
  }

  addTube(i) {
    let tube = new Tube(this, 250 * i + 350, 0, "tube");
  }

  addTubes() {
    const spine = this.add
      .spine(150, 600, "machine", "conveyor-in", true)
      .setScale(1.7)
      .setDepth(100);

    spine.setSkinByName("default");
  }

  addCart() {
    this.cart = new Cart(this, this.gw / 2, this.gh - 215, "cart");
  }

  addTracks() {
    this.tracks = this.add.image(this.gw / 2, this.gh - 80, "tracks");
    // .setOrigin(0, 0)
  }

  addOperation() {
    let randomNumber = Math.floor(
      Phaser.Math.Between(0, this.wordsContainer.length - 1)
    );

    let selectedWordContainer = this.wordsContainer[randomNumber];
    this.chosenWordsContainer = selectedWordContainer;

    this.addWord(selectedWordContainer[selectedWordContainer.length - 1]);

    for (let i = 0; i <= selectedWordContainer.length - 2; i++) {
      this.addAnswer(i, selectedWordContainer);
    }

    if (this.wordsContainer.length === 1) return;
    this.addOperationPerTime();
  }

  addWord(word) {
    this.visibleWord = new VisibleWord(
      this,
      this.gw / 2,
      -100,
      "wordBackground",
      word
    );
  }

  addAnswer(i, selectedWordContainer) {
    let answer = new Answer(
      this,
      230 * i + 420,
      200,
      "gold",
      selectedWordContainer[i]
    );
    this.answers.push[answer];
    this.physics.add.overlap(this.cart, answer.container, () => {
      if (!answer.isActive) return;
      if (this.correctWords.includes(selectedWordContainer[i])) {
        this.audio.correctAnswer.play();
        this.updateScore();
        if (this.wordsContainer.length === 1) {
          this.addFinishGameScreen("win", this.score);
        }
        // this.answers.forEach((answer) => (answer.isActive = false));
        // console.log("correct");
      } else {
        this.isGameFinish = true;
        this.addFinishGameScreen("lost", this.score);
        // console.log("false");
      }

      let index = this.wordsContainer.indexOf(selectedWordContainer);

      this.wordsContainer.splice(index, 1);

      answer.container.destroy();
      this.visibleWord.background.destroy();
      this.visibleWord.displayText.destroy();
      // if (this.wordsContainer.length === 0) {
      //   return;
      // }
      // this.time.delayedCall(1000, () => {
      //   this.addOperation();
      // });
    });
  }

  addScoreText() {
    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "60px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 5,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.scoreText = this.add
      .text(10, 10, "score " + this.score, textConfig)
      .setOrigin(0, 0)
      .setDepth(101);
  }

  updateScore() {
    this.score++;
    this.scoreText.setText("score " + this.score);
  }

  addStartScreen() {
    this.startScreen = this.add
      .image(0, 0, "startScreen")
      .setOrigin(0, 0)
      .setDepth(110);

    this.text = this.add
      .text(
        this.startScreen.x + this.startScreen.width / 2,
        this.startScreen.y + this.startScreen.height / 2,
        "Click to play",
        {
          fontFamily: "LuckiestGuy",
          fontSize: "80px",
          color: "#FFFFFF",
          stroke: "#000000",
          strokeThickness: 8,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(110);

    this.startScreen.setInteractive();

    this.startScreen
      .on("pointerdown", () => {
        this.startScreen.destroy();
        this.text.destroy();
        this.addOperation();
      })
      .on("pointerup", () => {});
  }

  addOperationPerTime() {
    this.operationPerTime = this.time.addEvent({
      delay: 6000,
      callback: () => {
        if (this.isGameFinish) return;
        this.addOperation();
      },
      // loop: true,
    });
  }

  addFinishGameScreen(text, score) {
    let finishGameScreen = new PopupWindow(
      this,
      0,
      0,
      "lostScreen",
      text,
      score
    );
    finishGameScreen.onClick(() => {
      // console.log("restart");
      this.scene.restart();
    });
  }

  addMusicButton() {
    this.muteButton = this.add
      .image(this.gw - 100, 30, "unmuteIcon")
      .setScale(0.5);
    this.muteButton.setInteractive();

    this.muteButton.on("pointerup", () => {
      if (this.isMute) {
        this.isMute = false;
        this.audio.machine.play();
        this.muteButton.setTexture("unmuteIcon");
      } else {
        this.isMute = true;
        this.audio.machine.stop();
        this.muteButton.setTexture("muteIcon");
      }
    });
  }
}
