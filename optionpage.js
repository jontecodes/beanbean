BasicGame.OptionMenu = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.OptionMenu.prototype = {

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    
      var BackBtn = this.game.add.button(this.game.width/2, this.game.height/2+180, "backButton", this.backToMain,this);
      
      BackBtn.anchor.setTo(0.5);
      BackBtn.scale.setTo(0.7)
      
      
     
    //this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press Z or tap/click game to start", { font: "20px monospace", fill: "#fff" });
    //this.loadingText.anchor.setTo(0.5, 0.5);
    
    this.add.text(this.game.width / 2,  80, "Options", { font: "80px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

  },

  update: function () {

   
  },

  backToMain: function (){
      this.state.start("MainMenu");
  }

};