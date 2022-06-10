


const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "container",
    pixelArt: true,
    type: Phaser.AUTO,
    scene: [BootGame],
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

// swal("Bienvenidos a mi Juego", "Por el momento solo defini el movimiento y algunas cosas basicas en phaser.js. El personaje se mueve con los botones W,A,S,D.");


let game = new Phaser.Game(config);

let arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -530;

let mapa;

function preload(){
     // sprite personajes
    this.load.spritesheet('pjidle','assets/sprite/idle.png' , { frameWidth: 120, frameHeight: 40 });
    this.load.spritesheet('pjJump','assets/sprite/jump.png' , { frameWidth: 120, frameHeight: 40 });
    this.load.spritesheet('pjrun','assets/sprite/run.png' , { frameWidth: 120, frameHeight: 40 });
    this.load.spritesheet('pjAtk','assets/sprite/atacar.png' , { frameWidth: 120, frameHeight: 40 });
    // sprite enemigos
    this.load.spritesheet('zombie' , 'assets/sprite/burning-ghoul.png' , {frameWidth: 57, frameHeight: 60});
    this.load.spritesheet('zombie2' , 'assets/sprite/burning-ghoul.png' , {frameWidth: 57, frameHeight: 60});
    this.load.spritesheet('angel' , 'assets/sprite/angel.png' , {frameWidth: 122, frameHeight: 117});
    this.load.spritesheet('angel2' , 'assets/sprite/angel.png' , {frameWidth: 122, frameHeight: 117});
    this.load.spritesheet('perro' , 'assets/sprite/perro.png' , {frameWidth: 67, frameHeight: 32});
    this.load.spritesheet('perro2' , 'assets/sprite/perro.png' , {frameWidth: 67, frameHeight: 32});
    this.load.spritesheet('calabera' , 'assets/sprite/fire-skull.png' , {frameWidth: 96, frameHeight: 112});
    this.load.spritesheet('calabera2' , 'assets/sprite/fire-skull.png' , {frameWidth: 96, frameHeight: 112});
    this.load.spritesheet('calabera3' , 'assets/sprite/fire-skull.png' , {frameWidth: 96, frameHeight: 112});
    this.load.spritesheet('evil' , 'assets/sprite/hell-beast-idle.png' , {frameWidth: 56, frameHeight: 67});
    this.load.spritesheet('horse' , 'assets/sprite/nightmare-galloping.png' , {frameWidth: 139, frameHeight: 96});
    // sprite boss
    this.load.spritesheet('boss' , 'assets/sprite/boss_Idle.png' , {frameWidth: 128, frameHeight: 64});









    //mapa
    this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
    this.load.image('tiles', 'assets/mapa/tileSets1.png'); 
  
}

