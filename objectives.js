BasicGame.Objectives = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.Objectives.prototype = {

  create: function () {

      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      var objectives_back = this.add.sprite(0, 0, 'objectives_background');
      objectives_back.anchor.setTo(0,0);
      objectives_back.width = this.game.width;
      objectives_back.height = this.game.height;
      
      var objectives_Logo = this.add.image(this.game.width/2,50,'objectives_logo');
      objectives_Logo.anchor.setTo(0.5,0);
      objectives_Logo.scale.setTo(0.8);
      
      var objectivescandy = this.add.image(this.game.width/2 * 0.04,this.game.height/2.7, 'objectives_candy');
      objectivescandy.anchor.setTo(0, 0);
      objectivescandy.scale.setTo(0.5);
      
      var objectivesgreen = this.add.image(this.game.width/2 * 0.5,this.game.height/2.7 , 'objectives_green');
      objectivesgreen.anchor.setTo(0, 0);
      objectivesgreen.scale.setTo(0.5);
      
      var objectivesrusty = this.add.image(this.game.width/2 * 1,this.game.height/2.7 , 'objectives_rusty');
      objectivesrusty.anchor.setTo(0, 0);
      objectivesrusty.scale.setTo(0.5);
      
      var objectivesgg = this.add.image(this.game.width/2 * 1.5,this.game.height/2.7 , 'objectives_gg');
      objectivesgg.anchor.setTo(0, 0);
      objectivesgg.scale.setTo(0.5);
      
      var continueButton = this.game.add.button(this.game.width/2, this.game.height/1.13, "continue_button", this.continue,this);
      
      continueButton.anchor.setTo(0.5);
      continueButton.scale.setTo(0.5);
      
      var menuButton = this.game.add.button(this.game.width/2, this.game.height/1.13, "homeButton", this.mainMenu,this);
      
      menuButton.anchor.setTo(0.5);
      menuButton.scale.setTo(0.5);
      menuButton.visible = false;
      
      if(helpToMenu){
          continueButton.visible = false;
          menuButton.visible = true;
      }else{
          menuButton.visible = false;
      }
      
      if(this.game.height > 800){
          objectives_Logo.scale.setTo(1);
          objectivescandy.scale.setTo(0.6);
          objectivesgreen.scale.setTo(0.6);
          objectivesrusty.scale.setTo(0.6);
          objectivesgg.scale.setTo(0.6);
          continueButton.scale.setTo(0.6);
      }
  },

  update: function () {
      
  },

  continue: function () {
      this.state.start("Game");
  },
    mainMenu: function () {
      helpToMenu = false;
      this.state.start("MainMenu");
  },
  
};
