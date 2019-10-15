
BasicGame.ResultMenu = function (game) {

  this.music = null;
  this.playButton = null;
  var continueButton;
  var retryButton;
    
};

BasicGame.ResultMenu.prototype = {

  create: function () {
      
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

//    this.score = 0;
//    this.scoreText = this.add.text(
//      this.game.width / 2, 30, 'Score' + this.score, 
//      { font: '20px monospace', fill: '#fff', align: 'center' }
//    );
//   this.scoreText.anchor.setTo(0.5, 0.5);
    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

      var results_back = this.add.sprite(0, 0, 'results_background');
      results_back.anchor.setTo(0,0);
      results_back.width = this.game.width;
      results_back.height = this.game.height;
      
      var results_Logo = this.add.sprite(this.game.width/2, 50, 'results_logo');
      results_Logo.scale.setTo(0.8);
      results_Logo.anchor.setTo(0.5,0);
      
      var bean_face = this.add.sprite(this.game.width/2,this.game.height/2, 'bean_face');
      bean_face.scale.setTo(0.25);
      bean_face.anchor.setTo(0.5);
      
      retryButton = this.game.add.button(this.game.width/6.2, bean_face.y + (this.game.height/3), "retryButton", this.retryGame,this);
      
      retryButton.anchor.setTo(0.5);
      retryButton.scale.setTo(0.65);
      
      continueButton = this.game.add.button(this.game.width/6.2, bean_face.y + (this.game.height/3), "continue_button", this.nextLevelSave,this);
      
      continueButton.anchor.setTo(0.5);
      continueButton.scale.setTo(0.65);
      continueButton.visible = false;
      
      saveAndContinueButton = this.game.add.button(this.game.width/6.2, bean_face.y + (this.game.height/3), "save_and_continue", this.nextLevelSave,this);
      
      saveAndContinueButton.anchor.setTo(0.5);
      saveAndContinueButton.scale.setTo(0.65);
      saveAndContinueButton.visible = false;
      
      bankMenuButton = this.game.add.button(bean_face.x, bean_face.y + (this.game.height/3), "resultToBank", this.BankMenu,this);
      
      bankMenuButton.anchor.setTo(0.5);
      bankMenuButton.scale.setTo(0.65);
      
      
      var homeButton = this.game.add.button(this.game.width/1.19 ,bean_face.y + (this.game.height/3), "homeButton", this.mainMenu,this);
      
      homeButton.anchor.setTo(0.5);
      homeButton.scale.setTo(0.65);
      
     
      
      if(this.game.height > 800){
         retryButton.scale.setTo(0.7);
         continueButton.scale.setTo(0.7);
         saveAndContinueButton.scale.setTo(0.7);
         homeButton.scale.setTo(0.7);
         bean_face.scale.setTo(0.3); 
      }
      
     this.startBalanceText = this.add.text(
     this.game.width/2 * 0.13,(results_Logo.y + results_Logo.height) + this.game.height/15  , "Starting Balance:", 
      { font: '40px monospace', fill: '#fff', align: 'right' }
    );
     this.startBalanceText.anchor.setTo(0, 0);
    
     var start_bal_amount = parseInt(localStorage.balance);
    
     balance_amount = this.add.text(this.game.width/2 * 1.7, (results_Logo.y + results_Logo.height) + this.game.height/15 , "$" + start_bal_amount.toLocaleString(), { font: "40px monospace", fill: "#fff", boundsAlignH: "right"});
      
      balance_amount.setTextBounds(-50, 0, 100, 100);
      balance_amount.anchor.setTo(0, 0);
      
     var scoreN = parseInt(localStorage.score);
    this.earningsText = this.add.text(this.game.width/2 * 0.13, (results_Logo.y + results_Logo.height) + this.game.height/7.6, "Earnings:", { font: "40px monospace", fill: "#fff", align: "center"});
    this.earningsText.anchor.setTo(0, 0);
      
     var earned_amount = this.add.text(this.game.width/2 * 1.7,(results_Logo.y + results_Logo.height) + this.game.height/7.6 , "$" + scoreN.toLocaleString(), { font: "40px monospace", fill: "#fff", boundsAlignH: "right"});
      
     earned_amount.anchor.setTo(0, 0);
     earned_amount.setTextBounds(-50, 0, 100, 100);
//      this.add.text(this.game.width / 2,  this.game.height/2 - 80, "Wrenchs: " + localStorage.wrenchScore , { font: "80px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
      
      this.add.text(this.game.width/2 * 0.13, (results_Logo.y + results_Logo.height) + this.game.height/5.0, "Completion Bonus:", { font: "40px monospace", fill: "#fff", align: "center"}).anchor.setTo(0, 0);
      
      this.earned = 0
      this.earnedText = this.add.text(
      this.game.width/2 * 1.7,(results_Logo.y + results_Logo.height) + this.game.height/5.0, "$" + this.earned , 
      { font: '40px monospace', fill: '#fff', boundsAlignH: "right" }
    );
      this.earnedText.setTextBounds(-50, 0, 100, 100);
      this.earnedText.anchor.setTo(0, 0);
      this.addbal(10);
      
      if(this.earned > 0){
         var interest = parseInt(localStorage.interest);  
      }else{
          var interest = 0;
      }
     
      
      this.add.text(this.game.width/2 * 0.13, (results_Logo.y + results_Logo.height) + this.game.height/3.7, "Interest Earned:", { font: "40px monospace", fill: "#fff", align: "center"}).anchor.setTo(0, 0);
      
     interest_amount = this.add.text(this.game.width/2 * 1.7,(results_Logo.y + results_Logo.height) + this.game.height/3.7, "$" + interest , { font: "40px monospace", fill: "#fff", boundsAlignH: "right"});
      
     interest_amount.anchor.setTo(0, 0);
      
     interest_amount.setTextBounds(-50, 0, 100, 100);
      
      if(this.earned > 0){
          localStorage.balance = parseInt(localStorage.balance) + interest+scoreN + this.earned * localStorage.pointMultiply;
          
//          var bean_face = this.add.sprite(this.game.width/2,this.game.height-20, 'bean_face');
//      bean_face.scale.setTo(0.250);
//      bean_face.anchor.setTo(0,1);
          
      }
      
    
      var start_bal_amount = parseInt(localStorage.balance);
      //this.balance = parseInt(localStorage.balance) + this.earned;
      this.balanceText = this.add.text(
      this.game.width/2 * 0.13,(results_Logo.y + results_Logo.height) + this.game.height/2.95 , "New Balance:", 
      { font: '40px monospace', fill: '#fff', align: 'center' }
    );
      this.balanceText.anchor.setTo(0, 0);
      //localStorage.balance = this.balance;
      
      new_bal_text = this.add.text(this.game.width/2 * 1.7,(results_Logo.y + results_Logo.height) + this.game.height/2.95, "$" + start_bal_amount.toLocaleString(), { font: "40px monospace", fill: "#fff",boundsAlignH: "right" });
      new_bal_text.anchor.setTo(0, 0);
      
      new_bal_text.setTextBounds(-50, 0, 100, 100);
      
      
     
  },

  update: function () {

   
  },

  retryGame: function () {
      this.state.start("Game");
      localStorage.complete = "no";
      
  },
  BankMenu: function () {
      this.state.start("Bank");
      localStorage.complete = "no";
      
  },
    
//  nextLevel: function () {
//      if(localStorage.complete == "yes" && localStorage.logged = "no"){
//        continueButton.visible = true;
//        retryButton.visible = false;
//        this.state.start("Game");
//        localStorage.complete = "no";
//    }
//     
//  },
    
  nextLevelSave: function () {
      if(localStorage.complete == "yes" && localStorage.logged === "yes"){
        saveAndContinueButton.visible = true;
        continueButton.visible = false;
        retryButton.visible = false;
        this.state.start("Game");
        localStorage.complete = "no";
        var account = localStorage.account;
          
          firebase.database().ref('test/').child("users").child("account:" + account).child("userdata").set({score:0,level:localStorage.win,balance:localStorage.balance,deposit_balance:localStorage.depositBalance,interest:localStorage.interest, player_ship:localStorage.player, player_shields:localStorage.shields,player_engine:localStorage.engine,player_rockets:localStorage.rockets,player_donation: localStorage.donateMessage,player_lives:localStorage.lives,player_velocity:localStorage.player_speed,player_fire:localStorage.fire});

    
          
          firebase.database().ref('test/').child("users").child("account:" + account).child("leveldata").update({greyEnemyPool: BasicGame.GREY_ENEMY_POOL,
                                                                                  greenEnemyPool: BasicGame.GREEN_ENEMY_POOL,
                                                                                  green_wrench:BasicGame.GREEN_WRENCH_POOL,
                                                                                  rusty_wrench:BasicGame.RUSTY_WRENCH_POOL,
                                                                                  candy_wrench:BasicGame.CANDY_WRENCH_POOL,
                                                                                  enemyMinVelocity:BasicGame.ENEMY_MIN_X_VELOCITY,
                                                                                  enemyMaxVelocity:BasicGame.ENEMY_MAX_X_VELOCITY,
                                                                                  shooterMinVelocity:BasicGame.SHOOTER_MIN_VELOCITY,
                                                                                  shooterMaxVelocity:BasicGame.SHOOTER_MAX_VELOCITY,
                                                                                   candyMinVelocity:BasicGame.CANDY_MIN_VELOCITY,
              candyMaxVelocity:BasicGame.CANDY_MAX_VELOCITY,
              rustyMinVelocity:BasicGame.RUSTY_MIN_VELOCITY,
              rustyMaxVelocity:BasicGame.RUSTY_MAX_VELOCITY,
              greenMinVelocity:BasicGame.GREEN_MIN_VELOCITY,
              greenMaxVelocity:BasicGame.GREEN_MAX_VELOCITY,
                                                                                  spawn_enemy:BasicGame.SPAWN_ENEMY_DELAY ,
              spawn_shooter:BasicGame.SPAWN_SHOOTER_DELAY,
              spawn_candy:BasicGame.SPAWN_CANDY_DELAY,
              spawn_rusty:BasicGame.SPAWN_RUSTY_DELAY,
              spawn_green:BasicGame.SPAWN_GREEN_DELAY                                                          
                                                                                 }); 
        
  
    }
      else if(localStorage.logged == "no"){
        if(localStorage.complete == "yes"){
            continueButton.visible = true;
            retryButton.visible = false;
            this.state.start("Game");
            localStorage.complete = "no";
        }
    }
  },
  
  mainMenu: function (){
      this.state.start("MainMenu");
  },
    
  addbal: function (earned) {
      if(localStorage.complete == "yes"){
      //if(parseInt(localStorage.score)>=100){
        this.earned += earned;
        this.earnedText.text = '$' + this.earned * localStorage.pointMultiply;
        continueButton.visible = true;
        retryButton.visible = false;
          
        if(localStorage.logged == "yes"){
            continueButton.visible = false;
            saveAndContinueButton.visible =true;
        }
        console.log(localStorage.complete);
        } 
    }
};