function create(){
    //mapa
    mapa = this.make.tilemap({ key: 'mapa' });
    let tileSets = mapa.addTilesetImage('tileSets1', 'tiles');

    let fondo5 = mapa.createLayer('fondo5', tileSets, 0, 0);
    let fondo3 = mapa.createLayer('fondo3', tileSets, 0, 0);
    let fondo4 = mapa.createLayer('fondo4', tileSets, 0, 0);
    let fondo2 = mapa.createLayer('fondo2', tileSets, 0, 0);
    let fondo = mapa.createLayer('fondo', tileSets, 0, 0);
    let solidos = mapa.createLayer('solidos', tileSets, 0, 0);
    solidos.setCollisionByProperty({ solido: true });

    


    //Fisicas
    this.personaje = this.physics.add.sprite(2600,1900,'pjidle', 0).setScale(2); // cambiar a 100,100
    //Enemigos
    this.enemigo = this.physics.add.sprite(900,200,'zombie', 0).setScale(2); 
    this.angel = this.physics.add.sprite(300,500,'angel', 0).setScale(2);
    this.angel2 = this.physics.add.sprite(250,1600,'angel2', 0).setScale(2);
    this.perro = this.physics.add.sprite(1600,200,'perro', 0).setScale(2);
    this.perro2 = this.physics.add.sprite(2900,650,'perro2', 0).setScale(2);
    this.zombie = this.physics.add.sprite(1900,360,'zombie2', 0).setScale(2);
    this.calabera = this.physics.add.sprite(3100,800,'calabera', 0).setScale(1);
    this.calabera2 = this.physics.add.sprite(2000,1000,'calabera2', 0).setScale(1);
    this.calabera3 = this.physics.add.sprite(1300,1600,'calabera3', 0).setScale(1);
    this.evil = this.physics.add.sprite(700,1100,'evil', 0).setScale(2);
    this.horse = this.physics.add.sprite(1000,2000,'horse', 0).setScale(1);
    //boss
    this.boss = this.physics.add.sprite(2900,1900,'boss', 0).setScale(2);





    




    // hitBox
    this.personaje.setSize(25,0);
    this.enemigo.setSize(40,0);
    this.boss.setSize(40,0);



    //fisicas sprite
    this.physics.add.collider(this.personaje, solidos);
    this.physics.add.collider(this.enemigo, solidos);
    this.physics.add.collider(this.angel, solidos);
    this.physics.add.collider(this.angel2, solidos);
    this.physics.add.collider( this.perro, solidos);
    this.physics.add.collider( this.perro2, solidos);
    this.physics.add.collider( this.zombie, solidos);
    this.physics.add.collider( this.calabera, solidos);
    this.physics.add.collider( this.calabera2, solidos);
    this.physics.add.collider( this.evil, solidos);
    this.physics.add.collider( this.horse, solidos);
    this.physics.add.collider( this.calabera3, solidos);
    this.physics.add.collider( this.boss, solidos);


    //camara
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.startFollow(this.personaje);

    //Controles
    
    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    atk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        key: 'Atk',
        frames: this.anims.generateFrameNumbers('pjAtk', { start: 0 , end: 3 }),
        repeat: -1,
        framerate: 12
    });
    
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('pjJump', { start: 0 , end: 4 }),
        repeat: -1,
        framerate: 12
    });


   //Animaciones Enemigos

    this.anims.create({
        key: 'angel_idle',
        frames: this.anims.generateFrameNumbers('angel', { start: 0 , end: 10}),
        repeat: -1,
        framerate: 12
    });
    this.anims.create({
        key: 'perro_run',
        frames: this.anims.generateFrameNumbers('perro', { start: 0 , end: 4}),
        repeat: -1,
        framerate: 12
    });

   this.anims.create({
    key: 'zombie_run',
    frames: this.anims.generateFrameNumbers('zombie', { start: 1 , end: 7 }),
    repeat: -1,
    framerate: 12
   });

    this.anims.create({
    key: 'calabera_idle',
    frames: this.anims.generateFrameNumbers('calabera', { start: 1 , end: 7 }),
    repeat: -1,
    framerate: 12
    });

    this.anims.create({
        key: 'evil_idle',
        frames: this.anims.generateFrameNumbers('evil', { start: 0 , end: 4}),
        repeat: -1,
        framerate: 12
    });
    this.anims.create({
        key: 'horse_run',
        frames: this.anims.generateFrameNumbers('horse', { start: 0 , end: 3}),
        repeat: -1,
        framerate: 12
    });

    //boss animacion
    this.anims.create({
        key: 'boss_idle',
        frames: this.anims.generateFrameNumbers('boss', { start: 0 , end: 7}),
        repeat: -1,
        framerate: 12
    });




    this.personaje.anims.play('idle');
    this.personaje.anims.play('run');
    this.personaje.anims.play('jump');
    this.personaje.anims.play('Atk');
    this.enemigo.anims.play('zombie_run');
    this.angel.anims.play('angel_idle');
    this.angel2.anims.play('angel_idle');
    this.perro.anims.play('perro_run');
    this.perro2.anims.play('perro_run');
    this.zombie.anims.play('zombie_run');
    this.calabera.anims.play('calabera_idle');
    this.calabera2.anims.play('calabera_idle');
    this.calabera3.anims.play('calabera_idle');
    this.evil.anims.play('evil_idle');
    this.horse.anims.play('horse_run');

    this.boss.anims.play('boss_idle');






   



    // interpolaciones


   let timeline = this.tweens.createTimeline();
        timeline.add({
            targets: [this.enemigo, this.perro],
            x: 200,
            ease: 'Power1',
            duration: 5000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

        timeline.play();

 let timeline3 = this.tweens.createTimeline();

        timeline3.add({
            targets: this.perro2,
            x: 2200,
            ease: 'Power2',
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

    timeline3.play();

    let timeline4 = this.tweens.createTimeline();

    timeline4.add({
        targets: this.zombie,
        x: 1500,
        ease: 'Power2',
        duration: 3000,
        flipX: true,
        yoyo: true,
        repeat: -1
    });

timeline4.play();

let timeline5 = this.tweens.createTimeline();

timeline5.add({
    targets: this.calabera,
    props: {
        x: { value: 2700, duration: 2000, flipX: true },
        y: { value: 1100, duration: 5000,  },
    },   
    yoyo: true,
    repeat: -1 
});

timeline5.play();

let timeline6 = this.tweens.createTimeline();

timeline6.add({
    targets: this.calabera2,
    props: {
        x: { value: 1200, duration: 5000, flipX: true },
        y: { value: 1100, duration: 5000,  },
    },   
    yoyo: true,
    repeat: -1
});

timeline6.play();

let timeline7 = this.tweens.createTimeline();
timeline7.add({
    targets: this.evil,
    x: 700,
    ease: 'Power1',
    duration: 5000,
    flipX: true,
    yoyo: true,
    repeat: -1
});

timeline7.play();

let timeline8 = this.tweens.createTimeline();
timeline8.add({
    targets: this.horse,
    x: 100,
    ease: 'Power1',
    duration: 3000,
    flipX: true,
    yoyo: true,
    repeat: -1
});

timeline8.play();

let timeline9 = this.tweens.createTimeline();

timeline9.add({
    targets: this.calabera3,
    props: {
        x: { value: 300, duration: 2000, flipX: true },
        y: { value: 1600, duration: 5000,  },
    },   
    yoyo: true,
    repeat: -1 
});
timeline9.play();



    let timeline2 = this.tweens.timeline({
        targets: this.angel,
        ease: 'Power1',
        loop: -1,
        totalDuration: 10000,
        tweens: [
            {
                y: 400
            },
            {
                y: 500
              
            }
        ]
    });
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
    else if((atk.isDown) && this.personaje.body.onFloor()){
        this.personaje.anims.play('Atk', true);
    }
    else if(!this.personaje.body.onFloor()){
        this.personaje.anims.play('jump');
    }
    else{
        this.personaje.anims.play('idle', true);
    }
  

}


