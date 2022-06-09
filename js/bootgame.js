class BootGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    // loadbar
    // this.bar = new Bar({ scene: this });

    // load assets
    // load tiled map

    // images
  
    // atlas
    this.load.atlas("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json" );
    // audio
 
    // title assets
  

  }

  create() {

    this.scene.start("titleScreen");
  }
}


class Bar extends Phaser.GameObjects.Container{
  constructor(config){
    super(config.scene);
    this.scene = config.scene;

    let progressBar = this.scene.add.graphics();
    let progressBox = this.scene.add.graphics();
    let boxWidth = 80;
    let boxHeight = 10;
    let barWidth = boxWidth - 4;
    let barHeight = boxHeight - 4;
    let boxCenterX = game.config.width / 2 - boxWidth/2;
    let boxCenterY = game.config.height / 2 - boxHeight/2 ;
    let barCenterX = boxCenterX + 2;
    let barCenterY = boxCenterY + 2;

    progressBox.fillStyle(0xffffff, 0.6);
    progressBox.fillRect(boxCenterX, boxCenterY, boxWidth, boxHeight);

    this.scene.load.on('progress', function(value) {
      var mybarWidth = barWidth - 4;
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(barCenterX , barCenterY, barWidth * value, barHeight);
    });

   }
}
