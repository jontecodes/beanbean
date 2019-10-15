
BasicGame.Game = function (game) {

var gameScore;
var shipTrail;

};

BasicGame.Game.prototype = {
  preload: function () {
//      this.titleBackground = this.add.sprite(0, 0, 'background');
//        this.titleBackground.anchor.setTo(0,0);
//        this.titleBackground.width = this.game.width;
//        this.titleBackground.height =this.game.height;
      
    this.load.image('sky', 'assets/sky.png',100,100);
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('greenEnemy', 'assets/gimmeg2.png', 75, 100);
    this.load.spritesheet('whiteEnemy', 'assets/gimmeg.png', 75, 100);
    this.load.spritesheet('candy_wrench', 'assets/candy_wrenches.png',99,100);
    this.load.spritesheet('rusty_wrench', 'assets/rusty_wrenches.png',99,100);
    this.load.spritesheet('green_wrench', 'assets/green_wrenches.png',99,100);
    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    
    this.load.image('health_block', 'assets/greenSquare.png', 32, 32);
  },

  create: function () {
      
//      Phaser.ScaleManager.EXACT_FIT;
//      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.setupBackground();
    this.setupPlayer();
    this.setupEnemies();
    this.setupBullets();
    this.setupExplosions();
    this.setupScoreAnimation();
    this.setupPlayerIcons();
    this.setupText();
//    this.scoreAnimation();

    this.cursors = this.input.keyboard.createCursorKeys();
      
    this.music = this.add.audio('music');
    
    this.music.play();

      
    shipTrail = this.add.emitter(this.player.x, this.player.y + 10, 400); 
    shipTrail.width = 10;
    shipTrail.makeParticles('particles');
    shipTrail.setXSpeed(-300, -300);
    //shipTrail.setYSpeed(200, 180);
    shipTrail.setRotation(50,- 50);
    shipTrail.setAlpha(1, 0.01, 800);
    shipTrail.setScale(0.05, 2.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    shipTrail.start(false, 4000, 10);  },

  update: function () {
    this.checkCollisions();
    this.spawnEnemies();
    this.processPlayerInput();
    this.processDelayedEffects();
  
    shipTrail.x = this.player.x + -35;
    shipTrail.y = this.player.y + 7;
  
  },

  render: function() {
  },

  //
  // create()- related functions
  //
  setupBackground: function () {
    this.sky = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
    this.sky.autoScroll( BasicGame.SKY_SCROLL_SPEED,0);
    
  },
  
  setupPlayer: function () {
    
    this.player = this.add.sprite(50, this.game.height/2, localStorage.player );
    this.player.anchor.setTo(0.5, 0.5);
    //this.player.animations.add('fly', [ 0, 1, 2 ], 20, true);
   // this.player.animations.add('ghost', [ 3, 0, 3, 1 ], 20, true);
   // this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    //this.player.speed = BasicGame.PLAYER_SPEED;
    this.player.speed = parseInt(localStorage.player_speed);
    this.player.body.collideWorldBounds = true;
    // 20 x 20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);
  },

  setupEnemies: function () {
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(BasicGame.GREY_ENEMY_POOL, 'whiteEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', BasicGame.ENEMY_REWARD, false, false, 0, true);
     this.enemyPool.setAll('wrenchreward', BasicGame.ENEMY_WRENCH_REWARD, false, false, 0, true);
    

    // Set the animation for each sprite
   // this.enemyPool.forEach(function (enemy) {
    //  enemy.animations.add('fly', [ 0], 0, true);
    // enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
    //  enemy.events.onAnimationComplete.add( function (e) {
     //   e.play('fly');
    //  }, this);
  //  });

    this.nextEnemyAt = 0;
    this.enemyDelay = BasicGame.SPAWN_ENEMY_DELAY;
     
    //shooter
    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(BasicGame.GREEN_ENEMY_POOL, 'greenEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll(
      'reward', BasicGame.SHOOTER_REWARD, false, false, 0, true
    );
    this.shooterPool.setAll(
      'wrenchreward', BasicGame.SHOOTER_WRENCH_REWARD, false, false, 0, true
    );

    // Set the animation for each sprite
    //this.shooterPool.forEach(function (enemy) {
    //  enemy.animations.add('fly', [ 0], 0, true);
    //  enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
     // enemy.events.onAnimationComplete.add( function (e) {
    //    e.play('fly');
    //  }, this);
   // });

    // start spawning 5 seconds into the game
    this.nextShooterAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.shooterDelay = BasicGame.SPAWN_SHOOTER_DELAY;
      
    //candy
    this.candyPool = this.add.group();
    this.candyPool.enableBody = true;
    this.candyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.candyPool.createMultiple(BasicGame.CANDY_WRENCH_POOL, 'candy_wrench');
    this.candyPool.setAll('anchor.x', 0.5);
    this.candyPool.setAll('anchor.y', 0.5);
    this.candyPool.setAll('outOfBoundsKill', true);
    this.candyPool.setAll('checkWorldBounds', true);
    this.candyPool.setAll(
      'reward', BasicGame.CANDY_REWARD, false, false, 0, true
    );
    this.candyPool.setAll(
      'wrenchreward', BasicGame.CANDY_WRENCH_REWARD, false, false, 0, true
    );
      
    // Set the animation for each sprite
    this.candyPool.forEach(function (enemy) {
      enemy.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 25, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });

    // start spawning 5 seconds into the game
    this.nextCandyAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.candyDelay = BasicGame.SPAWN_CANDY_DELAY;
      
    //rusty
    this.rustyPool = this.add.group();
    this.rustyPool.enableBody = true;
    this.rustyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.rustyPool.createMultiple(BasicGame.RUSTY_WRENCH_POOL, 'rusty_wrench');
    this.rustyPool.setAll('anchor.x', 0.5);
    this.rustyPool.setAll('anchor.y', 0.5);
    this.rustyPool.setAll('outOfBoundsKill', true);
    this.rustyPool.setAll('checkWorldBounds', true);
    this.rustyPool.setAll(
      'reward', BasicGame.RUSTY_REWARD, false, false, 0, true
    );
    this.rustyPool.setAll(
      'wrenchreward', BasicGame.RUSTY_WRENCH_REWARD, false, false, 0, true
    );
      
    // Set the animation for each sprite
    this.rustyPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 25, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });

    // start spawning 5 seconds into the game
    this.nextRustyAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.rustyDelay = BasicGame.SPAWN_RUSTY_DELAY;
      
    //green
    this.greenPool = this.add.group();
    this.greenPool.enableBody = true;
    this.greenPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.greenPool.createMultiple(BasicGame.GREEN_WRENCH_POOL, 'green_wrench');
    this.greenPool.setAll('anchor.x', 0.5);
    this.greenPool.setAll('anchor.y', 0.5);
    this.greenPool.setAll('outOfBoundsKill', true);
    this.greenPool.setAll('checkWorldBounds', true);
    this.greenPool.setAll(
      'reward', BasicGame.GREEN_REWARD, false, false, 0, true
    );
    this.greenPool.setAll(
      'wrenchreward', BasicGame.GREEN_WRENCH_REWARD, false, false, 0, true
    );
      
    // Set the animation for each sprite
    this.greenPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 25, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });

    // start spawning 5 seconds into the game
    this.nextGreenAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.greenDelay = BasicGame.SPAWN_GREEN_DELAY;
    
  },

  setupBullets: function () {
    // Add an empty sprite group into our game
    this.bulletPool = this.add.group();

    // Enable physics to the whole sprite group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;

    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and
    //   sets the initial state as non-existing (i.e. killed/dead)
    this.bulletPool.createMultiple(localStorage.fire, 'bullet');

    // Sets anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);

    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);

    this.nextShotAt = 0;
    this.shotDelay = BasicGame.SHOT_DELAY;
  },

  setupExplosions: function () {
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
  },
    
  setupScoreAnimation: function () {
    this.greenScorePool = this.add.group();
    this.greenScorePool.enableBody = true;
    this.greenScorePool.physicsBodyType = Phaser.Physics.ARCADE;
    this.greenScorePool.createMultiple(100, 'greenScore');
    this.greenScorePool.setAll('anchor.x', 0.5);
    this.greenScorePool.setAll('anchor.y', 0.5);
    this.greenScorePool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
      
    this.rustyScorePool = this.add.group();
    this.rustyScorePool.enableBody = true;
    this.rustyScorePool.physicsBodyType = Phaser.Physics.ARCADE;
    this.rustyScorePool.createMultiple(100, 'rustyScore');
    this.rustyScorePool.setAll('anchor.x', 0.5);
    this.rustyScorePool.setAll('anchor.y', 0.5);
    this.rustyScorePool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
    
    this.candyScorePool = this.add.group();
    this.candyScorePool.enableBody = true;
    this.candyScorePool.physicsBodyType = Phaser.Physics.ARCADE;
    this.candyScorePool.createMultiple(100, 'candyScore');
    this.candyScorePool.setAll('anchor.x', 0.5);
    this.candyScorePool.setAll('anchor.y', 0.5);
    this.candyScorePool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
  },

  setupPlayerIcons: function () {
    this.lives = this.add.group();
    // calculate location of first life icon
    var firstLifeIconX = this.game.width - 60 - (parseInt(localStorage.lives) * 30);
    for (var i = 0; i < parseInt(localStorage.lives); i++) {
      var life = this.lives.create(firstLifeIconX + (34 * i), 30, 'health_block');
      life.scale.setTo(0.3, 0.3);
      life.anchor.setTo(0.5);
      
    
    }
      
      this.healthText = this.add.text(
      firstLifeIconX-10, 30, 'Health: ', 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.healthText.anchor.setTo(1, 0.5);
      
  },

  setupText: function () {
      
    this.levelText = this.add.text(
    this.game.width / 2, 
    this.game.height/2,
    'Level ' + localStorage.win, 
    { font: '72px monospace', fill: '#fff', align: 'center' }
    );
    this.levelText.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE;
      
    this.instructions = this.add.text(
      this.game.width / 2, 
      this.game.height/2 + 100,
      'Watch out for the Gimme Gotchas!', 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE;
      
    this.donateMessage = this.add.text(
      this.game.width / 2, 
      this.game.height/1.25 ,
      'This level is brought to you by ' + localStorage.organization +' thanks to donations from players like you!', 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.donateMessage.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE;
    this.donateMessage.visible = false;
    
      if(localStorage.donateMessage == "yes"){
          this.donateMessage.visible = true;
      }
      
    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 30, 'Earnings: $' + (this.score).toLocaleString(), 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
    
    
      
    this.wrenchScore = 0;
    this.wrenchScoreText = this.add.text(
      50, 30, 'Wrenches: ' + this.wrenchScore + "/15", 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.wrenchScoreText.anchor.setTo(0, 0.5);
      
  },
  
//    scoreAnimation: function(enemy){
//    this.animationText = this.add.text(
//    this.game.width / 2, 
//    this.game.height/2,
//    "enemy", 
//    { font: '72px monospace', fill: '#fff', align: 'center' }
//    );
//    this.animationText.anchor.setTo(0.5, 0.5);
//    this.instExpire = this.time.now + BasicGame.SCORE_ANIMATION_EXPIRE;
//    },

  //
  // update()- related functions
  //
  checkCollisions: function () {
    this.physics.arcade.overlap(
      this.bulletPool, this.enemyPool, this.enemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.player, this.enemyPool, this.playerHit, null, this
    );
      
    this.physics.arcade.overlap(
      this.player, this.shooterPool, this.playerHit, null, this
    );
      
     this.physics.arcade.overlap(
      this.bulletPool, this.shooterPool, this.enemyHit, null, this
    );
    
    this.physics.arcade.overlap(
      this.player, this.candyPool, this.wrenchHit3, null, this
    );
      
    this.physics.arcade.overlap(
      this.player, this.rustyPool, this.wrenchHit2, null, this
    );
      
    this.physics.arcade.overlap(
      this.player, this.greenPool, this.wrenchHit, null, this
    );
  },

  spawnEnemies: function () {
    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location top of the screen
      enemy.reset(this.game.width,
        this.rnd.integerInRange(20, this.game.height - 20),
        BasicGame.ENEMY_HEALTH
      );
      // also randomize the speed
      enemy.body.velocity.x = this.rnd.integerInRange(
        BasicGame.ENEMY_MIN_X_VELOCITY, BasicGame.ENEMY_MAX_X_VELOCITY
      );
      enemy.play('fly');
      enemy.rotation = -Math.PI/2;
    }
      
    //shooter angle
    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay;
      var shooter = this.shooterPool.getFirstExists(false);

      // spawn at a random location at the right  
      shooter.reset(this.game.width,
        this.rnd.integerInRange(20,this.game.height - 20),
        BasicGame.SHOOTER_HEALTH
      );

      // choose a random target location at the left
      var target = this.rnd.integerInRange(20, this.game.height - 20);

      // move to target and rotate the sprite accordingly  
      shooter.rotation = this.physics.arcade.moveToXY(
        shooter, 0, target,
        this.rnd.integerInRange(
          BasicGame.SHOOTER_MIN_VELOCITY, BasicGame.SHOOTER_MAX_VELOCITY
        )
      ) + Math.PI / 2;

      shooter.play('fly');

      // each shooter has their own shot timer 
      shooter.nextShotAt = 0;
    }
      
    //candy angle
    if (this.nextCandyAt < this.time.now && this.candyPool.countDead() > 0) {
      this.nextCandyAt = this.time.now + this.candyDelay;
      var candy = this.candyPool.getFirstExists(false);

      // spawn at a random location at the right  
      candy.reset(this.game.width,
        this.rnd.integerInRange(20, this.game.height - 20),
        BasicGame.CANDY_HEALTH
      );

      // choose a random target location at the left
      var target2 = this.rnd.integerInRange(20, this.game.width - 20);

      // move to target and rotate the sprite accordingly  
      candy.rotation = this.physics.arcade.moveToXY(
        candy,0,target2,
        this.rnd.integerInRange(
          BasicGame.CANDY_MIN_VELOCITY, BasicGame.CANDY_MAX_VELOCITY
        )
      ) - Math.PI / 2;

      candy.play('fly');

      // each shooter has their own shot timer 
      candy.nextShotAt = 0;
    }
      
    //rusty angle
    if (this.nextRustyAt < this.time.now && this.rustyPool.countDead() > 0) {
      this.nextRustyAt = this.time.now + this.rustyDelay;
      var rusty = this.rustyPool.getFirstExists(false);

      // spawn at a random location at the tight  
      rusty.reset(this.game.width,
        this.rnd.integerInRange(20, this.game.height - 20),
        BasicGame.RUSTY_HEALTH
      );

      // choose a random target location at the left
      var target3 = this.rnd.integerInRange(20, this.game.width - 20);

      // move to target and rotate the sprite accordingly  
      rusty.rotation = this.physics.arcade.moveToXY(
        rusty,0, target3,
        this.rnd.integerInRange(
          BasicGame.RUSTY_MIN_VELOCITY, BasicGame.RUSTY_MAX_VELOCITY
        )
      ) - Math.PI / 2;

      rusty.play('fly');

      // each shooter has their own shot timer 
      rusty.nextShotAt = 0;
    }
    //green angle
    if (this.nextGreenAt < this.time.now && this.greenPool.countDead() > 0) {
      this.nextGreenAt = this.time.now + this.greenDelay;
      var green = this.greenPool.getFirstExists(false);

      // spawn at a random location at the tight  
      green.reset(this.game.width,
        this.rnd.integerInRange(20, this.game.height - 20),
        BasicGame.GREEN_HEALTH
      );

      // choose a random target location at the left
      var target3 = this.rnd.integerInRange(20, this.game.width - 20);

      // move to target and rotate the sprite accordingly  
      green.rotation = this.physics.arcade.moveToXY(
        green,0, target3,
        this.rnd.integerInRange(
          BasicGame.GREEN_MIN_VELOCITY, BasicGame.GREEN_MAX_VELOCITY
        )
      ) - Math.PI / 2;

      green.play('fly');

      // each shooter has their own shot timer 
      green.nextShotAt = 0;
    }
  },

  processPlayerInput: function () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
    }

    if (this.input.activePointer.isDown &&
        this.physics.arcade.distanceToPointer(this.player) > 15) {
      this.physics.arcade.moveToPointer(this.player, this.player.speed);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }
    }
  },

  processDelayedEffects: function () {
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
    }
    if (this.levelText.exists && this.time.now > this.instExpire) {
      this.levelText.destroy();
    }
    
    
      

    if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      this.player.play('fly');
    }

    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 60, 
        'Press Z or Tap Game to go to Results', 
        { font: '16px sans-serif', fill: '#fff'}
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }
  },

  enemyHit: function (bullet, enemy) {
    bullet.kill();
    this.damageEnemy1(enemy, BasicGame.BULLET_DAMAGE);
  },
  
  playerHit: function (player, enemy) {
    // check first if this.ghostUntil is not not undefined or null 
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, BasicGame.CRASH_DAMAGE);
    var life = this.lives.getFirstAlive();
    if (life !== null) {
      life.kill();
      this.ghostUntil = this.time.now + BasicGame.PLAYER_GHOST_TIME;
      this.player.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      shipTrail.kill();
      this.displayEnd(false);
      
    }
      
  },
    
  wrenchHit: function (player, enemy) {
    // check first if this.ghostUntil is not not undefined or null 
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    // crashing into an enemy only deals 5 damage
    this.damageWrench(enemy, BasicGame.CRASH_DAMAGE);
    
  },
  wrenchHit2: function (player, enemy) {
    // check first if this.ghostUntil is not not undefined or null 
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    // crashing into an enemy only deals 5 damage
    this.damageWrench2(enemy, BasicGame.CRASH_DAMAGE);
    
  },
  wrenchHit3: function (player, enemy) {
    // check first if this.ghostUntil is not not undefined or null 
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    // crashing into an enemy only deals 5 damage
    this.damageWrench3(enemy, BasicGame.CRASH_DAMAGE);
    
  },
    

  damageEnemy: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
        
      this.explode(enemy);
      this.addToScore(enemy.reward);
      this.addToWrenchScore(enemy.wrenchreward);
      
    }
  },
    damageEnemy1: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.explode(enemy);
      this.addToScore(enemy.reward);
     // this.addToWrenchScore(enemy.wrenchreward);
    }
  },
  damageWrench: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.greenScoreAnimate(enemy); 
      this.explode(enemy);
      this.addToScore(enemy.reward);
      this.addToWrenchScore(enemy.wrenchreward);
    }
  },
  damageWrench2: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.rustyScoreAnimate(enemy); 
      this.explode(enemy);
      this.addToScore(enemy.reward);
      this.addToWrenchScore(enemy.wrenchreward);
    }
  },
  damageWrench3: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.candyScoreAnimate(enemy); 
      this.explode(enemy);
      this.addToScore(enemy.reward);
      this.addToWrenchScore(enemy.wrenchreward);
    }
  },
  addToScore: function (score) {
      
    
    localStorage.score = 0;
    

    if (this.score < parseInt(localStorage.pointcap)) {
        
      if(this.score >= 0){
          this.score += score;
          if(this.score <= 0){this.score = 0;}
      }
        
      this.scoreText.text = 'Earnings: $' + (this.score).toLocaleString(); 
      localStorage.score = this.score;
// POINT CAP
//        if(this.score > parseInt(localStorage.pointcap)){
//            this.score = parseInt(localStorage.pointcap);
//            this.scoreText.text = 'Earnings: $' + this.score; 
//        }
        
//      localStorage.wrenchScore = this.wrenchScore;
//      this.enemyPool.destroy();
//      this.shooterPool.destroy();
//      this.candyPool.destroy();
//      this.rustyPool.destroy();
//      this.greenPool.destroy();
//        localStorage.win++;
//      this.displayEnd(true);
    
    }
  },
    
  addToWrenchScore: function (wrenchScore) {
    this.wrenchScore += wrenchScore;
      if(this.wrenchScore > 15) this.wrenchScore = 15;
      if(this.wrenchScore < 0) this.wrenchScore = 0;
    this.wrenchScoreText.text = 'Wrenches: ' + this.wrenchScore + "/15";
    if (this.wrenchScore >= 15) {
    localStorage.score = this.score;
        localStorage.wrenchScore = this.wrenchScore;
      this.enemyPool.destroy();
      this.shooterPool.destroy();
      this.candyPool.destroy();
      this.rustyPool.destroy();
      this.greenPool.destroy();
        localStorage.complete = "yes";
        
      this.displayEnd(true);
    
    }
  },

  displayEnd: function (win) {
      
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }
    localStorage.donateMessage = "no";
    var msg = win ? 'Level ' + localStorage.win + ' Complete!!!' : 'Game Over!';
    this.endText = this.add.text( 
      this.game.width / 2, this.game.height / 2 - 60, msg, 
      { font: '72px serif', fill: '#fff' }
    );
    this.endText.anchor.setTo(0.5, 0);

    this.showReturn = this.time.now + BasicGame.RETURN_MESSAGE_DELAY;
  },

  explode: function (sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    // add the original sprite's velocity to the explosion
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  },
  greenScoreAnimate: function (sprite) {
    if (this.greenScorePool.countDead() === 0) {
      return;
    }
    var greenScoreAnimation = this.greenScorePool.getFirstExists(false);
    greenScoreAnimation.reset(sprite.x, sprite.y);
    greenScoreAnimation.play('boom', 5, false, true);
    // add the original sprite's velocity to the explosion
    greenScoreAnimation.body.velocity.x = sprite.body.velocity.x;
    greenScoreAnimation.body.velocity.y = sprite.body.velocity.y;
  },
  rustyScoreAnimate: function (sprite) {
    if (this.rustyScorePool.countDead() === 0) {
      return;
    }
    var rustyScoreAnimation = this.rustyScorePool.getFirstExists(false);
    rustyScoreAnimation.reset(sprite.x, sprite.y);
    rustyScoreAnimation.play('boom', 5, false, true);
    // add the original sprite's velocity to the explosion
    rustyScoreAnimation.body.velocity.x = sprite.body.velocity.x;
    rustyScoreAnimation.body.velocity.y = sprite.body.velocity.y;
  },
  candyScoreAnimate: function (sprite) {
    if (this.candyScorePool.countDead() === 0) {
      return;
    }
    var candyScoreAnimation = this.candyScorePool.getFirstExists(false);
    candyScoreAnimation.reset(sprite.x, sprite.y);
    candyScoreAnimation.play('boom', 5, false, true);
    // add the original sprite's velocity to the explosion
    candyScoreAnimation.body.velocity.x = sprite.body.velocity.x;
    candyScoreAnimation.body.velocity.y = sprite.body.velocity.y;
  },


  fire: function() {
    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }

    if (this.bulletPool.countDead() === 0) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    // Find the first dead bullet in the pool
    var bullet = this.bulletPool.getFirstExists(false);

    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.player.x+40, this.player.y);

    bullet.body.velocity.x = BasicGame.BULLET_VELOCITY;
  },

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.music.stop();
    this.sky.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.shooterPool.destroy();
    this.candyPool.destroy();
    this.rustyPool.destroy();
    this.greenPool.destroy();
    this.bulletPool.destroy();
    this.explosionPool.destroy();
    this.instructions.destroy();
    this.levelText.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();
    //  Then let's go back to the main menu.
    
