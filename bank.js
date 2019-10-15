BasicGame.BankMenu = function (game) {
  //no current functionality    
  this.music = null;
  this.playButton = null;

};

BasicGame.BankMenu.prototype = {

  create: function () {
       this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
       this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
        var MainMenu_Background = this.add.sprite(0, 0, 'bank_background');
        MainMenu_Background.anchor.setTo(0,0);
        MainMenu_Background.width = this.game.width;
        MainMenu_Background.height = this.game.height;
      
        //Middle art featuring BeanBean
        var bank_Midground = this.add.sprite(this.game.width/2-30, this.game.height, 'bank_midground');
        bank_Midground.scale.setTo(0.7,0.7);
        bank_Midground.anchor.setTo(0.5,1);
        
        if(this.game.height > 800){
            bank_Midground.scale.setTo(0.9);
        }
//        
        //Bank Title button
        var bank_Logo = this.add.sprite(this.game.width/2, 50, 'bank_logo');
        bank_Logo.scale.setTo(0.8);
        bank_Logo.anchor.setTo(0.5,0);
        
        //Save button
        var savingsBtn = this.game.add.button(this.game.width/2, this.game.height-(bank_Midground.height/1.25), "savingsButton", this.savingsMenu,this);
        savingsBtn.anchor.setTo(0.5,0.5);
        savingsBtn.scale.setTo(0.250,0.25);
        
        //Donate button
        var donateBtn = this.game.add.button(this.game.width/2 , this.game.height-(bank_Midground.height/1.64 ), "donateButton", this.donateMenu,this);
        donateBtn.anchor.setTo(0.5);
        donateBtn.scale.setTo(0.250,0.25)

        //Invest Button
        var investBtn = this.game.add.button(this.game.width/2, this.game.height-(bank_Midground.height/1.94 ), "investButton", this.investMenu,this);
        investBtn.anchor.setTo(0.5);
        investBtn.scale.setTo(0.250,0.25)

        //Store Button
        var storeBtn = this.game.add.button(this.game.width/2, this.game.height -(bank_Midground.height/1.42 ), "spendButton", this.storeMenu,this);
        storeBtn.anchor.setTo(0.5);
        storeBtn.scale.setTo(0.250,0.25)
        
         //Back Button
        var BackBtn = this.game.add.button(this.game.width/2-5, this.game.height -(bank_Midground.height/2.3 ) , "backButton", this.backToMain,this);
        BackBtn.anchor.setTo(0.5,0.5);
        BackBtn.scale.setTo(0.17)
        
        if(this.game.height > 800){
            bank_Midground.scale.setTo(0.9);
             savingsBtn.scale.setTo(0.30);
            donateBtn.scale.setTo(0.30);
            investBtn.scale.setTo(0.30);
            storeBtn.scale.setTo(0.30);
             BackBtn.scale.setTo(0.24)
        }
      
      var balance = parseInt(localStorage.balance);
      
      balanceText = this.add.text(this.game.width / 2,  (bank_Logo.y + bank_Logo.height) + this.game.height/8, "Balance: $" + balance.toLocaleString(), { font: "60px monospace", fill: "#ffff00", align:  "center"});
      balanceText.anchor.setTo(0.5);
       

  },

    update: function () {


    },
    
    //Gives buttons ability to navigate.
    savingsMenu: function () {
        this.state.start("Save");
    },

    donateMenu: function (){
        this.state.start("Donate");
    },
    investMenu: function () {
        this.state.start("Invest");
    },

    storeMenu: function () {
        this.state.start("Store");
    },

    backToMain: function (){
        this.state.start("MainMenu");
    }

};