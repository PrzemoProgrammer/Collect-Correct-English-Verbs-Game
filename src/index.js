const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      // gravity: { y: 0.1 },
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, PlayScene],
};

const game = new Phaser.Game(config);
