var balanceText;


BasicGame.DonateMenu = function (game) {

  this.music = null;
  this.playButton = null;


};

BasicGame.DonateMenu.prototype = {

  create: function () {
      
     var donate_back = this.add.sprite(0, 0, 'donate_background');
     donate_back.anchor.setTo(0,0);
     donate_back.width = this.game.width;
     donate_back.height = this.game.height;
      
       
      
      var donate_Logo = this.add.sprite(this.game.width/2, 50, 'donate_logo');
      donate_Logo.scale.setTo(0.8);
      donate_Logo.anchor.setTo(0.5,0);
      
      donateOneText = this.add.text(  this.game.width/5.7,  (donate_Logo.y + donate_Logo.height) + this.game.height/4, "Meteor Farms" , { font: "40px monospace", fill: "#fff", align: "center" });
      
      donateOneText.anchor.setTo(0.5);
      
      
      donateTwoText = this.add.text( this.game.width/2,  (donate_Logo.y + donate_Logo.height) + this.game.height/4, "Rocket Relief" , { font: "40px monospace", fill: "#fff", align: "center" });
      
      donateTwoText.anchor.setTo(0.5);
      
      donateThreeText = this.add.text(this.game.width/1.2, (donate_Logo.y + donate_Logo.height) + this.game.height/4, 'Space Pups' , { font: "40px monospace", fill: "#fff", align: "center" });
      
      donateThreeText.anchor.setTo(0.5);
      
      var balance = parseInt(localStorage.balance);
      
      balanceText = this.add.text(this.game.width / 2,  (donate_Logo.y + donate_Logo.height) + this.game.height/8, "Balance: $" + balance.toLocaleString(), { font: "60px monospace", fill: "#ffff00", align:  "center"});
      balanceText.anchor.setTo(0.5);

      donateOneDescription = this.add.text(donateOneText.position.x,(donate_Logo.y + donate_Logo.height) + this.game.height/3, "The galaxy's food pantry helping \n feed those in need" , { font: "20px monospace", fill: "#fff", align: "center" });
      
      donateOneDescription.anchor.setTo(0.5,0.5);
      
      
      donateTwoDescription = this.add.text(donateTwoText.position.x,(donate_Logo.y + donate_Logo.height) + this.game.height/3, "Providing emergency relief \n for space disasters" , { font: "20px monospace", fill: "#fff", align: "center" });
      
      donateTwoDescription.anchor.setTo(0.5,0.5);
      
      donateThreeDescription = this.add.text(donateThreeText.position.x,(donate_Logo.y + donate_Logo.height) + this.game.height/3, 'Finding homes for dogs across \n the galaxy' , { font: "20px monospace", fill: "#fff", align: "center" });
      
      donateThreeDescription.anchor.setTo(0.5,0.5);
      
      var donateOneBtn = this.game.add.button( donateOneDescription.position.x, (donate_Logo.y + donate_Logo.height) + this.game.height/2.35, "add_button", this.donateToOne,this);
      
      donateOneBtn.anchor.setTo(0.5,0.5);
      donateOneBtn.scale.setTo(0.2)
      
      donateOneBtn.onInputOver.add(over, this);
      donateOneBtn.onInputOut.add(out, this);
      donateOneBtn.onInputDown.add(down, this);
//      donateOneBtn.onInputUp.add(out, this);
      
      var capacityActive = this.add.text(this.game.width/2,  this.game.height/2 + 115 , "Strong Arms Level 5 Reached! Score Capacity Increase Is Active! ", { font: "20px monospace", fill: "#fff", align: "center" });
      
      capacityActive.visible = false;
      capacityActive.anchor.setTo(0.5);
      
      function over() {
          if(donateLvlOne == 5){
              capacityActive.visible = true
          }
      }
      
      function out() {
    capacityActive.visible = false;
                  }
      
      function down() {
          if(donateLvlOne == 4){
              capacityActive.visible = true
          }
      }
      
      var donateTwoBtn = this.game.add.button(donateTwoDescription.position.x, (donate_Logo.y + donate_Logo.height) + this.game.height/2.35, "add_button", this.donateToTwo,this);
      
      donateTwoBtn.anchor.setTo(0.5,0.5);
      donateTwoBtn.scale.setTo(0.2)
      
      donateTwoBtn.onInputOver.add(over2, this);
      donateTwoBtn.onInputOut.add(out2, this);
       donateTwoBtn.onInputDown.add(down2, this);
      
      var speedActive = this.add.text(this.game.width/2,  this.game.height/2 + 115 , "Speedy Helpers Level 5 Reached! Speed Increase Is Active! ", { font: "30px monospace", fill: "#fff", align: "center" });
      
      speedActive.visible = false;
      speedActive.anchor.setTo(0.5);
      
      function over2() {
          if(donateLvlTwo == 5){
              speedActive.visible = true
          };
          
}
      
      function out2() {
    speedActive.visible = false;
                  }
      function down2() {
          if(donateLvlTwo == 4){
              speedActive.visible = true
          }
      }
      
      
      var donateThreeBtn = this.game.add.button(donateThreeDescription.position.x , (donate_Logo.y + donate_Logo.height) + this.game.height/2.35, "add_button", this.donateToThree,this);
      
      donateThreeBtn.anchor.setTo(0.5,0.5);
      donateThreeBtn.scale.setTo(0.2);
      
      donateThreeBtn.onInputOver.add(over3, this);
      donateThreeBtn.onInputOut.add(out3, this);
      donateThreeBtn.onInputDown.add(down3, this);
      
      var healthActive = this.add.text(this.game.width/2,  this.game.height/2 + 115 , "Young Growers Level 5 Reached! Health Increase Is Active! ", { font: "30px monospace", fill: "#fff", align: "center" });
      
      healthActive.visible = false;
      healthActive.anchor.setTo(0.5);
      
      function over3() {
          if(donateLvlThree == 5){
              healthActive.visible = true
          };
          
}
      
      function out3() {
    healthActive.visible = false;
                  }
      function down3() {
          
          
          if(donateLvlThree == 4){
              healthActive.visible = true;
              setTimeout(function(){
                   healthActive.visible = false;
              },2000);
          }
      }
      
      buttonOneText = this.add.text(  donateOneBtn.position.x, (donate_Logo.y + donate_Logo.height) + this.game.height/2, "Donate: $10" , { font: "30px monospace", fill: "#fff", align: "center" });
      
      buttonOneText.anchor.setTo(0.5);
      
      
      buttonTwoText = this.add.text(donateTwoBtn.position.x,   (donate_Logo.y + donate_Logo.height) + this.game.height/2  , "Donate: $10" , { font: "30px monospace", fill: "#fff", align: "center" });
      
      buttonTwoText.anchor.setTo(0.5);
      
      buttonThreeText = this.add.text(donateThreeBtn.position.x,  (donate_Logo.y + donate_Logo.height) + this.game.height/2, 'Donate: $10' , { font: "30px monospace", fill: "#fff", align: "center" });
      
      buttonThreeText.anchor.setTo(0.5);
      
      donateOneMessage = this.add.text(  this.game.width/2,  (donate_Logo.y + donate_Logo.height) + this.game.height/1.65, "You have donated to an organiztion!" , { font: "30px monospace", fill: "#fff", align: "center" });
      
      donateOneMessage.anchor.setTo(0.5);
      
      donateOneMessage.visible = false;
      
      function over() {
          if (localStorage.donateMessage == "yes"){
              donateOneMessage.text = "You have donated to an organiztion!";
              donateOneMessage.visible = true;
          }
      }
      
      function out() {
       donateOneMessage.visible = false;
                  }
      
      this.donateTwoMessage = this.add.text(  this.game.width/2,  (donate_Logo.y + donate_Logo.height) + this.game.height/1.65 , "You have donated to an organiztion!!" , { font: "30px monospace", fill: "#fff", align: "center" });
//      this.instExpire = this.time.now + BasicGame.MENU_TEXT_DELAY;
      this.donateTwoMessage.anchor.setTo(0.5);
      
      this.donateTwoMessage.visible = false;
      
      function over2() {
          if (localStorage.donateMessage == "yes"){
              this.donateTwoMessage.text = "You have donated to an organiztion!";
              this.donateTwoMessage.visible = true;
          }
      }
      
      function out2() {
       this.donateTwoMessage.visible = false;
                  }
      
      donateThreeMessage = this.add.text(  this.game.width/2,  (donate_Logo.y + donate_Logo.height) + this.game.height/1.65 , "You have donated to an organiztion!" , { font: "30px monospace", fill: "#fff", align: "center" });
      
      donateThreeMessage.anchor.setTo(0.5);
      
      donateThreeMessage.visible = false;
      
      function over3() {
          if (localStorage.donateMessage == "yes"){
              donateThreeMessage.text = "You have donated to an organiztion!";
              donateThreeMessage.visible = true;
          }
      }
      
      function out3() {
       donateThreeMessage.visible = false;
                  }
      
      
      

      var BackBtn = this.game.add.button(donateTwoBtn.position.x, (donate_Logo.y + donate_Logo.height) + this.game.height/1.4, "backButton", this.backToMain,this);
      
      BackBtn.anchor.setTo(0.5);
      BackBtn.scale.setTo(0.25)
      

  balanceText.render = function(){
      var balance = parseInt(localStorage.balance);
      balanceText.text = "Balance: $" + balance.toLocaleString();
  };
  
    

  },

  update: function () {

   
  },
    
  donateToOne: function () {
      
      if(localStorage.donateMessage == "no" && parseInt(localStorage.balance) >= 10){
        localStorage.balance -=10
        localStorage.donateMessage = "yes";
        donateOneMessage.visible = true;
        localStorage.organization = 'Meteor Farms';
        this.sendToDb();
      }
   balanceText.render();
  },
    
  donateToTwo: function () {
      
      if(localStorage.donateMessage == "no" && parseInt(localStorage.balance) >= 10){
        localStorage.balance -=10
        localStorage.donateMessage = "yes";
        this.donateTwoMessage.visible = true;
        localStorage.organization = 'Rocket Relief';
        this.sendToDb();
      }
       balanceText.render();
  },
    
  donateToThree: function () {
      
      if(localStorage.donateMessage == "no" && parseInt(localStorage.balance) >= 10){
        localStorage.balance -=10
        localStorage.donateMessage = "yes";
        donateThreeMessage.visible = true;
        localStorage.organization = 'Space Pups';
        this.sendToDb();
      }
       balanceText.render();
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