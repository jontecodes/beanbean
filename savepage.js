//localStorage.depositBal = localStorage.depositBal || 0;
var scoreText;
var scoreText1;
var scoreTextAmount;
var scoreText1Amount;
var scoreText2;



BasicGame.SaveMenu = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.SaveMenu.prototype = {

  create: function () {
      
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
    var save_Backgroud = this.add.sprite(0, 0, 'save_background')
    save_Backgroud.anchor.setTo(0,0);
    save_Backgroud.width = this.game.width;
    save_Backgroud.height = this.game.height;

    var savelogo = this.add.image(this.game.width/2,50,'save_logo'); 
    savelogo.anchor.setTo(0.5,0);
    savelogo.scale.setTo(0.8);

    var score;
      
    var save_deposit_balance = parseInt(localStorage.depositBalance);
      
    scoreText1 = this.add.text((this.game.width / 2) / 2,  (savelogo.y +savelogo.height) + this.game.height/4.5, "Savings Balance:", { font: "35px monospace", fill: "#fff", align: "center" });

    scoreText1.anchor.setTo(0,0.5);
      
    scoreText1Amount = this.add.text((this.game.width / 2) * 1.3,  (savelogo.y +savelogo.height) + this.game.height/4.5, "$" + save_deposit_balance.toLocaleString(), { font: "35px monospace", fill: "#fff", boundsAlignH: "right"});
    
    scoreText1Amount.setTextBounds(-50, 0 , 100, 100);
    scoreText1Amount.anchor.setTo(0, 0.5);
      

    scoreText = this.add.text((this.game.width / 2) / 2, (savelogo.y +savelogo.height) + this.game.height/10, "Balance:", { font: "35px monospace", fill: "#fff", align: "center" });

    scoreText.anchor.setTo(0,0.5);
    
    var balance = parseInt(localStorage.balance);
      
    scoreTextAmount = this.add.text((this.game.width / 2) * 1.3,  (savelogo.y +savelogo.height) + this.game.height/10, "$" + balance.toLocaleString(), { font: "35px monospace", fill: "#fff", boundsAlignH: "right"});
    
    scoreTextAmount.setTextBounds(-50, 0 , 100, 100);
    scoreTextAmount.anchor.setTo(0, 0.5);

    scoreText2 = this.add.text(this.game.width / 2,  (savelogo.y +savelogo.height) + this.game.height/1.7, "Interest added to Earnings after level completion: $"  + localStorage.interest, { font: "35px monospace", fill: "#fff", align: "center" });

    scoreText2.anchor.setTo(0.5);



    scoreText.render = function () {
        var save_deposit_balance = parseInt(localStorage.depositBalance);
        var balance = parseInt(localStorage.balance);

        scoreText1Amount.text = "$" + save_deposit_balance.toLocaleString(); 
        
        scoreTextAmount.text = "$" + balance.toLocaleString(); 
        
        scoreText2.text = 'Interest added to Earnings after level completion: $' + localStorage.interest; 



      };
      
  var BackBtn = this.game.add.button(this.game.width/2, (savelogo.y +savelogo.height) + this.game.height/1.4, "backButton", this.backToMain,this);
  BackBtn.anchor.setTo(0.5);
  BackBtn.scale.setTo(0.25)



  var DepositBtn = this.game.add.button(this.game.width/2, (savelogo.y +savelogo.height) + this.game.height/2.2, "depositButton", this.depositAmount,this);
  DepositBtn.anchor.setTo(0.5);
  DepositBtn.scale.setTo(0.5)



  this.add.text((this.game.width / 2) / 2,(savelogo.y +savelogo.height) + this.game.height/3, "Interest Rate:", { font: "35px monospace", fill: "#fff", align: "center"}).anchor.setTo(0, 0.5);
      
  this.add.text((this.game.width / 2) * 1.3,(savelogo.y +savelogo.height) + this.game.height/3, "5%", { font: "35px monospace", fill: "#fff", boundsAlignH: "right"}).setTextBounds(-50, 0 , 100, 100).anchor.setTo(0, 0.5);
  },

  update: function () {      
    
  },

  backToMain: function (){
      this.state.start("Bank");
  },
  
  depositAmount: function (){

    if(parseInt(localStorage.balance) >= 20){

        localStorage.balance -= 20;
        localStorage.depositBalance = parseInt(localStorage.depositBalance) +20;
        localStorage.interest = parseInt(localStorage.depositBalance) * 0.05;   
        
       if(localStorage.logged ==="yes"){
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
          
    }
      
    scoreText.render();
  }

};