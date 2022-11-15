class VisibleWord {
  constructor(scene, x, y, sprite, text) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.text = text;

    scene.add.existing(this);

    // this.setOrigin(0.5, 0);

    this.addBackground();
    this.addText();

    this.container = this.scene.add
      .container(this.x, this.y, [this.background, this.displayText])
      .setDepth(104);

    // this.container.setDepth(100);

    this.animateYPosition();
  }

  addBackground() {
    this.background = this.scene.add.image(0, 0, this.sprite);
  }

  addText() {
    this.displayText = this.scene.add
      .text(this.background.x, this.background.y, this.text, {
        fontFamily: "LuckiestGuy",
        fontSize: "60px",
        color: "#FFFFFF",
        stroke: "##000000",
        strokeThickness: 10,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);
  }

  animateYPosition() {
    this.scene.tweens.add({
      targets: this.container,
      ease: "Power1",
      y: 50,
      duration: 800,
    });
  }
}
