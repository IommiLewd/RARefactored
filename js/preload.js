class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.script('initialLevel', 'js/InitialLevel/initialLevel.js');
       this.load.image('flag', 'img/flag.png');
       this.load.image('testObject', 'img/testObject.png');
       this.load.image('flagShade', 'img/flagShade.png');
       this.load.image('background', 'img/background.png');
        this.load.spritesheet('titan', 'img/titanSheet.png', 30, 44, 16);
        this.load.spritesheet('titanLord', 'img/titanLordSheet.png', 36, 52, 16);
        
    
        this.load.spritesheet('groundTiles', 'img/groundTiles.png', 64,64,8);
        this.load.image('shade', 'img/shade.png');
        this.load.script('titan', 'js/entities/titan.js');
     //   this.load.script('titanLord', 'js/entities/titanLord.js');

    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }


}