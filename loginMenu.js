   var user,password,levelData,userName = "Tester";
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
   
    
BasicGame.LoginMenu = function(game){
    
};

BasicGame.LoginMenu.prototype = {
     
    
    preload: function(){
        this.game.plugins.add(PhaserInput.Plugin);
    },
    create: function (){
        var logText;
        
        var mainmenu_Back = this.add.sprite(0, 0, 'mainmenu_background');
        mainmenu_Back.anchor.setTo(0,0);
        mainmenu_Back.width = this.game.width;
        mainmenu_Back.height = this.game.height;
        
        var login_header = this.add.sprite(this.game.width/2, 50, 'login_header');
        login_header.scale.setTo(0.5);
        login_header.anchor.setTo(0.5,0);
        
        var logText = this.game.add.text(this.game.width/2,this.game.height-200,'',{font:'50px Arial', fill:'#fff'});
        logText.anchor.setTo(0.5);
        
         var loginBackground = this.game.add.sprite(this.game.width / 2, 270, 'inputbox');
         loginBackground.anchor.set(0.5);
         
         var user = this.game.add.inputField(this.game.width / 2-180, 270 - 17, {
                font: '18px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
//                forceCase: PhaserInput.ForceCase.upper,
                width: 350,
                max: 5,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Enter Account',
                textAlign: 'center',
                zoom: true
            });
        
         user.blockInput = false;
         
        
         var userLabel = this.game.add.text(this.game.width/2-215, 270,'Account Number',{font:'30px Arial', fill:'#fff'});
         userLabel.anchor.set(1,0.5);
        
         //We'd need a password too
         var passBg = this.game.add.sprite(this.game.width / 2, 350, 'inputbox');
         passBg.anchor.set(0.5);
        
         var password = this.game.add.inputField(this.game.width / 2-180 , 350 - 17, {
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
                placeHolder: 'Enter Password',
                type: PhaserInput.InputType.password,
                zoom: true,
                textAlign: 'center'
            });
         password.focusOutOnEnter = false;
         testHolder = password;
        
        var passwordLabel = this.game.add.text(this.game.width/2-215, 350,'Password',{font:'30px Arial', fill:'#fff'});
        passwordLabel.anchor.set(1,0.5);
        
        
         
        var BackBtn = this.game.add.button(this.game.width/2, this.game.height/2+285, "backButton", MainMenu,this);

        BackBtn.anchor.setTo(0.5);
        BackBtn.scale.setTo(0.35);
        
         var backToMain = this.game.add.button(this.game.width/2, 530 , "backtomain", MainMenu,this);

        backToMain.anchor.setTo(0.5);
        backToMain.scale.setTo(0.40);
        backToMain.visible = false;
        
        logText = this.game.add.text(this.game.width/2,440,'',{font:'50px Arial', fill:'#fff'});
        logText.anchor.setTo(0.5);
        
        var signupBtn = this.game.add.button(this.game.width / 2, 520, 'createaccountbutton', signup,this);
        signupBtn.anchor.set(0.5);
        signupBtn.scale.setTo(0.4);
        
        var loginBtn = this.game.add.button(this.game.width / 2, 450, 'loginbutton',getUser,this);
        loginBtn.anchor.set(0.5);
        loginBtn.scale.setTo(0.4);
        
          var errText = this.game.add.text(this.game.width/2,BackBtn.y - (BackBtn.y - signupBtn.y)/2 ,'',{font:'40px Arial', fill:'#fff'});
        errText.anchor.setTo(0.5);
    
        function getUser(){
            var accountDb = "";
            var passwordDb;
            var userLogin
            var userInput = user.value;
            var userinfo = userInput.toString();
            
            var dbRef = firebase.database().ref("test/");
            
            if( user.value === ""|| password.value === ""){
                    errText.setText("Please fill both text boxes");
                }
           
            dbRef.child("users").child("account:" + userinfo).on("value",function(data){
                userLogin = data.val()
                accountDb = userLogin.account_number;
                passwordDb = userLogin.password;
                
                 
                
                if(user.value === accountDb && password.value === passwordDb){
                    errText.setText('');
                    loginText();
                    loginBtn.visible = false;
                    signupBtn.visible = false;
                    BackBtn.visible = false;
                    backToMain.visible = true;
                    localStorage.account = accountDb;
                    console.log(localStorage.account);
                    localStorage.logged = "yes";
                    
                }else if(user.value === accountDb && password.value != passwordDb){
                    errText.setText("Account Number or Password is not correct");
                }
                
                
                
                
                if(localStorage.logged === "yes"){
                    var account = localStorage.account;
                    firebase.database().ref('test/').child("users").child("account:" + account).child("userdata").once('value').then(function(snapshot){
                        var data = snapshot.val();
                        localStorage.balance = data.balance;
                        localStorage.depositBalance = data.deposit_balance;
                        localStorage.interest = data.interest;
                        localStorage.win = data.level;
                        localStorage.player = data.player_ship;
                        localStorage.shields = data.player_shields;
                        localStorage.engine = data.player_engine;
                        localStorage.rockets = data.player_rockets;
                        localStorage.donateMessage = data.player_donation;
                        localStorage.fire = data.player_fire;
                        localStorage.player_speed = data.player_velocity;
                        localStorage.lives = data.player_lives;
                    });
            
                   firebase.database().ref('test/').child("users").child("account:" + account).child("leveldata").once('value').then(function(snapshot){
                        var levelData = snapshot.val();
                        BasicGame.RUSTY_WRENCH_POOL = levelData.rusty_wrench;
                        BasicGame.CANDY_WRENCH_POOL = levelData.candy_wrench;
                        BasicGame.ENEMY_MIN_X_VELOCITY = levelData.enemyMinVelocity;
                        BasicGame.ENEMY_MAX_X_VELOCITY = levelData.enemyMaxVelocity;
                        BasicGame.SHOOTER_MIN_VELOCITY = levelData.shooterMinVelocity;
                        BasicGame.SHOOTER_MAX_VELOCITY = levelData.shooterMinVelocity;
                        BasicGame.CANDY_MIN_VELOCITY = levelData.candyMinVelocity;
                        BasicGame.CANDY_MAX_VELOCITY = levelData.candyMaxVelocity;
                        BasicGame.RUSTY_MIN_VELOCITY = levelData.rustyMinVelocity;
                        BasicGame.RUSTY_MAX_VELOCITY = levelData.rustyMaxVelocity;
                        BasicGame.GREEN_MIN_VELOCITY = levelData.greenMinVelocity;
                        BasicGame.GREEN_MAX_VELOCITY = levelData.greenMaxVelocity;
                        BasicGame.GREEN_ENEMY_POOL = levelData.greenEnemyPool;
                        BasicGame.GREY_ENEMY_POOL = levelData.greyEnemyPool;
                        BasicGame.GREEN_WRENCH_POOL = levelData.green_wrench;
                        BasicGame.SPAWN_ENEMY_DELAY = levelData.spawn_enemy;
                        BasicGame.SPAWN_SHOOTER_DELAY = levelData.spawn_shooter;
                        BasicGame.SPAWN_CANDY_DELAY = levelData.spawn_candy;
                        BasicGame.SPAWN_RUSTY_DELAY = levelData.spawn_rusty;
                        BasicGame.SPAWN_GREEN_DELAY = levelData.spawn_green;
                    });
                }
                
            });
            
//            if(user.value != accountDb ){
//                errText.setText("Account not recognized");
//            }
        }  
       
        function loginText(){
            logText.setText("You are now logged in")
            
        }
        
        function logout(){
           this.state.start("Boot");
        }
        
        function signup(){
            this.state.start("Signup");
        }
        
        function MainMenu(){
            this.state.start("MainMenu");
        }
        
    }
}