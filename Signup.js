var user,password,levelData,userName, login, logText, signupBtn;
    var levelData = {
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
              greenEnemyPool:BasicGame.GREEN_ENEMY_POOL,                      //
              greyEnemyPool:BasicGame.GREY_ENEMY_POOL,                        //
              green_wrench:BasicGame.GREEN_WRENCH_POOL,
              spawn_enemy:BasicGame.SPAWN_ENEMY_DELAY ,
              spawn_shooter:BasicGame.SPAWN_SHOOTER_DELAY,
              spawn_candy:BasicGame.SPAWN_CANDY_DELAY,
              spawn_rusty:BasicGame.SPAWN_RUSTY_DELAY,
              spawn_green:BasicGame.SPAWN_GREEN_DELAY
           }
    
BasicGame.Signup = function(game){
 firebase.auth().signOut();
    
};

BasicGame.Signup.prototype = {
    
    
    preload: function(){
        this.game.plugins.add(PhaserInput.Plugin);
    },
    create: function (){
        
        var mainmenu_Back = this.add.sprite(0, 0, 'mainmenu_background');
        mainmenu_Back.anchor.setTo(0,0);
        mainmenu_Back.width = this.game.width;
        mainmenu_Back.height = this.game.height;
        
        var signup_header = this.add.sprite(this.game.width/2, 110, 'signup_header');
        signup_header.scale.setTo(0.5);
        signup_header.anchor.setTo(0.5,0);
        
//        var loginWelcomeText = this.game.add.text(this.game.width/2,230,'SIGN UP FOR A NEW ACCOUNT',{font:'55px Arial', fill:'#fff'});
//        loginWelcomeText.anchor.setTo(0.5);
        
        var passwordLabel = this.game.add.text(this.game.width/2-215, 270,'Password',{font:'35px Arial', fill:'#fff'});
        passwordLabel.anchor.set(1,0.5);
        
        
         var passwordBackground = this.game.add.sprite(this.game.width / 2, 270, 'inputbox');
         passwordBackground.anchor.set(0.5);
         
         var pass = this.game.add.inputField(this.game.width / 2 - 180, 270 - 17, {
                font: '18px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
//                forceCase: PhaserInput.ForceCase.upper,
                width: 350,
                max: 10,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Password',
                textAlign: 'center',
                zoom: true
            });
        
         pass.blockInput = false;
        
        
         //We'd need a password too
        var passwordConfirmLabel = this.game.add.text(this.game.width/2-215, 350,'Confirm Password',{font:'35px Arial', fill:'#fff'});
         passwordConfirmLabel.anchor.set(1,0.5);
        
         var passConfirmBackground = this.game.add.sprite(this.game.width / 2, 350, 'inputbox');
         passConfirmBackground.anchor.set(0.5);
        
         var passConfirm = this.game.add.inputField(this.game.width / 2 - 180, 350 - 17, {
                font: '18px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
                width: 350,
                max: 10,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Confirm Password',
//                type: PhaserInput.InputType.password,
                zoom: true,
                textAlign: 'center'
            });
         passConfirm.focusOutOnEnter = false;
         testHolder = password;
        
        var backButton = this.game.add.button(this.game.width/2, this.game.height/2+285, "backButton", loginMenu,this);

        backButton.anchor.setTo(0.5);
        backButton.scale.setTo(0.35);
        
        var backToLogin = this.game.add.button(this.game.width/2, 450, "backtologin", loginMenu,this);
         backToLogin.visible = false;
        
        backToLogin.anchor.setTo(0.5);
        backToLogin.scale.setTo(0.4);
        
        signupBtn = this.game.add.button(this.game.width / 2, 450, 'createaccountbutton', signup,this);
        signupBtn.anchor.set(0.5);
        signupBtn.scale.setTo(0.4);
        signupBtn.visible = true;
        
         var logText = this.game.add.text(this.game.width/2,signupBtn.y + 100,'',{font:'50px Arial', fill:'#fff'});
        logText.anchor.setTo(0.5);
        
       function signup(){
           if(pass.value === "" || passConfirm.value === ""){
                logText.setText("Please fill both boxes");
           }else if(pass.value != passConfirm.value){
              logText.setText("Passwords do not match")
           }else if (pass.value === passConfirm.value){
               incID();
               generateAccount();
               displayAccount();
               backToLogin.visible = true;
               signupBtn.visible = false;
               backButton.visible = false;ß
           }
    }

        var protoRef = firebase.database().ref("test/");
        var numOfAccount = protoRef.child("numId");
        var padded;  
        function incID(){
            if(pass.value === passConfirm.value){
                numOfAccount.transaction(function(currentID){
                    return currentID + 1;
                });    
            }
            
            }
        
        numOfAccount.on("value",function(snap){
            var numId = snap.val();
            padded = "00000" +numId;
            padded = padded.substr(-5);
        });
        
        function generateAccount(){
             protoRef.child("users").child("account:" + padded).set({account_number: padded, password:pass.value});
            
            protoRef.child("users").child("account:" + padded).child("leveldata").set(levelData);
            
            protoRef.child("users").child("account:" + padded).child("userdata").set({score:0,level:localStorage.win,balance:localStorage.balance,deposit_balance:localStorage.depositBalance,interest:localStorage.interest, player_ship:localStorage.player, player_shields:localStorage.shields,player_engine:localStorage.engine,player_rockets:localStorage.rockets,player_donation: localStorage.donateMessage,player_lives:localStorage.lives,player_velocity:localStorage.player_speed,player_fire:localStorage.fire});
        }
        
        function displayAccount(){
            if(pass.value === passConfirm.value){
                logText.setText("Account: " + padded +"\n" + "Password: " + passConfirm.value);
                logText.y = backToLogin.y + 100;
            }
           signupBtn.visible = false;
        }
        
        
        
        
            
          function loginMenu(){
    this.state.start("Login");
}
    }
    
    
  
    
}
    