if(localStorage.complete =="yes"){
          this.nextLevel();
      }
      else{
          this.state.start('Result');
      }
    

  },
  nextLevel: function(){
      
      this.state.start('Result');
      localStorage.win++;
      this.levelModifier();
  },
  levelModifier: function(){
      //Object Changes velocity after each level with the seconds specifified below
      if(localStorage.complete == "yes"){
			  BasicGame.RUSTY_WRENCH_POOL;
			  BasicGame.CANDY_WRENCH_POOL;		  
              BasicGame.ENEMY_MIN_X_VELOCITY *= 1.15;
              BasicGame.ENEMY_MAX_X_VELOCITY *= 1.15;
              BasicGame.SHOOTER_MIN_VELOCITY *= 1.05;
              BasicGame.SHOOTER_MAX_VELOCITY *= 1.05;
              BasicGame.CANDY_MIN_VELOCITY *= 1.05; 
              BasicGame.CANDY_MAX_VELOCITY *= 1.05; 
              BasicGame.RUSTY_MIN_VELOCITY *= 1.25;
              BasicGame.RUSTY_MAX_VELOCITY *= 1.25;
              BasicGame.GREEN_MIN_VELOCITY *= 1.15;
              BasicGame.GREEN_MAX_VELOCITY *= 1.15;
      }
      //After the third level one more green enemy will be added
      if(localStorage.complete == "yes" && parseInt(localStorage.win)>= 3){
          BasicGame.GREEN_ENEMY_POOL++;
      }
      
      //After the 7th level one less grey enemy
      if(localStorage.complete == "yes" && parseInt(localStorage.win) > 7){
          BasicGame.GREY_ENEMY_POOL--;
      }
      else{
          BasicGame.GREY_ENEMY_POOL++;
      }
      
      //Wrench changes at specified levels 3-5-7
      if(localStorage.complete == "yes" && parseInt(localStorage.win) === 3){
          BasicGame.GREEN_WRENCH_POOL = 2;
          BasicGame.CANDY_WRENCH_POOL = 2;
          BasicGame.RUSTY_WRENCH_POOL = 1;
      }
      else if(localStorage.complete == "yes" && parseInt(localStorage.win) === 5){
          BasicGame.GREEN_WRENCH_POOL = 2;
          BasicGame.CANDY_WRENCH_POOL = 1;
          BasicGame.RUSTY_WRENCH_POOL = 1;
      }
      else if(localStorage.complete == "yes" && parseInt(localStorage.win) === 7){
          BasicGame.GREEN_WRENCH_POOL = 1;
          BasicGame.CANDY_WRENCH_POOL = 1;
          BasicGame.RUSTY_WRENCH_POOL = 1;
      }
      
//Every 3rd level these object decrease in the time specified in the spawning rate
//      if( localStorage.win == "yes" && (parseInt(localStorage.win)%3 == 0)){
//          BasicGame.GREEN_WRENCH_POOL--;
//          BasicGame.SPAWN_ENEMY_DELAY *= .7;
//          BasicGame.SPAWN_SHOOTER_DELAY *= .9;
//          BasicGame.SPAWN_CANDY_DELAY *= .9;
//          BasicGame.SPAWN_RUSTY_DELAY *= .9;
//          BasicGame.SPAWN_GREEN_DELAY *=.9;
//      }
      
      }

};
