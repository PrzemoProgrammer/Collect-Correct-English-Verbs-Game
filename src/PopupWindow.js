class PopupWindow {
  constructor(scene, x, y, sprite, text, score) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.text = text;
    this.score = score;

    this.addBackground();
    this.addText();
    this.addText2();
    this.addRestartButton();

    this.container = this.scene.add
      .container(
        this.x + this.background.displayWidth / 2,
        this.y + this.background.displayHeight / 2,
        [this.background, this.text1, this.text2, this.button]
      )
      .setDepth(999)
      .setScale(0);

    this.addScaleAnim();
    //   .setOrigin(0, 0);
    // this.setInteractive();
  }

  addScaleAnim() {
    this.scene.tweens.add({
      targets: this.container,
      scale: 1,
      duration: 200,
    });
  }

  addBackground() {
    this.background = this.scene.add.image(0, 0, this.sprite).setSize(0);
    this.background.setInteractive();
  }

  addText() {
    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "100px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 15,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.text1 = this.scene.add
      .text(
        this.background.displayWidth / 2 - 650,
        this.background.displayHeight / 2 - 500,
        "You " + this.text,
        textConfig
      )
      .setOrigin(0.5);
    //   .setWordWrapWidth(this.gw * 0.6);
  }

  addText2() {
    const textConfig = {
      fontFamily: "LuckiestGuy",
      fontSize: "80px",
      color: "#FFFF00",
      stroke: "#000000",
      strokeThickness: 15,
      shadow: { blur: 0, stroke: false, fill: false },
    };

    this.text2 = this.scene.add
      .text(
        this.background.displayWidth / 2 - 650,
        this.background.displayHeight / 2 - 350,
        "Score " + this.score,
        textConfig
      )
      .setOrigin(0.5);
    //   .setWordWrapWidth(this.gw * 0.6);
  }

  addRestartButton() {
    this.button = this.scene.add.image(
      this.background.displayWidth / 2 - 650,
      this.background.displayHeight / 2 - 200,
      "restartButton"
    );
    this.button.setInteractive();
  }

  onClick(cb) {
    this.button
      .on("pointerdown", () => {
        this.container.destroy();
        this.button.setScale(0.5);
        cb();
      })
      .on("pointerup", () => {
        this.button.setScale(1);
      });
    return this;
  }
}
