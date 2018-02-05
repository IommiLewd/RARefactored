class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        //this.background = this.game.add.sprite(0, 0, 'background');
        this.game.stage.disableVisibilityChange = true;
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        var spriteWidth = this.game.world.width / 64;
        console.log(spriteWidth);
        var spriteHeight = this.game.world.height / 64;
        console.log(spriteHeight);
        for (var y = 0; y < spriteHeight; y++) {
            var ySpawn = y * 64;
            for (var x = 0; x < spriteWidth; x++) {
                var xSpawn = x * 64;
                this.testSprite = this.game.add.sprite(xSpawn, ySpawn, 'groundTiles');
                var randN = Math.floor(Math.random() * 12) + 1;
                this.testSprite.frame = randN;
            }
        }
    }
    
    _spawnFoliage(amount){
        if(amount === undefined){
            amount = 20;
        }
        for(var i = 0; i < amount; i++){
        
            var randX = Math.floor(Math.random() * this.game.world.width - 200) + 200;
            
            var randY = Math.floor(Math.random() * this.game.world.height - 200) + 200;
            console.log(this.game.world.width);
        this.treeShade = this.game.add.sprite(randX, randY, 'flagShade');
        this.treeShade.anchor.setTo(0.5);
        this.testTree = this.game.add.sprite(0,0 , 'foliage');
        this.testTree.anchor.setTo(0.5, 1.0); 
        this.treeShade.addChild(this.testTree);
        var randN = Math.floor(Math.random() * 4) + 1;
        this.testTree.frame = randN;
        this.depthSorter.add(this.treeShade);
    }}

    _spawnObject() {
        this.testSprite = this.game.add.sprite(100, 300, 'testObject');
        this.testSprite.health = 400;
        this.objectArray.push(this.testSprite);
        this.depthSorter.add(this.testSprite);
        this.testSprite.anchor.setTo(0.5, 1.0);


    }
    _spawnMarker() {
        this.marker = this.game.add.sprite(300, 300, 'flag');
        this.marker.anchor.setTo(0.5, 1.0);
        this.depthSorter.add(this.marker);
        this.flagShade = this.game.add.sprite(0, 0, 'flagShade');
        this.flagShade.anchor.setTo(0.5);
        this.marker.addChild(this.flagShade);
    }


    _spawnTitan(type) {
        this.titan = new titan(this.game, 300, 300, undefined, type);
        this.titan._movementHandler();
        this.titanArray.push(this.titan);
        this.depthSorter.add(this.titan);
    }

    _moveFlag() {

        this.marker.x = this.game.input.x;
        this.marker.y = this.game.input.y;
        //        this.titans.forEach(function (titan) {
        //            titan.positionX = this.game.input.x;
        //            titan.positionY = this.game.input.y;
        //        }, this)
        for (var i = 0; i < this.titanArray.length; i++) {
            this.titanArray[i].positionX = this.game.input.x;
            this.titanArray[i].positionY = this.game.input.y;
            this.positionX = this.game.input.x;
            this.positionY = this.game.input.y;
            this.titanArray[i]._movementHandler();
        }



    }




    preload() {}

    create() {
        this._loadLevel();
        this.timer = 0;
        this.titanArray = [];
        this.objectArray = [];
        this.enemyArray = [];
        this.depthSorter = this.game.add.group();
        
        this._spawnFoliage();
        this._spawnMarker();
        this._spawnTitan(1);
        this._spawnTitan();
        this._spawnTitan();
        this._spawnTitan();
        this._spawnObject();







    }

    _rangeSolver() {
        for (var i = 0; i < this.titanArray.length; i++) {
            var titanX = this.titanArray[i].x;
            var titanY = this.titanArray[i].y;


            var titanBounds = this.titanArray[i].getBounds();


            for (var j = 0; j < this.objectArray.length; j++) {
                var objectX = this.objectArray[j].x;
                var objectY = this.objectArray[j].y;
                this.targetDistance = this.game.math.distance(objectX, objectY, titanX, titanY);
                if (this.targetDistance < 160) {
                    this.titanArray[i].targetX = objectX;
                    this.titanArray[i].targetY = objectY;
                    this.titanArray[i].idle = false;
                    this.titanArray[i].distanceToTarget = this.targetDistance;
                    var objectBounds = this.objectArray[j].getBounds();
                    var overlapSolver = Phaser.Rectangle.intersects(objectBounds, titanBounds);
                    if (overlapSolver) {
                        this.objectArray[j].health -= 1;
                    }

                    if (this.objectArray[j].health < 0) {
                        console.log('DEAD');
                        this.objectArray[j].x = -100;
                        this.objectArray[j].y = -100;
                        this.objectArray[j].health = 800;
                        for (var u = 0; u < this.titanArray.length; u++) {
                            this.titanArray[u].targetX = -100;
                            this.titanArray[u].targetY = -100;
                            this.titanArray[u]._movementHandler();
                        }
                    }
                } else {
                    this.titanArray[i].idle = true;
                    this.titanArray[i].distanceToTarget = 200;

                }
            }
        }
    }




    update() {

        this._rangeSolver();

        this.depthSorter.sort('y', Phaser.Group.SORT_ASCENDING);

        if (this.game.input.activePointer.leftButton.isDown && this.timer < this.game.time.now) {
            this.timer = this.game.time.now + 400;
            this._moveFlag();
        }

        if (this.game.input.activePointer.rightButton.isDown) {
            this.testSprite.x = this.game.input.x;
            this.testSprite.y = this.game.input.y;
            // this.testSprite.kill();
        }
    }

    render() {
        //          this.game.debug.body(this.player);
    }
}