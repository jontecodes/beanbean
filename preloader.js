
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  //this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
    this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    this.load.setPreloadSprite(this.preloadBar);

    //Assets the game needs.
    this.load.image('logo','assets/bean_logo.png');
    this.load.image('save_logo','assets/SaveLogo1.png');
    this.load.image('invest_logo','assets/InvestLogo1.png');
    this.load.image('spend_logo','assets/SpendLogo1.png');
    this.load.image('bank_logo','assets/bankPageLogo2.png');
    this.load.image('donate_logo','assets/DonateLogo1.png');
    this.load.image('objectives_logo','assets/objectivesLogo.png');
    this.load.image('results_logo','assets/resultsTitle.png');
    this.load.image('bean_face','assets/resultsBean.png');
    this.load.image('deposit_button','assets/depositButton.png');
    this.load.image('background', 'assets/titlepage_background.png');
    this.load.image('menu_logo','assets/MainMenuLogo.png');
    this.load.image('save_background', 'assets/savingsBackground.png');
    this.load.image('spend_background', 'assets/storeBackground1.png');
    this.load.image('bank_background', 'assets/bankBackground1.png');  
    this.load.image('bank_midground', 'assets/bankpageMidground.png');
    this.load.image('objectives_background', 'assets/objectives1.png');
    this.load.image('objectives_candy', 'assets/objectivesCandy.png');
    this.load.image('objectives_green', 'assets/objectivesGreen.png');
    this.load.image('objectives_rusty', 'assets/objectivesRusty.png');
    this.load.image('objectives_gg', 'assets/objectivesGG.png');
    this.load.image('mainmenu_background', 'assets/mainmenuBackground1.png');
    this.load.image('donate_background', 'assets/donateBackground1.png');
    this.load.image('invest_background', 'assets/investbackground1.png');
    this.load.image('results_background', 'assets/resultsBackground.png'); 
    this.load.image('sky', 'assets/sky3.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemyBullet', 'assets/enemy-bullet.png');
    this.load.image('powerup1', 'assets/powerup1.png');
    this.load.spritesheet('greenEnemy', 'assets/gimmeg2.png', 75,100);
    this.load.spritesheet('whiteEnemy', 'assets/gimmeg.png',32,32);
    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    this.load.image('inputbox','assets/login_text_box.png');
    this.load.image('startButton','assets/start_button.png');
    this.load.image('retryButton','assets/retryButton.png');
    this.load.image('homeButton','assets/homeButton.png');
    this.load.image('spendButton','assets/spendButton.png');
    this.load.image('depositButton','assets/depositButton.png');
    this.load.image('continue_button','assets/continueButton.png');
    this.load.image('playButton','assets/play_button.png');
    this.load.image('bankButton','assets/bank_button.png');
    this.load.image('savingsButton','assets/savingsButton.png');
    this.load.image('donateButton','assets/donateButton.png');
    this.load.image('investButton','assets/investButton.png');
    this.load.image('add_button','assets/plusSignDonate.png');  
    this.load.image('backButton','assets/backButton.png');
    this.load.image('health_block', 'assets/greenSquare.png', 32, 32);
    this.load.image('particles','assets/sun.png'); 
    this.load.image('engines_button','assets/speedButton.png');
    this.load.image('rockets_button', 'assets/rocketsButton.png', 32, 32);
    this.load.spritesheet('shields_button', 'assets/healthButton.png', 100, 100);
    this.load.spritesheet('player','assets/beanBeanShip.png', 158, 90);
    this.load.image('pinkShip','assets/pinkShip.png', 64, 64);  
    this.load.image('blueShip','assets/blueShip.png', 64, 64);
    this.load.image('greenShip','assets/greenShip.png', 64, 64);
    this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
    this.load.spritesheet('greenScore', 'assets/greenwrenchscore.png', 95, 50);
    this.load.spritesheet('rustyScore', 'assets/rustyScore.png', 67, 50);
    this.load.spritesheet('candyScore', 'assets/candyScore.png', 86, 50);
    this.load.audio('playerExplosion', ['assets/player-explosion.ogg', 'assets/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/enemy-fire.ogg', 'assets/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/player-fire.ogg', 'assets/player-fire.wav']);
    this.load.audio('powerUp', ['assets/powerup.ogg', 'assets/powerup.wav']);
    this.load.audio('music','assets/Blip Stream.mp3' );
    this.load.audio('music_menus','assets/Passing_Time.mp3' );
    this.load.audio('title_menu','assets/Title_Screen.mp3' );
    this.load.image('loginbutton','assets/login_button.png');
    this.load.image('main_menu_loginbutton','assets/mainMenuLogin_button.png');
    this.load.image('logoutbutton','assets/logout_button.png');
    this.load.image('signupbutton','assets/signup_button.png');
    this.load.image('createaccountbutton','assets/create_account_button.png');
    this.load.image('save_button_game','assets/save_button_game.png');
    this.load.image('save_and_continue','assets/save_and_continue_button.png');
     
    this.load.image('backtologin','assets/go_to_login_button.png');
    this.load.image('login_header','assets/login_header.png');
    this.load.image('signup_header','assets/signup_header.png');
    
    this.load.image('helpButton','assets/help_button.png');
    this.load.image('resultToBank','assets/resultToBankMenu.png');
      
    this.load.image('backtomain','assets/go_to_main_menu_button.png');
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    //  + lots of other required assets here

  },

  create: function () {

    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;

  },

  update: function () {

    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.
    
    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.
    
    //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    //{
    //  this.ready = true;
      
      this.state.start('Title');
    //}

  }

};
