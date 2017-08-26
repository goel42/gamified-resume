var w = window.innerWidth;
var h = window.innerHeight;
var platformLength = 19200;
var platformHeight = h-70;
var xcoord_ledge = 3100 +w+100;
var xcoord_waterPanel1 = 4000 +w+100;
var xcoord_groundRestart = 6900 +w+100;
var waterLength = 500
var delay =0;
var xcoord_fbd = 100 + w+100;
var xcoord_bus_left = 700 +w+100;
var xcoord_bus_right = 1500+ w+100;
var xcoord_school = 1000 + w+100;
var xcoord_iiit = 2200 + w+100;

var explosion_count = 0;

var direction = "right";


var game = new Phaser.Game(w,h,Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload(){
	game.load.spritesheet('finalDude' , 'assets/sprite1.png', 645/8, 160);
	game.load.spritesheet('dude' , 'assets/dude.png', 32, 48);
	game.load.spritesheet('dude2' , 'assets/dude4.png', 75, 160);
	game.load.spritesheet('dude3' , 'assets/dude1.png', 768/4, 768/4);	
	game.load.image('sky', 'assets/sky1.png');
    game.load.image('flag', 'assets/flag.png')
    game.load.image('platform', 'assets/brick.png')
    game.load.image('speechBubble' , 'assets/speechbubble.png')
    game.load.image('ledgeBrick', 'assets/brick_small.png');
    game.load.image('questionBrick' , 'assets/question_block_small.png');
	game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.spritesheet('waterAtlas' , 'assets/water.png', 100, 80);
    game.load.image('waterBubble', 'assets/bubble256.png');
    game.load.image('fbd', 'assets/fbd.png')
    game.load.image('bus', 'assets/bus.png' )
    game.load.image('bus_static', 'assets/bus.png');
    game.load.image('school', 'assets/school.png');
    game.load.image('iiit', 'assets/school.png');
    game.load.image('submarine', 'assets/submarine.png')

}

var player;
var cursors;
var plaforms;
var waterPanel1;

var bus_static_left;
var bus_static_right;

function create(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var sky = game.add.tileSprite(0, 0,platformLength,h,'sky');
	    game.world.setBounds(0, 0, platformLength, h);
	    // game.world.setBounds(0, 0, platformLength, h-40+ (7*80));
	  	// game.world.setBounds(0, 0,platformLength,h+800);


	    platforms = game.add.group();
	    platforms.enableBody = true;
	    ground = game.add.tileSprite(0,platformHeight,xcoord_waterPanel1, 2000, 'platform');
	    platforms.add(ground)
	    ground.body.immovable = true;
	    ground = game.add.tileSprite(xcoord_groundRestart,platformHeight,platformLength-xcoord_groundRestart, 2000, 'platform');
	    platforms.add(ground)
	    ground.body.immovable = true;

	    fbd = game.add.sprite(xcoord_fbd, h-390, 'fbd');
	    fbd.scale.setTo(0.1,0.1);

	 	//SKILLS
	 	ledgeBricks = game.add.group();
	 	questionBricks = game.add.group();
	 	questionBricks.enableBody  =true;
	 	ledgeBricks.enableBody = true;

	 	var i = xcoord_ledge;
	 	var s = 0.5;
	 	for(i = xcoord_ledge; i<= xcoord_ledge + 9*119*s; i+=2*119*s){
			var ledgeBrick = game.add.sprite(i, (h-450)*s, 'ledgeBrick');
			ledgeBrick.scale.setTo(s,s);
			ledgeBricks.add(ledgeBrick);
			ledgeBrick.body.immovable = true;


			var questionBrick = game.add.sprite(i+(119*s),(h-450)*s,'questionBrick');
			questionBrick.scale.setTo(s,s);
			questionBricks.add(questionBrick);
			questionBrick.body.immovable = true;

	 	}

	 	ledgeBrick = game.add.sprite(i, (h-450)*s, 'ledgeBrick');
	 	ledgeBrick.scale.setTo(s,s);
		ledgeBricks.add(ledgeBrick);
		ledgeBrick.body.immovable = true;


		waterPanel1 = game.add.group();
		waterPanel1.enableBody = true;
		for( var j=h-40;j<h-40+9*80;j+=80){	
			for( var i =xcoord_waterPanel1;i<xcoord_groundRestart;i+=100){
				var water = game.add.sprite(i,j,'waterAtlas');
				waterPanel1.add(water);	
			}
		}
		waterPanel1.callAll('animations.add', 'animations', 'run', [0,1], 2, true);
		waterPanel1.callAll('play', null, 'run');
		createBubbles();

		


		waterPanel = game.add.group();
		for( var j=0;j<=h;j+=80){	
			for( var i =500;i>=0;i-=100){
				var water = game.add.sprite(platformLength-i,j,'waterAtlas');
				waterPanel.add(water);	
			}
		}
		waterPanel.callAll('animations.add', 'animations', 'run', [0,1], 2, true);
		waterPanel.callAll('play', null, 'run');


    	school = game.add.sprite (xcoord_school,h-420,'school');
    	school.scale.setTo(0.25,0.25);
    	iiit = game.add.sprite(xcoord_iiit,h-420,'iiit');
    	iiit.scale.setTo(0.25,0.25);


	    player = game.add.sprite(32, 0, 'finalDude');
    	game.physics.arcade.enable(player);
    	player.anchor.setTo(0.5,0.5);
    	player.body.gravity.y = 600;
    	player.body.collideWorldBounds = true;
    	player.animations.add('left', [0, 1, 2, 3,4,5,6,7], 10, true);
    	player.animations.add('right', [0, 1, 2, 3,4,5,6,7], 10, true);

    	bus_static_left = game.add.sprite(xcoord_bus_left,h-300,'bus_static');
    	bus_static_right = game.add.sprite(xcoord_bus_right,h-300,'bus_static');
    	bus_static_right.visible = false;
    	// bus.scale.setTo(0.1,0.1);    
    	// game.physics.arcade.enable(bus);
    	// bus.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    // game.camera.follow(platforms);
    game.camera.follow(player,Phaser.Camera.FOLLOW_PLATFORMER);

    explosions = game.add.group();
    explosions.createMultiple(10, 'kaboom');
}



function update() {

	    player.body.velocity.x = 0;
 //    if(player.key =='bus'){
 //    	console.log("blah");
 //    	player.body.velocity.y = 0;
	// }
	if ( player.key == 'submarine'){
		player.loadTexture('finalDude',0,true);

	}

	game.physics.arcade.overlap(player, waterPanel1, collisionHandler3,null,this);
	// game.physics.arcade.overlap(player, bus, collisionHandler4,null,this);
	// game.physics.arcade.collide(bus,platforms);
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(player, questionBricks, collisionHandler, null, this);
	game.physics.arcade.collide(player, ledgeBricks);

    if(player.body.x>=xcoord_bus_left && player.body.x<=xcoord_bus_right){
    	player.loadTexture('bus',0,true);
    	bus_static_right.visible = false;
    	bus_static_left.visible = false;
    }else if(player.body.x>=xcoord_waterPanel1 && player.body.x<=xcoord_groundRestart){
		console.log("bbbbb");
		game.world.resize(19200,h-40+9*80);	    
		// game.world.setBounds(0, 0, platformLength, h+800);

	}else{
    	if(player.key == "bus"){
    		player.loadTexture('finalDude',0,true);
    	}
    	if(player.body.x < xcoord_bus_left){
    		bus_static_left.visible = true;
    		bus_static_right.visible = false;
    	}
    	if(player.body.x>xcoord_bus_right ){
			bus_static_left.visible = false;
    		bus_static_right.visible = true;
    	}
		//Handling the waterPanel1 case 
    	if(player.body.x<xcoord_waterPanel1 || player.body.x>=xcoord_groundRestart){
			game.world.resize(19200,h);	    
		}
    }


	if (cursors.left.isDown){
        //  Move to the left
        // player.anchor.setTo(0.5,0.5);
        direction = "left";
        player.scale.x =-1;
        // player.scale.setTo(-1,1)
        player.body.velocity.x = -1000;
        player.animations.play('left');
    }else if (cursors.right.isDown){
    	direction = "right";
        player.scale.x=1;
        player.body.velocity.x = 1000;
        player.animations.play('right');
    }else{
        //  Stand still
        player.animations.stop();

        player.frame = 1;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown )
    {	
    	if(player.key == 'finalDude' || player.key == 'submarine'){
        	player.body.velocity.y = -1000;
    	}
    }

}

function createBubbles(){
	console.log("pooooop43");
	for (var i = 0; i < 20; i++)
    {
        var sprite = game.add.sprite(game.rnd.realInRange(xcoord_waterPanel1,xcoord_groundRestart), h-40+9*80, 'waterBubble');

        sprite.scale.set(game.rnd.realInRange(0.1, 0.3));
        sprite.alpha -=0.1;

        var speed = game.rnd.between(4000, 6000);

        game.add.tween(sprite).to({ y:h-game.rnd.realInRange(100,250),}, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

        delay += 300;
    }
}

function collisionHandler(player, questionBrick){
	if(player.body.touching.up && player.world.x > questionBrick.world.x){
		
		var explosion = explosions.getFirstExists(false);
		if(explosion){
			explosion_count++;
		    explosion.reset(questionBrick.body.x-50, questionBrick.body.y-50);
		    explosion.scale.setTo(1.5,1.5);
		    explosion.animations.add('kaboom');
		    explosion.animations.play('kaboom', 60, false, true);
		}

		questionBrick.kill();


	}
}

function collisionHandler3(player, water){
	player.loadTexture('submarine',0,true);
	// player.scale.setTo(0.25,0.25);
}

// function collisionHandler4(player,bus1){
// 	player.loadTexture('bus',0,true);
// 	bus.visible = false;
// }

function render(){
}