class Gameover extends Phaser.Scene {
    constructor() {
        super({key: 'Gameover'});
    }

    preload(){

        console.log('Scene: Gameover');

    }

    create() {
        this.add.text(6000, 300, 'GameOver', {color: '#fff', fontSize:50});
    }

    update(){

    }

}

