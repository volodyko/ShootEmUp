export default class Preload {

	constructor(){
		this.preloadAsset = null;
		this.ready = false;
	}

	preload(){
		this.load.image('loading_bg','assets/images/loading_bg.jpg');
	}

	create(){
		this.add.sprite(0,0, "loading_bg");
		this.preloadAsset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
		this.preloadAsset.anchor.setTo(0.5,0.5);
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.load.setPreloadSprite(this.preloadAsset);
		//load here
	  	
	  	this.load.image('enemy', 'assets/images/enemy.png');
	    this.load.image('explosion', 'assets/images/explosion.png');

	    this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
	    this.load.image('hexagon', 'assets/images/hexagon_particle.png');
	    this.load.image('bullet', 'assets/images/bullet.png');
	    this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
	    this.load.image('bg', 'assets/images/bg.jpg');

	    this.load.image('health_bar', 'assets/images/health_bar.png');
	    this.load.image('health_holder', 'assets/images/health_holder.png');
	    this.load.image('circle', 'assets/images/circle.png');


		this.load.start();
	}

	update(){
		if(this.ready){
			this.game.state.start('game');
		}
	}


	onLoadComplete(){
		this.ready = true;
	}

}