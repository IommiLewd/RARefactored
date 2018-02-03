class titan extends Phaser.Sprite {
    constructor(game, x, y, key, type) {
        super(game, x, y, 'shade', type);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.titanAnim = this.game.add.sprite(0, 0, 'titan');
        this.titanAnim.anchor.setTo(0.5, 1.0);
        this.addChild(this.titanAnim);
        this.idle = true;
        this.attacking = false;
        this.positionX = this.x;
        this.positionY = this.x;
        this.targetDistance = 0;
        this.targetX = 0;
        this.targetY = 0;
        this._addAnimations();
        console.log('Titan Spawned!');
    }

    _addAnimations() {
        this.titanAnim.animations.add('toward', [0, 1, 2, 3], 7, true);
        this.titanAnim.animations.add('away', [4, 5, 6, 7], 7, true);
        this.titanAnim.animations.add('idle', [8, 9, 10, 11], 5, true);
        this.titanAnim.animations.add('eat', [12, 13, 14, 15], 8, true);
    }

    _animationsHandler() {
        if (this.body.velocity.x < 0) {
            this.titanAnim.scale.setTo(-1.0, 1.0);
        } else if (this.body.velocity.x > 0) {
            this.titanAnim.scale.setTo(1.0, 1.0);
        }

        if (this.attacking === false) {
            if (this.body.velocity.y < 0) {
                this.titanAnim.animations.play('away');
            } else if (this.body.velocity.y > 0) {
                this.titanAnim.animations.play('toward');
            } else {
                this.titanAnim.animations.play('idle');
            }
        } else {
            this.titanAnim.animations.play('eat');
        }
    }

    _arrival() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        
//           this._movementHandler();
    }
    
    _rangeSolver() {
        this.positionDistance = this.game.math.distance(this.x, this.y, this.positionX, this.positionY);
        if (this.positionDistance < 10) {
            this._arrival();
        }
        this.targetDistance = this.game.math.distance(this.x, this.y, this.targetX, this.targetY);
        if (this.targetDistance < 90) {
            this.attacking = true;
        } else {
            this.attacking = false;
        }

    }

    _movementHandler() {
        var randomX = (Math.random() * 50) - 25;
        var randomY = (Math.random() * 50) - 25;
        this.positionX += randomX;
        this.positionY += randomY;
        this.game.physics.arcade.moveToXY(this, this.positionX, this.positionY, 60);
    }

    update() {
        this._animationsHandler();
        this._rangeSolver();
        if(this.attacking === true && this.targetDistance > 10){
              this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 60);
        }
    }
}


//    class titan extends Phaser.Sprite {
//    constructor(game, x, y, key, type) {
//        super(game, x, y, 'shade', type);
//        this.game.add.existing(this);
//        this.game.physics.arcade.enable(this);
//        this.anchor.setTo(0.5, 0.5);
//        this.game.physics.arcade.enableBody(this);
//        this.body.collideWorldBounds = true;
//        if (type === 2) {
//            this.titanAnim = this.game.add.sprite(0, 0, 'titanLord');
//           // this.scale.setTo(0.8, 0.8);
//        } else {
//            this.titanAnim = this.game.add.sprite(0, 0, 'titan');
//        }
//
//
//        this.titanAnim.anchor.setTo(0.5, 1.0);
//        this.addChild(this.titanAnim);
//        this.idle = true;
//        this.attacking = false;
//        this.positionX = this.x;
//        this.positionY = this.x;
//        this.targetX = 0;
//        this.targetY = 0;
//        this._randomMovement();
//        this._addAnimations();
//        this.randomTimer = Math.floor(Math.random() * (4 - 1) + 1) + 1;
//        this.game.time.events.loop(Phaser.Timer.SECOND * this.randomTimer, this._randomMovement, this);
//        this.distanceToTarget = 0;
//    }


//    _addAnimations() {
//        this.titanAnim.animations.add('toward', [0, 1, 2, 3], 7, true);
//        this.titanAnim.animations.add('away', [4, 5, 6, 7], 7, true);
//        this.titanAnim.animations.add('idle', [8, 9, 10, 11], 5, true);
//        this.titanAnim.animations.add('eat', [12, 13, 14, 15], 8, true);
//    }
//
//
//
//    _randomMovement() {
//        if (this.idle === true) {
//            var randomBehaviour = Math.floor(Math.random() * 10) + 1;
//            if (randomBehaviour < 3) {
//                this.body.velocity.x = 0;
//                this.body.velocity.y = 0;
//            } else {
//                var randomX = Math.floor(Math.random() * 40) + 1;
//                randomX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
//                randomX += this.positionX;
//                var randomY = Math.floor(Math.random() * 40) + 1;
//                randomY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
//                randomY += this.positionY;
//                this.game.physics.arcade.moveToXY(this, randomX, randomY, 55);
//            }
//        } else {
//            this.randomTimer = 0
//        }
//    }
//
//    _attackMove() {
//        if (this.body.velocity.x < 0) {
//            this.titanAnim.scale.setTo(-1.0, 1.0);
//        } else if (this.body.velocity.x > 0) {
//            this.titanAnim.scale.setTo(1.0, 1.0);
//        }
//        if (this.attacking === true && this.distanceToTarget < 40) {
//            this.titanAnim.animations.play('eat')
//        } else if (this.body.velocity.y < 0) {
//            this.titanAnim.animations.play('away');
//        } else if (this.body.velocity.y > 0) {
//            this.titanAnim.animations.play('toward');
//        }
//
//        if (this.attacking === false) {
//            this.attacking = true;
//            this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function () {
//                this.attacking = false
//            }, this);
//            this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 45);
//        }
//
//    }
//
//    _idleMove() {
//
//
//        if (this.body.velocity.y < 0) {
//            this.titanAnim.animations.play('away');
//        } else if (this.body.velocity.y > 0) {
//            this.titanAnim.animations.play('toward');
//        } else {
//            this.titanAnim.animations.play('idle')
//        }
//        if (this.body.velocity.x < 0) {
//            this.titanAnim.scale.setTo(-1.0, 1.0);
//        } else if (this.body.velocity.x > 0) {
//            this.titanAnim.scale.setTo(1.0, 1.0);
//        }
//
//    }
//
//    update() {
//        if (this.idle === true) {
//            this._idleMove();
//        } else {
//            this._attackMove();
//        }
//
//
//    }
//}