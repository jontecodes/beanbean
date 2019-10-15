var scoreText3;
var currentBalance = localStorage.balance;
var rocketActive;
var speedActive;
var shieldActive;
var balanceText;


BasicGame.InvestMenu = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.InvestMenu.prototype = {

  create: function () {
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      var invest_back = this.add.sprite(0, 0, 'invest_background');
      invest_back.anchor.setTo(0,0);
      invest_back.width = this.game.width;
      invest_back.height =this.game.height;
      
      var invest_Logo = this.add.sprite(this.game.width/2, 50, 'invest_logo');
      invest_Logo.scale.setTo(0.8);
      invest_Logo.anchor.setTo(0.5,0);
      
      var earnings = parseInt(localStorage.balance);
      
    balanceText = this.add.text(invest_Logo.position.x,  (invest_Logo.y +invest_Logo.height) + this.game.height/8, "Earnings: $"  + earnings.toLocaleString(), { font: "60px monospace", fill: "#fff", align: "center" });
    balanceText.anchor.setTo(0.5);
      
      balanceText.render = function () {
      var earnings = parseInt(localStorage.balance);
      balanceText.text = 'Earnings: $' + earnings.toLocaleString(); 
     
      };
      
     rocketActive = this.add.text(this.game.width/2,  (invest_Logo.y + invest_Logo.height) + this.game.height/1.6, "Rockets invested! 150 deducted from earnings!", { font: "30px monospace", fill: "#fff", align: "center" });
      
      rocketActive.visible = false;
      rocketActive.anchor.setTo(0.5);
      
      function over7() {
          if (parseInt(localStorage.rockets) > 0){
              rocketActive.text = "You have already invested in Rockets!";
              rocketActive.visible = true;
          }
      }
      
      function out7() {
        rocketActive.visible = false;
                  }
      
      speedActive = this.add.text(this.game.width/2,  (invest_Logo.y + invest_Logo.height) + this.game.height/1.6, "Speed invested! 150 deducted from earnings!", { font: "30px monospace", fill: "#fff", align: "center" });
      
      speedActive.visible = false;
      speedActive.anchor.setTo(0.5);
      
      function over8() {
          if (parseInt(localStorage.engine) > 0){
              speedActive.text = "You have already invested in Speed!";
              speedActive.visible = true;
          }
      }
      
      function out8() {
        speedActive.visible = false;
                  }
      
       shieldActive = this.add.text(this.game.width/2,  (invest_Logo.y + invest_Logo.height) + this.game.height/1.6, "Health invested! 150 deducted from earnings!", { font: "30px monospace", fill: "#fff", align: "center" });
      
      shieldActive.visible = false;
      shieldActive.anchor.setTo(0.5);
      
      function over9() {
          if (parseInt(localStorage.shields) > 0){
              shieldActive.text = "You have already invested in Health!";
              shieldActive.visible = true;
          }
      }
      
      function out9() {
        shieldActive.visible = false;
                  }
    
      var rocketsBtn = this.game.add.button(this.game.width/4.6, (invest_Logo.y + invest_Logo.height) + this.game.height/3.4, "rockets_button", this.rockets,this);
      rocketsBtn.anchor.setTo(0.5,0.5);
      rocketsBtn.scale.setTo(0.8);
      
      rocketsBtn.onInputOver.add(over7, this);
      rocketsBtn.onInputOut.add(out7, this);
      //rocketsBtn.onInputDown.add(down7, this);
      
      var enginesBtn = this.game.add.button(this.game.width/2, (invest_Logo.y + invest_Logo.height) + this.game.height/3.4, "engines_button", this.speed,this);
      enginesBtn.anchor.setTo(0.5);
      enginesBtn.scale.setTo(0.8);
      
      enginesBtn.onInputOver.add(over8, this);
      enginesBtn.onInputOut.add(out8, this);
      
      
      var shieldsBtn = this.game.add.button(this.game.width/1.28,(invest_Logo.y + invest_Logo.height) + this.game.height/3.4, "shields_button", this.shield,this);
      shieldsBtn.anchor.setTo(0.5,0.5);
      shieldsBtn.scale.setTo(0.8);
      
      shieldsBtn.onInputOver.add(over9, this);
      shieldsBtn.onInputOut.add(out9, this);
      
      rocketDescriptionText = this.add.text(rocketsBtn.position.x,  (invest_Logo.y + invest_Logo.height) + this.game.height/2.4, "Zap the Gimme Gatchas \n in your way" , { font: "20px monospace", fill: "#fff", align: "center" });
      
      rocketDescriptionText.anchor.setTo(0.5,0.5);
      
      speedDescriptionText = this.add.text(enginesBtn.position.x,  (invest_Logo.y + invest_Logo.height) + this.game.height/2.4, "Race across the galaxy \n faster" , { font: "20px monospace", fill: "#fff", align: "center" });
      
      speedDescriptionText.anchor.setTo(0.5,0.5);
      
      healthDescriptionText = this.add.text(shieldsBtn.position.x,  (invest_Logo.y + invest_Logo.height) + this.game.height/2.4, "Protect yourself from \n the Gimme Gatchas" , { font: "20px monospace", fill: "#fff", align: "center" });
      
      healthDescriptionText.anchor.setTo(0.5,0.5);
      
      rocketPriceText = this.add.text(rocketsBtn.position.x, (invest_Logo.y + invest_Logo.height) + this.game.height/1.9, "$150" , { font: "40px monospace", fill: "#fff", align: "center" });
      
      rocketPriceText.anchor.setTo(0.5,0.5);
      
      speedPriceText = this.add.text(enginesBtn.position.x, (invest_Logo.y + invest_Logo.height) + this.game.height/1.9 , "$150" , { font: "40px monospace", fill: "#fff", align: "center" });
      
      speedPriceText.anchor.setTo(0.5,0.5);
      
      healthPriceText = this.add.text(shieldsBtn.position.x, (invest_Logo.y + invest_Logo.height) + this.game.height/1.9 , "$150" , { font: "40px monospace", fill: "#fff", align: "center" });
      
      healthPriceText.anchor.setTo(0.5,0.5);
      
      var BackBtn = this.game.add.button(this.game.width/2, (invest_Logo.y + invest_Logo.height) + this.game.height/1.4, "backButton", this.backToMain,this);
      
      BackBtn.anchor.setTo(0.5);
      BackBtn.scale.setTo(0.25);
  
  },

  update: function () {

  },
  
rockets: function(){
    if(parseInt(localStorage.rockets) == 0){
        if(parseInt(localStorage.balance) >= 150){
            localStorage.fire = 100;
            localStorage.balance -= 150;
            rocketActive.visible = true;
             localStorage.rockets = parseInt(localStorage.rockets) + 1;
            this.sendToDb();
          }
        balanceText.render();     
    }   
},

shield: function(){
    if(parseInt(localStorage.shields) == 0){
        if(parseInt(localStorage.balance) >= 150){

            if(localStorage.lives == 5 || localStorage.lives == 7){
                localStorage.lives = parseInt(localStorage.lives)+4;
                localStorage.balance -= 150;
                shieldActive.visible = true;
                localStorage.shields = parseInt(localStorage.shields) + 1;
                this.sendToDb();
            }
          }
          balanceText.render();  
    }
},

speed: function(){
    if(parseInt(localStorage.engine) == 0){
        if(parseInt(localStorage.balance) >= 150){
            localStorage.player_speed = 450;
            localStorage.balance -= 150;  
            speedActive.visible = true;
            localStorage.engine = parseInt(localStorage.engine) + 1;
            this.sendToDb();
            }
          balanceText.render();  
    }
},
  
backToMain: function (){
      this.state.start("Bank");
  },
    sendToDb: function(){
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

};