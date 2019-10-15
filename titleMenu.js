
BasicGame.TitleMenu = function (game) {

};

BasicGame.TitleMenu.prototype = {

  create: function () {
       
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode =Phaser.ScaleManager.EXACT_FIT;
        //Add Music
        this.music3 = this.add.audio('title_menu');
        this.music3.play();
  
        //Title Background, Title Image
        this.titleBackground = this.add.sprite(0, 0, 'background');
        this.titleBackground.anchor.setTo(0,0);
        this.titleBackground.width = this.game.width;
        this.titleBackground.height =this.game.height;
      
        var logo = this.add.image(this.game.width/2,50,'logo'); 
        logo.anchor.setTo(0.5,0);
        logo.scale.setTo(0.4);
        
      
        //Creation of startButton
        var playButton = this.game.add.button(this.game.width/2, this.game.height/2+250, "startButton", this.startGame,this);
        playButton.input.priorityID = 1;
        playButton.anchor.setTo(0.6);
        playButton.scale.setTo(0.3);
      
      
  },
  //Note to self-look into 
  update: function () {

    // if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
    //  this.startGame();
    // }
    //  Do some nice funky main menu effect here

  },
    
  //Stops music and start MainMenu 
  startGame: function() {
        this.music3.stop();
        this.state.start("MainMenu");
  }

};
