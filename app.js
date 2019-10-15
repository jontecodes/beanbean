window.onload = function() {

  //  Create your Phaser game and inject it into the gameContainer div.
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameContainer');
    
    var config = {
    apiKey: "AIzaSyByRDJiQiUC8Wp2JJT5ENmURu50C0wMmTc",
    authDomain: "test-11aa0.firebaseapp.com",
    databaseURL: "https://test-11aa0.firebaseio.com",
    projectId: "test-11aa0",
    storageBucket: "test-11aa0.appspot.com",
    messagingSenderId: "684822546006"
  };
  firebase.initializeApp(config);

  //  Add the States your game has.
  game.state.add('Boot', BasicGame.Boot);
  game.state.add('Preloader', BasicGame.Preloader);
  game.state.add('Title', BasicGame.TitleMenu);
  game.state.add('Login',BasicGame.LoginMenu);
  game.state.add('Game', BasicGame.Game);
  game.state.add('Result', BasicGame.ResultMenu);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('Bank', BasicGame.BankMenu);
  game.state.add('Save', BasicGame.SaveMenu);
  game.state.add('Donate', BasicGame.DonateMenu);
  game.state.add('Invest', BasicGame.InvestMenu);
  game.state.add('Store', BasicGame.StoreMenu);
  game.state.add('Option', BasicGame.OptionMenu);
  game.state.add('Objectives', BasicGame.Objectives);
  game.state.add('Signup', BasicGame.Signup);

  //  Now start the Boot state.
  game.state.start('Boot');

};
