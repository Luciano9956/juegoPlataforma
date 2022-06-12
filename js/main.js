
// ecena titleScreen

class TitleScreen extends Phaser.Scene {

    constructor (config)
    {
        super(config);
    }
    preload ()
    {
    }

    create (data)    {
        swal("", {
            title: "E-COMMERCE MALIGNOS",
              buttons: {
              cancel: "Instrucciones",
              catch: {
                text: "Jugar!",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
           
              case "catch":
                swal("Tienes que salvar al pobre gatito, estos deminios no paran de hacer E-Commerce y estan eradicando con los gatitos");
                break;
           
              default:
                swal("Te moves con A,D y saltas con W, Tu objetivo es esquivar a los enemigos y rescatar el gato del final del nivel");
            }
          });

    }

}



// configuracion del phaser

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "container",
    scene: [TitleScreen],
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
        update: update,
    }
}




let game = new Phaser.Game(config);
game.scene.add('myScene', TitleScreen, true, { x: 600, y: 500 });


let arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -630;


let mapa;



function preload(){
     // sprite personajes
    this.load.spritesheet('pjidle','assets/sprite/idle.png' , { frameWidth: 120, frameHeight: 40 });
    this.load.spritesheet('pjJump','assets/sprite/jump.png' , { frameWidth: 120, frameHeight: 40 });
    this.load.spritesheet('pjrun','assets/sprite/run.png' , { frameWidth: 120, frameHeight: 40 });
   
    // sprite enemigos
    this.load.spritesheet('zombie' , 'assets/sprite/burning-ghoul.png' , {frameWidth: 57, frameHeight: 60});
    this.load.spritesheet('zombie2' , 'assets/sprite/burning-ghoul.png' , {frameWidth: 57, frameHeight: 60});
    this.load.spritesheet('angel' , 'assets/sprite/angel.png' , {frameWidth: 122, frameHeight: 117});
    this.load.spritesheet('perro' , 'assets/sprite/perro.png' , {frameWidth: 67, frameHeight: 32});
    this.load.spritesheet('perro2' , 'assets/sprite/perro.png' , {frameWidth: 67, frameHeight: 32});
    this.load.spritesheet('calabera' , 'assets/sprite/fire-skull.png' , {frameWidth: 96, frameHeight: 112});
    this.load.spritesheet('evil' , 'assets/sprite/hell-beast-idle.png' , {frameWidth: 56, frameHeight: 67});
    this.load.spritesheet('horse' , 'assets/sprite/nightmare-galloping.png' , {frameWidth: 139, frameHeight: 96});
    this.load.spritesheet('cat' , 'assets/sprite/cat.png' , {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('boss' , 'assets/sprite/boss_run.png' , {frameWidth: 128, frameHeight: 64});

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

    //Fisicas del Personaje
    this.personaje = this.physics.add.sprite(60,180,'pjidle', 0).setScale(2); 
    //Fisicas del Enemigos
    this.zombie = this.physics.add.sprite(1800,200,'zombie', 0).setScale(2); 
    this.angel = this.physics.add.sprite(3000,500,'angel', 0).setScale(2);
    this.perro = this.physics.add.sprite(1600,200,'perro', 0).setScale(2).setImmovable(true);
    this.perro2 = this.physics.add.sprite(2700,650,'perro2', 0).setScale(2);
    this.zombie2 = this.physics.add.sprite(2300,340,'zombie2', 0).setScale(2);
    this.calabera = this.physics.add.sprite(3900,200,'calabera', 0).setScale(1);
    this.evil = this.physics.add.sprite(5100,200,'evil', 0).setScale(2);
    this.horse = this.physics.add.sprite(4700,450,'horse', 0).setScale(1);
    this.boss = this.physics.add.sprite(50,340,'boss', 0).setScale(2);
    this.cat = this.physics.add.sprite(6170,450,'cat', 0).setScale(2);


    


    // colisiones
    window.personaje = this.personaje;
    window.perro = this.perro;
    window.angel = this.angel;
    window.perro2 = this.perro2;
    window.calabera = this.calabera;
    window.evil = this.evil;
    window.zombie = this.zombie;
    window.zombie2 = this.zombie2;
    window.horse = this.horse;
    window.boss = this.boss;
    window.cat = this.cat;



    // hitBox
    this.personaje.setSize(25,0);
    this.zombie.setSize(40,0);
    this.zombie2.setSize(40,0);
    this.angel.setSize(40,0);
    this.horse.setSize(40,0);
    this.evil.setSize(40,0);
    this.boss.setSize(40,0);
    this.calabera.setSize(40,0);


    //fisicas sprite
    this.physics.add.collider(this.personaje, solidos);
    this.physics.add.collider(this.zombie, solidos);
    this.physics.add.collider(this.angel, solidos);
    this.physics.add.collider( this.perro, solidos);
    this.physics.add.collider( this.perro2, solidos);
    this.physics.add.collider( this.zombie2, solidos);
    this.physics.add.collider( this.evil, solidos);
    this.physics.add.collider( this.horse, solidos);
    this.physics.add.collider( this.boss, solidos);
    this.physics.add.collider( this.cat, solidos);



    //camara
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.startFollow(this.personaje);

    //Controles
    
    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    // Animaciones 


    // animacion personaje

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
    this.anims.create({
        key: 'boss_idle',
        frames: this.anims.generateFrameNumbers('boss', { start: 0 , end: 7}),
        repeat: -1,
        framerate: 12
    });
    this.anims.create({
        key: 'cat_idle',
        frames: this.anims.generateFrameNumbers('cat', { start: 0 , end: 14}),
        repeat: -1,
        framerate: 12
    });




    this.personaje.anims.play('idle');
    this.personaje.anims.play('run');
    this.personaje.anims.play('jump');
    this.zombie.anims.play('zombie_run');
    this.angel.anims.play('angel_idle');
    this.perro.anims.play('perro_run');
    this.perro2.anims.play('perro_run');
    this.zombie2.anims.play('zombie_run');
    this.calabera.anims.play('calabera_idle');
    this.evil.anims.play('evil_idle');
    this.horse.anims.play('horse_run');
    this.cat.anims.play('cat_idle');
    this.boss.anims.play('boss_idle');



    // interpolaciones


   let timeline = this.tweens.createTimeline();
        timeline.add({
            targets: [this.zombie,this.perro],
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
            x: 2400,
            ease: 'Power2',
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

    timeline3.play();

    let timeline4 = this.tweens.createTimeline();

    timeline4.add({
        targets: this.zombie2,
        x: 2000,
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
        x: { value: 3300, duration: 6000, flipX: true },
        y: { value: 1, duration: 2000,  },
    },   
    yoyo: true,
    repeat: -1 
});

timeline5.play();

let timeline6 = this.tweens.createTimeline();

timeline6.add({
    targets: this.boss,
    x: 1000,
    ease: 'Power1',
    duration: 8000,
    flipX: true,
    yoyo: true,
    repeat: -1
});

timeline6.play();

let timeline7 = this.tweens.createTimeline();
timeline7.add({
    targets: this.evil,
    x: 5100,
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
    x: 4200,
    ease: 'Power1',
    duration: 3000,
    flipX: true,
    yoyo: true,
    repeat: -1
});

timeline8.play();

let timeline10 = this.tweens.createTimeline();

timeline10.add({
    targets: this.angel,
    y: 100,
    duration: 3000,
    yoyo: true,
    repeat: -1 
});
timeline10.play();

      
}

function update() { 

    // colisiones y fin de partida

    this.physics.world.addCollider(this.personaje, this.zombie,()=>{
        zombie.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.perro,()=>{
        perro.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.angel,()=>{
        angel.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.angel2,()=>{
        angel2.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.zombie2,()=>{
        zombie2.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.evil,()=>{
        evil.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.perro2,()=>{
        perro2.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.calabera,()=>{
        calabera.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.boss,()=>{
        boss.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.calabera2,()=>{
        calabera2.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.calabera3,()=>{
        calabera3.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });
      this.physics.world.addCollider(this.personaje, this.horse,()=>{
        horse.destroy();
        swal("Lamentablemente tus habilidades no fueron suficiente para salvar ese gato de un malvado E-Commerce", {
            title: "MORISTE!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();           
            }
          });       
        this.scene.stop();
      });

      this.physics.world.addCollider(this.personaje, this.cat,()=>{
        cat.destroy();
        swal("Gracias a tu valentia y habilidad pudiste rescatar al gato de esos malvados demonios y evitar otro E-Commerce...", {
            title: "FELICIDADES RESCATASTE AL GATO!",
            buttons: {
              catch: {
                text: "volver a jugar?",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
            default:
                this.scene.restart();        
            }
          });       
        this.scene.stop();
      });
      

      // Input controles

    this.personaje.body.setVelocityX(0);
   if (this.personaje.active === true) {
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
        this.personaje.anims.play('idle', true);
    }

   }

}



    
    
 