var w = window.innerWidth;
var h = window.innerHeight;
// var platformLength = 19200;
var platformLength = 15000;
var platformHeight = h-70;
var xcoord_ledge = 3100 +w+100;
var y_ledge = h-50;
var xcoord_waterPanel1 = 4000 +w+100;
var xcoord_waterPanel2 = platformLength-1000;
var xcoord_groundRestart = 9000 +w+100;
var waterLength = 500
var delay =0;
var xcoord_fbd = w;
var xcoord_bus_left = 700 +w+100;
var xcoord_bus_right = 1500+ w+100;
var xcoord_school = 1000 + w+100;
var xcoord_iiit = 2200 + w+100;
var xcoord_rocket_static = platformLength-400;

var explosion_count = 0;

var direction = "right";


var style_roboto = { font:"24px monospace", fill:"#FFF",align:"center" };



var game = new Phaser.Game(w,h,Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload(){
	text = game.add.text(w/2, h/2, "Loading...",{ font:"80px Roboto",fill: '#ffffff' });
	text.anchor.setTo(0.5,0.5);
	game.load.image('intro', 'assets/intro.png');
	game.load.image('cloud', 'assets/cloud.png');
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
    game.load.spritesheet('coinsprite', 'assets/coinsprite.png', 110,595);
	game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.spritesheet('waterAtlas' , 'assets/water.png', 100, 80);
    game.load.image('waterBubble', 'assets/bubble256.png');
    game.load.image('milestone', 'assets/milestone.png');
    game.load.image('fbd', 'assets/faridabad.png')
    game.load.image('bus', 'assets/buswithman.png' )
    game.load.image('bus_static', 'assets/buswithoutman.png');
    game.load.image('school', 'assets/school.png');
    game.load.image('iiit', 'assets/school.png');
    game.load.image('submarine', 'assets/submarine.png')
    // game.load.image('PLtable', 'assets/programmingLangs.png')
    game.load.image('PLtable', 'assets/pl.png')
    game.load.image('table2', 'assets/table2.png');
    game.load.image('table3', 'assets/table3.png');
    game.load.image('signboard_skills', 'assets/signboard_skills.png');
    game.load.image('signboard_experience', 'assets/signboard_experience.png');
    game.load.image('signboard_cocurricular', 'assets/signboard_cocurricular.png');
    game.load.image('signboard_projects', 'assets/signboard_projects.png');
    game.load.image('signboard_onlineProfiles', 'assets/signboard_onlineprofiles.png');
    game.load.image('banner1', 'assets/banner1.png');
    game.load.image('banner2', 'assets/banner2.png');
    game.load.image('rocket', 'assets/rocketwithman.png');
    game.load.image('rocket_static', 'assets/rocketwithout.png');


}

var player;
var cursors;
var plaforms;
var waterPanel1;

var bus_static_left;
var bus_static_right;

function create(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// var sky = game.add.tileSprite(0, 0,platformLength,h,'sky');
		    // game.stage.backgroundColor = "#95CEEB";
		    // game.stage.backgroundColor = "#00BFF3";
		    game.stage.backgroundColor = "#2ECCFA";
		    // game.stage.backgroundColor = "#7FC3EC";



	    game.world.setBounds(0, 0, platformLength, h);
	    // game.world.setBounds(0, 0, platformLength, h-40+ (7*80));
	  	// game.world.setBounds(0, 0,platformLength,h+800);
	  	game.add.sprite(10,50,'cloud');
	  	game.add.sprite(800,h-750,'cloud');
	  	game.add.sprite(365,h-650,'cloud');
	  	game.add.sprite(w-150,100,'cloud');
	  	for(var i=w;i<20000;i+=1000){
			if(i>=6800 && i<=8100){
			game.add.sprite(i,h-680,'cloud');
			game.add.sprite(i+400,h-630+50,'cloud');
			}else{
			game.add.sprite(i,h-580,'cloud');
			game.add.sprite(i+400,h-630,'cloud');
			}
		}
		var introImg = game.cache.getImage('intro');
	  	var intro = game.add.sprite((w- introImg.width)/2,(h- introImg.height)/2-100,'intro');
	  	// intro.scale.setTo(0.2,0.2);
	  	platforms = game.add.group();
	    platforms.enableBody = true;
	    ground = game.add.tileSprite(0,platformHeight,xcoord_waterPanel1, 2000, 'platform');
	    platforms.add(ground)
	    ground.body.immovable = true;
	    ground = game.add.tileSprite(xcoord_groundRestart,platformHeight,platformLength-xcoord_groundRestart, 2000, 'platform');
	    platforms.add(ground)
	    ground.body.immovable = true;

	    milestone = game.add.sprite(w-550, platformHeight-300, 'milestone');
	    milestone.scale.setTo(0.65,0.65);
	    fbd = game.add.sprite(xcoord_fbd, h-400, 'fbd');
	    fbd.scale.setTo(0.6,0.6);

	 	//SKILLS
	 	ledgeBricks = game.add.group();
	 	questionBricks = game.add.group();
	 	questionBricks.enableBody  =true;
	 	ledgeBricks.enableBody = true;

	 	var i = xcoord_ledge;
	 	var s = 0.5;
	 	for(i = xcoord_ledge; i<= xcoord_ledge + 7*119*s; i+=2*119*s){
			var ledgeBrick = game.add.sprite(i, (y_ledge)*s, 'ledgeBrick');
			ledgeBrick.scale.setTo(s,s);
			ledgeBricks.add(ledgeBrick);
			ledgeBrick.body.immovable = true;


			var questionBrick = game.add.sprite(i+(119*s),(y_ledge)*s,'questionBrick');
			questionBrick.scale.setTo(s,s);
			questionBricks.add(questionBrick);
			questionBrick.body.immovable = true;

	 	}

	 	ledgeBrick = game.add.sprite(i, (y_ledge)*s, 'ledgeBrick');
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
		var PLtable = game.add.sprite(xcoord_waterPanel1+ 950,h-40+100,'PLtable'); 
		var table2 = game.add.sprite(xcoord_waterPanel1+950+1000+400,h-40+100,'table2');
		table2.scale.setTo(0.85,0.85);
		var table3 = game.add.sprite(xcoord_waterPanel1+950+2000+850, h-40+100,'table3');
		table3.scale.setTo(0.75,0.75);
		createBubbles();

		waterPanel = game.add.group();
		for( var j=-1400;j<=h;j+=80){	
			for( var i =1000;i>=0;i-=100){
				var water = game.add.sprite(platformLength-i,j,'waterAtlas');
				waterPanel.add(water);	
			}
		}
		waterPanel.callAll('animations.add', 'animations', 'run', [0,1], 2, true);
		waterPanel.callAll('play', null, 'run');

		rocket_static = game.add.sprite(xcoord_rocket_static,h-315,'rocket_static');



		var signboard_skills = game.add.sprite(xcoord_waterPanel1 + 75 , h-40+400, 'signboard_skills');
		signboard_skills.scale.setTo(0.6,0.6);
		var signboard_experience = game.add.sprite(xcoord_groundRestart+20,platformHeight-275, 'signboard_experience');
		signboard_experience.scale.setTo(0.55,0.55);

		var signboard_projects = game.add.sprite(xcoord_groundRestart+1500+20,platformHeight-275, 'signboard_projects');
		signboard_projects.scale.setTo(0.55,0.55);

		// var signboard_cocurricular = game.add.sprite(xcoord_groundRestart+3500+20,platformHeight-275, 'signboard_cocurricular');
		// signboard_cocurricular.scale.setTo(0.55,0.55);

		// var signboard_onlineprofiles = game.add.sprite(xcoord_groundRestart+5000+20,platformHeight-275, 'signboard_onlineProfiles');
		// signboard_onlineprofiles.scale.setTo(0.55,0.55);

		var banner1 = game.add.sprite(xcoord_groundRestart+450+300,150, 'banner1');
		banner1.scale.setTo(0.8,0.7);

		var banner2 = game.add.sprite(xcoord_groundRestart+450+700,-60, 'banner2');
		banner2.scale.setTo(-0.8,0.7);




    	school = game.add.sprite (xcoord_school,h-420,'school');
    	school.scale.setTo(0.25,0.25);
    	iiit = game.add.sprite(xcoord_iiit,h-420,'iiit');
    	iiit.scale.setTo(0.25,0.25);




	    player = game.add.sprite(w/2, 0, 'finalDude');
	    // player = game.add.sprite(platformLength-1500, 0, 'finalDude');

    	game.physics.arcade.enable(player);
    	player.anchor.setTo(0.5,0.5);
    	player.body.gravity.y = 600;
    	player.body.collideWorldBounds = true;
    	player.animations.add('left', [0, 1, 2, 3,4,5,6,7], 10, true);
    	player.animations.add('right', [0, 1, 2, 3,4,5,6,7], 10, true);

    	bus_static_left = game.add.sprite(xcoord_bus_left,h-300,'bus_static');
    	bus_static_right = game.add.sprite(xcoord_bus_right,h-300,'bus_static');
    	// bus_static_right.scale.setTo(-0.3,0.3);
    	// bus_static_left.scale.setTo(-0.3,0.3);
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

	if(player.key == 'rocket'){
		player.body.gravity.y = 0;
		player.body.velocity.y = 0;
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
		game.world.resize(platformLength,h-40+9*80);	    
		// game.world.setBounds(0, 0, platformLength, h+800);

	}else if(player.body.x>=xcoord_waterPanel2){
		// game.world.resize(19200,-2000);
		game.world.setBounds(0,-2000,platformLength,2000+h);
		// game.world.setBounds(xcoord_waterPanel2,-2000,1000,2000+h);
		if(player.body.x>xcoord_rocket_static+5){
			rocket_static.visible = false;
			player.loadTexture('rocket',0,true);
		}
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
    	// if(player.body.x<xcoord_waterPanel1 || player.body.x>=xcoord_groundRestart){
			game.world.setBounds(0, 0, platformLength, h);
			game.world.resize(platformLength,h);	    
		// }
    }


	if (cursors.left.isDown){
        //  Move to the left
        // player.anchor.setTo(0.5,0.5);
        if(player.key=='rocket'){
        	direction = "up";
        	player.body.velocity.y = 1000;
        }else{
	        direction = "left";
	        player.scale.x =-1;
	        // player.scale.setTo(-1,1)
	        player.body.velocity.x = -1000;
	        player.animations.play('left');
    	}
    }else if (cursors.right.isDown){

        if(player.key=='rocket'){
        	direction = "up";
        	player.body.velocity.y = -1000;
        }else{
    	direction = "right";
        player.scale.x=1;
        player.body.velocity.x = 1000;
        player.animations.play('right');
    	}
    }else{
        //  Stand still
        player.animations.stop();

        player.frame = 1;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown )
    {	
    	if( (player.key == 'finalDude' && player.body.touching.down) || player.key == 'submarine'){
        	player.body.velocity.y = -1000;
    	}
    }
  //   	if(player.key=='finalDude' && player.body.touching.down==true){
		// console.log("bombombom");
		// }

		if(player.key =='rocket' && player.body.touching.down){
			// console.log("bamboo");
			player.loadTexture('finalDude',0,true);
			player.body.x -= 15;
			rocket_static.visible  =true;
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

		// questionBrick.kill();
		var s=0.5;
		if(explosion_count==1){
			// console.log("blahhh");

			var x = xcoord_ledge+ (119*s);
			var y = y_ledge*s -(119*5*s);
			// y_ledge*s because the questionBricks above, have been scaled by 0.5
			var text = game.add.text(x-25,y-20,'Programming',style_roboto);

			var programming = game.add.sprite(x,y,'coinsprite');
			programming.animations.add('moving', [0, 1, 2, 3,4], 5, false);
			programming.animations.play('moving');
			programming.scale.setTo(s,s);
			// programming.events.onAnimationComplete(printText("Programming",x,y,5),this);

		}else if(explosion_count ==2){
			var x = xcoord_ledge+ 3*(119*s);

			var y = y_ledge*s -(119*5*s);
			// y_ledge*s because the questionBricks above, have been scaled by 0.5
			var text = game.add.text(x-25,y+(119*s*2)-20,'Web Apps',style_roboto);
			var webD = game.add.sprite(x,y,'coinsprite');

			webD.animations.add('moving', [0, 1, 2], 3, false);
			webD.animations.play('moving');
			webD.scale.setTo(s,s);

		}else if(explosion_count ==3){
			var x = xcoord_ledge+ 5*(119*s);

			var y = y_ledge*s -(119*5*s);
			// y_ledge*s because the questionBricks above, have been scaled by 0.5
			var text = game.add.text(x-25,y + (119*s) -20,'Data Science',style_roboto);
			var dataSci = game.add.sprite(x,y,'coinsprite');

			dataSci.animations.add('moving', [0, 1, 2,3], 4, false);
			dataSci.animations.play('moving');
			dataSci.scale.setTo(s,s);

		}else if(explosion_count ==4){
			var x = xcoord_ledge+ 7*(119*s);

			var y = y_ledge*s -(119*5*s);
			// y_ledge*s because the questionBricks above, have been scaled by 0.5

			var design = game.add.sprite(x,y,'coinsprite');

			design.animations.add('moving', [0, 1], 2, false);
			design.animations.play('moving');
			design.scale.setTo(s,s);
			var text = game.add.text(x-20,y + (119*3*s) -20,'Design',{font:"24px monospace",fill:"#000000"});

		}


	}
}

// function printText(str){

// }

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