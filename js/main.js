const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "container",
    pixelArt: true,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 1000 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game = new Phaser.Game(config);

let arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -530;

let mapa;

function preload(){
     // sprite personajes
    this.load.spritesheet('pjidle','assets/sprite/idle.png' , { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet('pjJump','assets/sprite/jump.png' , { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet('pjrun','assets/sprite/run.png' , { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet('pjCrounch','assets/sprite/CrouchFull.png' , { frameWidth: 120, frameHeight: 80 });

    //mapa
    this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
    this.load.image('tiles', 'assets/mapa/tileSets1.png');
    // this.load.image('tiles2', 'assets/mapa/decorative_obj.png');
    // this.load.image('tiles3', 'assets/mapa/bakcground_day1.png');

}

function create(){
    //mapa
    mapa = this.make.tilemap({ key: 'mapa' });
    let tileSets = mapa.addTilesetImage('tileSets1', 'tiles');

    // let tileSets1 = mapa.addTilesetImage('decorative_obj', 'tiles2');

    // let fondo = mapa.createLayer('fondo', tileSets1, 0, 0);

    let solidos = mapa.createLayer('solidos', tileSets, 0, 0);
    solidos.setCollisionByProperty({ solido: true });

    //Fisicas
    this.personaje = this.physics.add.sprite(100,100,'pjidle', 0).setScale(2);
    this.personaje.setSize(25,0);


    // this.personaje.setCollideWorldBounds(true);

    this.physics.add.collider(this.personaje, solidos);

    //camara
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.startFollow(this.personaje);

    //Controles
    
    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    // Animaciones 

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pjidle', {start: 0 , end: 9 }),
        repeat: -1,
        framerate: 12
    });
    

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('pjrun', { start: 0 , end: 9 }),
        repeat: -1,
        framerate: 12
    });
    
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('pjJump', { start: 0 , end: 4 }),
        repeat: -1,
        framerate: 12
    });

    this.anims.create({
        key: 'Crounch',
        frames: this.anims.generateFrameNumbers('pjCrounch', { start: 0 , end: 2 }),
        repeat: -1,
        framerate: 12
    });

    this.personaje.anims.play('idle');
    this.personaje.anims.play('run');
    this.personaje.anims.play('jump');
    this.personaje.anims.play('Crounch');
    
}

function update() {
    this.personaje.body.setVelocityX(0);

    if(izquierda.isDown){
        this.personaje.body.setVelocityX(-velocidad);
        this.personaje.flipX = true;
    }
    if(derecha.isDown){
        this.personaje.body.setVelocityX(velocidad);
        this.personaje.flipX = false;
    }
    if(arriba.isDown && this.personaje.body.onFloor()){
        this.personaje.body.setVelocityY(alturaSalto);
    }
    if((izquierda.isDown || derecha.isDown) && this.personaje.body.onFloor()){
        this.personaje.anims.play('run' ,true);
    }
    else if(!this.personaje.body.onFloor()){
        this.personaje.anims.play('jump');
    }
    else{
        this.personaje.anims.play('idle');
    }
    if(abajo.isDown){
        this.personaje.anims.play('Crounch');
        
    }
}


