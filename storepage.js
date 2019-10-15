var scoreText3;

BasicGame.StoreMenu = function (game) {

 // this.music = null;
  this.playButton = null;

};

BasicGame.StoreMenu.prototype = {

  create: function () {

      var spend_back = this.add.sprite(0, 0, 'spend_background');
      spend_back.anchor.setTo(0,0);
      spend_back.width = this.game.width;
      spend_back.height = this.game.height;
      
      var spend_Logo = this.add.sprite(this.game.width/2, 50, 'spend_logo');
      spend_Logo.scale.setTo(0.8);
      spend_Logo.anchor.setTo(0.5,0);
     
      var BackBtn = this.game.add.button(this.game.width/2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.4, "backButton", this.backToMain,this);
      
      BackBtn.anchor.setTo(0.5);
      BackBtn.scale.setTo(0.25)
      
      var shipBlue = this.game.add.button(this.game.width/3.5, (spend_Logo.y +spend_Logo.height) + this.game.height/3.2, "blueShip", this.changeToBlue,this);
      shipBlue.anchor.setTo(0.5);
      shipBlue.scale.setTo(1.3);
      
      shipBlue.onInputUp.add(up, this);
      shipBlue.onInputDown.add(down, this);
      shipBlue.onInputOut.add(out, this);
      shipBlue.onInputOver.add(over, this);
      
      function up(){
          buyNotifyBlue.visible = false;
      };
      
      function down(){
          if(localStorage.player === 'blueShip'){
            ownedShipBlue.visible = true;
        }
          if(ownedShipBlue.visible == true){
              buyNotifyBlue.visible = false;
              }
          else if(parseInt(localStorage.balance)>=60){
              buyNotifyBlue.visible = true;
              }
      };
      function out(){
          buyNotifyBlue.visible = false;
          ownedShipBlue.visible = false;
      };
      
      function over(){
        if(localStorage.player === 'blueShip'){
            ownedShipBlue.visible = true;
        }      
      };
      
      this.textBlue = this.add.text(this.game.width/3.5, (spend_Logo.y +spend_Logo.height) + this.game.height/2, "$60", { font: "60px monospace", fill: "#fff" });
      this.textBlue.anchor.setTo(0.5);
      
      var shipGreen = this.game.add.button(this.game.width/1.39, (spend_Logo.y +spend_Logo.height) + this.game.height/3.2, "greenShip", this.changeToGreen,this);
      shipGreen.anchor.setTo(0.5);
      shipGreen.scale.setTo(1.3);
      
      shipGreen.onInputUp.add(up2, this);
      shipGreen.onInputDown.add(down2, this);
      shipGreen.onInputOut.add(out2, this);
      shipGreen.onInputOver.add(over2, this);
      
      function up2(){
          buyNotifyGreen.visible = false;
      };
      
      function down2(){
          if(localStorage.player === 'greenShip'){
            ownedShipGreen.visible = true;
        }
          if(ownedShipGreen.visible == true){
              buyNotifyGreen.visible = false;
              }
          else if(parseInt(localStorage.balance)>=60){
              buyNotifyGreen.visible = true;
              }
        
      };
      function out2(){
         buyNotifyGreen.visible = false;
         ownedShipGreen.visible = false;
      };
      
      function over2(){
          if(localStorage.player === 'greenShip'){
            ownedShipGreen.visible = true;
        } 
      };
      
      
      this.textGreen = this.add.text(this.game.width/1.39, (spend_Logo.y +spend_Logo.height) + this.game.height/2, "$60", { font: "60px monospace", fill: "#fff" });
      this.textGreen.anchor.setTo(0.5);
      
      var shipPink = this.game.add.button(this.game.width/2, (spend_Logo.y +spend_Logo.height) + this.game.height/3.2, "pinkShip", this.changeToPink,this);
      shipPink.anchor.setTo(0.5);
      shipPink.scale.setTo(1.3);
      
      shipPink.onInputUp.add(up3, this);
      shipPink.onInputDown.add(down3, this);
      shipPink.onInputOut.add(out3, this);
      shipPink.onInputOver.add(over3, this);
      
      function up3(){
          buyNotifyPink.visible = false;
      };
      
      function down3(){
           if(localStorage.player === 'pinkShip'){
            ownedShipPink.visible = true;
        }
          if(ownedShipPink.visible == true){
              buyNotifyPink.visible = false;
              }
          else if(parseInt(localStorage.balance)>=60){
              buyNotifyPink.visible = true;
              }
      };
      
      function out3(){
         buyNotifyPink.visible = false;
         ownedShipPink.visible = false;
      };
      
      function over3(){
          if(localStorage.player === 'pinkShip'){
            ownedShipPink.visible = true;
        } 
      };
      
      this.textPink = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/2, "$60", { font: "60px monospace", fill: "#fff" });
      this.textPink.anchor.setTo(0.5);
      
      var buyNotifyBlue = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Blue Ship Purchased", { font: "40px monospace", fill: "#fff" });
      buyNotifyBlue.anchor.setTo(0.5);
      buyNotifyBlue.visible = false;
      
      var ownedShipBlue = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Blue Ship Owned", { font: "40px monospace", fill: "#fff" });
     ownedShipBlue.anchor.setTo(0.5);
      ownedShipBlue.visible = false;
      
      var buyNotifyGreen = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Green Ship Purchased", { font: "40px monospace", fill: "#fff" });
      buyNotifyGreen.anchor.setTo(0.5);
      buyNotifyGreen.visible = false;
      
       var ownedShipGreen = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Green Ship Owned", { font: "40px monospace", fill: "#fff" });
      ownedShipGreen.anchor.setTo(0.5);
      ownedShipGreen.visible = false;
      
      var buyNotifyPink = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Pink Ship Purchased", { font: "40px monospace", fill: "#fff" });
      buyNotifyPink.anchor.setTo(0.5);
      buyNotifyPink.visible = false;
      
       var ownedShipPink = this.add.text(this.game.width / 2, (spend_Logo.y +spend_Logo.height) + this.game.height/1.6, "Pink Ship Owned", { font: "40px monospace", fill: "#fff" });
      ownedShipPink.anchor.setTo(0.5);
      ownedShipPink.visible = false;
  
      var balance = parseInt(localStorage.balance);
      
      scoreText3 = this.add.text(this.game.width / 2,  (spend_Logo.y +spend_Logo.height) + this.game.height/8, "Balance: "  +"$"+  balance.toLocaleString(), { font: "60px monospace", fill: "#fff", align: "center" });
      
      scoreText3.anchor.setTo(0.5);
      
      //Text render function
      scoreText3.render = function () {
      var balance = parseInt(localStorage.balance);
      scoreText3.text = 'Balance: ' +"$"+ balance.toLocaleString(); 
          if(localStorage.balance <= 0){
          localStorage.balance = 0
      }

      scoreText3.render();    
      };
  },

  update: function () {
      
    
   
  },
  //If player is not pink ship then change to pink and subtract from balance
  changeToPink: function (){

      if(localStorage.player != 'pinkShip' && (parseInt(localStorage.balance)>=60)){ 
          localStorage.balance -= 60;
          localStorage.player = 'pinkShip';
          this.sendToDb();
    }
   scoreText3.render();
     
  },
  //If player is not blue ship then change to blue and subtract from balance 
  changeToBlue: function (){
   
 if(localStorage.player != 'blueShip' && (parseInt(localStorage.balance)>=60)){ 
          localStorage.balance -= 60;
          localStorage.player = 'blueShip';
          this.sendToDb();
    }
       scoreText3.render();
  },
 
  //If player is not green ship then change to green and subtract from balance
  changeToGreen: function (){
       if(localStorage.player != 'greenShip' && (parseInt(localStorage.balance)>=60)){ 
          localStorage.balance -= 60;
          localStorage.player = 'greenShip';
          this.sendToDb();
    }
       scoreText3.render();
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