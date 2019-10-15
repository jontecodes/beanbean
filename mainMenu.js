
BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.MainMenu.prototype = {

  create: function () {
      
        //this.music2 = this.add.audio('music_menus');

        //this.music2.play();
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
        //Main Menu Background
        var mainmenu_Back = this.add.sprite(0, 0, 'mainmenu_background');
        mainmenu_Back.anchor.setTo(0,0);
        mainmenu_Back.width = this.game.width;
        mainmenu_Back.height =this.game.height;
      
        var main_menu_Logo = this.add.sprite(this.game.width/2, 37, 'menu_logo');
        main_menu_Logo.scale.setTo(0.7);
        main_menu_Logo.anchor.setTo(0.5,0);

        var playLvlBtn = this.game.add.button(this.game.width/2, this.game.height/2-25, "playButton", this.playGame,this);

        playLvlBtn.anchor.setTo(0.5);
        playLvlBtn.scale.setTo(0.4);
      
        var loginBtn = this.game.add.button(this.game.width / 2,this.game.height/2 + 105, 'main_menu_loginbutton',this.loginPage,this);
        loginBtn.anchor.set(0.5);
        loginBtn.scale.setTo(0.4);
      
         var logoutBtn = this.game.add.button(this.game.width / 2,this.game.height/2 + 105, 'logoutbutton',this.logout,this);
        logoutBtn.anchor.set(0.5);
        logoutBtn.visible = false;
        logoutBtn.scale.setTo(0.4);
      
        if(localStorage.logged === "yes"){
            loginBtn.visible = false;
            logoutBtn.visible = true;
        }

        var BankBtn = this.game.add.button(this.game.width/ 2 ,this.game.height/2 + 40, "bankButton", this.bankMenu,this);

        BankBtn.anchor.setTo(0.5);
        BankBtn.scale.setTo(0.4);
      
        var helpBtn = this.game.add.button(this.game.width/ 2 ,this.game.height/2 + 170, "helpButton", this.objectivesMenu,this);

        helpBtn.anchor.setTo(0.5);
        helpBtn.scale.setTo(0.4);

        var BackBtn = this.game.add.button(this.game.width/2, this.game.height/2+285, "backButton", this.TitleMenu,this);

        BackBtn.anchor.setTo(0.5);
        BackBtn.scale.setTo(0.35);

        //      var storeBtn = this.game.add.button(this.game.width/2, this.game.height/2 + 90, "storeButton", this.storeMenu,this);
        //      
        //      storeBtn.anchor.setTo(0.5);
        //      storeBtn.scale.setTo(0.7);

        //      var optionsBtn = this.game.add.button(this.game.width/2 , this.game.height/2 + 180, "optionButton", this.optionMenu,this);
        //      
        //      optionsBtn.anchor.setTo(0.5);
        //      optionsBtn.scale.setTo(0.7);


        localStorage.balance = localStorage.balance || 0;
        var menu_balance = parseInt(localStorage.balance);
        this.add.text(this.game.width / 2, (main_menu_Logo.y +main_menu_Logo.height) + this.game.height/9.3, "Balance: $" + menu_balance.toLocaleString() , { font: "60px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);



        localStorage.money = localStorage.money || 0;
  },

  update: function () {

   
  },

  playGame: function () {
        //  this.music2.stop();
      if(localStorage.win == "1"){
           this.state.start("Objectives");
      }
      else{
          this.state.start("Game");
      }
       
  },
  loginPage: function(){
  this.state.start("Login");
  },
  
  bankMenu: function (){
        // this.music2.stop();
        this.state.start("Bank");
  },
  TitleMenu: function (){
        //   this.music2.stop();
        this.state.start("Title");
  },
  objectivesMenu: function (){
        helpToMenu = true;
        this.state.start("Objectives");
  },
    logout: function(){
        location.reload();
    }


};