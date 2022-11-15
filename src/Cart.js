class Cart extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.speed = 200;

    scene.add.existing(this);
    this.setOrigin(0.5, 0);
    this.scene.physics.world.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = false;

    this.body.width = 90;
    this.body.offset.x = 40;
    this.body.offset.y = 65;

    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      this.setScale(0.9);
      cb();
    }).on("pointerup", () => this.setScale(1));

    return this;
  }

  moveLeft() {
    this.body.setVelocityX(-this.speed);
  }

  moveRight() {
    this.body.setVelocityX(this.speed);
  }

  setIdle() {
    this.body.setVelocityX(0);
  }

  isOutOfTrackLeft() {
    return this.body.x <= 250;
  }
  isOutOfTrackRight() {
    return this.body.x + this.body.width >= 1030;
  }
}
