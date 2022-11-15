class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene",
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

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("cart", "cart.png");
    this.load.image("tracks", "tracks.png");
    this.load.image("tube", "tube.png");
    // this.load.image("answerBackground", "answerBackground.png");
    this.load.image("wordBackground", "wordBackground.png");
    this.load.image("startScreen", "startScreen.png");
    this.load.image("gold", "gold.png");
    this.load.image("lostScreen", "lostScreen.png");
    this.load.image("restartButton", "restartButton.png");
    this.load.image("full-screen", "full-screen.png");
    this.load.image("muteIcon", "muteIcon.png");
    this.load.image("unmuteIcon", "unmuteIcon.png");

    this.load.spine("machine", "Hat Machine.json", ["Hat Machine.atlas"]);

    // this.load.spritesheet("skin1Idle", "skin1Idle.png", {
    //   frameWidth: 8338 / 20,
    //   frameHeight: 304,
    // });

    this.load.audio("machine", "audio/machine.mp3");
    this.load.audio("correctAnswer", "audio/correctAnswer.OGG");
  }

  create() {
    this.addAnims();
    this.addSounds();
    this.startMenuScene();
  }

  addAnims() {}

  addSounds() {
    this.machine = this.sound.add("machine");
    this.machine.volume = 0.2;
    this.machine.loop = true;
    this.correctAnswer = this.sound.add("correctAnswer");
    this.correctAnswer.volume = 0.5;
  }

  startMenuScene() {
    this.scene.start("PlayScene");
  }
}
