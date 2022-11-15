class Answer {
  constructor(scene, x, y, sprite, text) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.text = text;

    this.isActive = true;

    scene.add.existing(this);

    // this.setOrigin(0.5, 0);

    this.addBackground();
    this.addText();

    this.container = this.scene.add.container(this.x, this.y, [
      this.background,
      this.displayText,
    ]);

    this.container.setSize(
      this.background.displayWidth,
      this.background.displayHeight
    );
    // this.container.setDepth(100);
    this.container.setInteractive();
    this.scene.physics.world.enableBody(this.container);

    this.background.setScale(0);
    this.displayText.setScale(0);

    this.container.body.checkCollision.up = false;
    this.container.body.checkCollision.left = false;
    this.container.body.checkCollision.right = false;

    this.moveAnim();
    this.appearAnim();
  }

  addBackground() {
    this.background = this.scene.add.image(0, 0, this.sprite);
  }

  addText() {
    this.displayText = this.scene.add
      .text(this.background.x, this.background.y, this.text, {
        fontFamily: "LuckiestGuy",
        fontSize: "50px",
        color: "#FFFFFF",
        stroke: "##000000",
        strokeThickness: 8,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);
  }

  onClick(cb) {
    this.container
      .on("pointerdown", () => {
        // this.setScale(0.9);
        cb();
      })
      .on("pointerup", () => {});
  }

  moveAnim() {
    this.answerTween = this.scene.tweens.add({
      targets: this.container,
      y: 720,
      duration: 8000,
      onUpdate: () => {
        if (this.container.y >= 505 + 43) {
          this.isActive = false;
          this.answerTween.setTimeScale(5);
        }
      },
      onComplete: () => {
        this.container.destroy();
      },
    });
  }

  appearAnim() {
    this.scene.tweens.add({
      targets: this.background,
      ease: "Power2",
      scale: 1,
      duration: 1500,
    });

    this.scene.tweens.add({
      targets: this.displayText,
      ease: "Power2",
      scale: 1,
      duration: 1500,
    });
  }
}
