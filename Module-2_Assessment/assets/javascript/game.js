// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');

// snowman game object
let snowmanGame = {
  // list of words property 
  wordList: ['igloo', 'snowflake', 'sled', 'scarf', 'mitten', 'hail', 'olaf', 'chilly'],
  // the selected word is set here
  word: '',
  // letter or underscore is set here
  renderWord: '',
  // incorrect guesses
  lettersGuessed: [],
  // whatever the user types in
  userInput: '',
  // set amount of guesses the user has to solve the word
  totalTries: 8,
  // amount of tries the user has attempted 
  triesRemaining: 0,
  // amount of words the user has solve is set here
  wins: 0,

  // selects random word from wordList and set it to word property
  selectWord: function(){
    this.word = this.wordList[ Math.floor(Math.random() * this.wordList.length) ];
  },
  // display underscores based on word length, 
  // map through array of letters and use ternery operator
  // to display letter or underscore based on guess
  updateRenderWord: function(){
    this.renderWord = this.word.split('').map(
      letter => (this.lettersGuessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');
      wordElement.innerText = this.renderWord;
  },
  handleUserInput: function(event){
    let code = event.keyCode;
    // validate that the user typed in a letter
    if(code > 64 && code < 91 ){
      // set string of key code to userInput
      snowmanGame.userInput = String.fromCharCode(code);
      // check to see if letter was already guessed
      snowmanGame.lettersGuessed.indexOf(snowmanGame.userInput) === -1 ? snowmanGame.lettersGuessed.push(snowmanGame.userInput) : null;
      
      if(snowmanGame.word.indexOf(snowmanGame.userInput) >= 0){ 
        snowmanGame.updateRenderWord();
        // check if meet victory condition
      }
    }
  },
  // method that starts the game
  playGame: function(){
    snowmanGame.selectWord();
    snowmanGame.updateRenderWord();
  },
  // method to start the snowman game and 
  // removes event listener after one user key click
  // user must refresh page to run the key click event listener 
  startGame: function(){
    snowmanGame.playGame();
    gameElement.removeEventListener('keydown', snowmanGame.startGame);
  },
}

// on any key click, snowman game will start 
gameElement.addEventListener('keydown', snowmanGame.startGame);      

document.addEventListener('keydown', snowmanGame.handleUserInput);