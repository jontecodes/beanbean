
//Establishes clean initial values on game reset
localStorage.balance = 0;
localStorage.depositBalance = 0;    
localStorage.interest = 0;  
localStorage.player = 'player';   
localStorage.selection = "dullShip";
localStorage.win = 1;
localStorage.score = 0;
localStorage.player_speed = 300;
localStorage.lives = 5;
localStorage.pointMultiply = 1;
localStorage.pointcap = 1000000;
localStorage.fire = -1;
localStorage.shields = 0;
localStorage.engine = 0;
localStorage.rockets = 0;
localStorage.complete = 'no';
localStorage.donateMessage = "no";
localStorage.organization;
localStorage.logged = "no";
localStorage.account = "";
var helpToMenu = false;

//Object Values
var BasicGame = {
  SKY_SCROLL_SPEED: -120,
  PLAYER_SPEED: parseInt(localStorage.player_speed) ,
  ENEMY_MIN_X_VELOCITY: -200,
  ENEMY_MAX_X_VELOCITY: -200,
  SHOOTER_MIN_VELOCITY: 400,
  SHOOTER_MAX_VELOCITY: 400,
  CANDY_MIN_VELOCITY: 100,
  CANDY_MAX_VELOCITY: 100,
  RUSTY_MIN_VELOCITY: 100,
  RUSTY_MAX_VELOCITY: 200,
  GREEN_MIN_VELOCITY: 100,
  GREEN_MAX_VELOCITY: 200,
  BOSS_Y_VELOCITY: 15,
  BOSS_X_VELOCITY: 200,
  BULLET_VELOCITY: 500,
  ENEMY_BULLET_VELOCITY: 150,
  POWERUP_VELOCITY: 100,

  SPAWN_ENEMY_DELAY: Phaser.Timer.SECOND * .9,
  SPAWN_SHOOTER_DELAY: Phaser.Timer.SECOND * 1,
  SPAWN_CANDY_DELAY: Phaser.Timer.SECOND * 1,
  SPAWN_RUSTY_DELAY: Phaser.Timer.SECOND * 2,
  SPAWN_GREEN_DELAY: Phaser.Timer.SECOND * 1.35,

  SHOT_DELAY: Phaser.Timer.SECOND * 0.1,
  SHOOTER_SHOT_DELAY: Phaser.Timer.SECOND * 2,
  CANDY_SHOT_DELAY: Phaser.Timer.SECOND * 2,
  RUSTY_SHOT_DELAY: Phaser.Timer.SECOND * 2,
  GREEN_SHOT_DELAY: Phaser.Timer.SECOND * 2,
  BOSS_SHOT_DELAY: Phaser.Timer.SECOND,

  ENEMY_HEALTH: 2,
  SHOOTER_HEALTH: 5,
  CANDY_HEALTH: 1,
  RUSTY_HEALTH: 1,
  GREEEN_HEALTH: 1,
  BOSS_HEALTH: 500,

  BULLET_DAMAGE: 1,
  CRASH_DAMAGE: 5,

  ENEMY_REWARD: 0,
  SHOOTER_REWARD: 0,
  CANDY_REWARD: -5,
  RUSTY_REWARD: 0,
  GREEN_REWARD: 5,
  ENEMY_WRENCH_REWARD: 0,
  SHOOTER_WRENCH_REWARD: 0,
  CANDY_WRENCH_REWARD: 1,
  RUSTY_WRENCH_REWARD: 1,
  GREEN_WRENCH_REWARD: 1,
  BOSS_REWARD: 10000,
  POWERUP_REWARD: 100,

  ENEMY_DROP_RATE: 0.3,
  SHOOTER_DROP_RATE: 0.5,
  CANDY_DROP_RATE: 0,
  RUSTY_DROP_RATE: 0,
  GREEN_DROP_RATE: 0,
  BOSS_DROP_RATE: 0,
    
  GREEN_WRENCH_POOL:3,
  RUSTY_WRENCH_POOL:2,
  CANDY_WRENCH_POOL:1,

  GREY_ENEMY_POOL :1,
  GREEN_ENEMY_POOL:0,

  PLAYER_EXTRA_LIVES: localStorage.lives,
  PLAYER_GHOST_TIME: Phaser.Timer.SECOND * 0, //controls delay between hits
  SCORE_ANIMATION_EXPIRE: Phaser.Timer.SECOND * .2,
  INSTRUCTION_EXPIRE: Phaser.Timer.SECOND * 5,
  RETURN_MESSAGE_DELAY: Phaser.Timer.SECOND * 2,
  MENU_TEXT_DELAY:Phaser.Timer.SECOND * 2,
    
  
};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

  init: function () {
      
      

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = false;

    //Note to self-look into this for scaling
    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setScreenSize(true);
      this.scale.forceLandscape = true;
    }
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function () {

    //Asset for the preloader loading bar
    this.load.image('preloaderBar', 'assets/preloader-bar.png');

  },

  create: function () {
      
    //Start the real preloader
    this.state.start('Preloader');

  }

};
