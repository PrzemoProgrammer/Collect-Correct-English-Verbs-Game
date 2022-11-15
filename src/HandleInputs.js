class HandleInputs {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyA = scene.input.keyboard.addKey("A");
    this.keyS = scene.input.keyboard.addKey("S");
    this.key1 = scene.input.keyboard.addKey("ONE");
    this.key2 = scene.input.keyboard.addKey("TWO");

    this.init();
  }

  init() {
    this.handleKeyUp();
    this.initAttackKeys();
  }

  initAttackKeys() {
    this.keyA.on("down", () => {});

    this.keyS.on("down", () => {});

    this.key1.on("down", () => {});

    this.key2.on("down", () => {});
  }

  handleMovement() {
    if (this.cursors.right.isDown) {
      if (this.scene.cart.isOutOfTrackRight()) {
        this.scene.cart.setIdle();
        return;
      }
      this.scene.cart.moveRight();
    }

    if (this.cursors.left.isDown) {
      if (this.scene.cart.isOutOfTrackLeft()) {
        this.scene.cart.setIdle();
        return;
      }
      this.scene.cart.moveLeft();
    }
  }

  handleKeyUp() {
    this.scene.input.keyboard.on("keyup-UP", () => {
      this.onKeyUp("UP");
    });

    this.scene.input.keyboard.on("keyup-DOWN", () => {
      this.onKeyUp("DOWN");
    });

    this.scene.input.keyboard.on("keyup-RIGHT", () => {
      this.onKeyUp("RIGHT");
    });

    this.scene.input.keyboard.on("keyup-LEFT", () => {
      this.onKeyUp("LEFT");
    });
  }

  onKeyUp(key) {
    // if (!this.scene.player.canMove) return;
    this.scene.cart.setIdle();
    // if (key === "RIGHT") {
    //   this.scene.cart.body.x -= 50;
    // }
    // if (key === "LEFT") {
    //   this.scene.cart.body.x += 50;
    // }
  }
}
