// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');
let guessedElement = document.querySelector('#lettersGuessed');

// snowman game object
let snowmanGame = {
  // list of words property 
  wordList: ['igloo', 'snowflake', 'sled', 'scarf', 'mitten', 'hail', 'olaf', 'chilly'],
  // the selected word is set here
  word: '',
  // letter or underscore is set here
  renderWord: '',
  // help to find index of letters of word
  letterOfWord: [],
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
    console.log(this.word);
  },
  // split word into letters within array
  splitWord: function(){
    this.letterOfWord = this.word.split('');
    console.log(this.letterOfWord);
  },
  // display underscores based on word length, 
  updateRenderWord: function(){
    let changeWord = '';
    for (let i= 0; i<this.word.length; i++) { 
      changeWord = changeWord + ' _ '
    }
  },
  handleUserInput: function(event){
    let code = event.keyCode;
    // validate that the user typed in a letter
    if(code > 64 && code < 91 ){
      // set string of key code to userInput
      snowmanGame.userInput = String.fromCharCode(code);
      // let guessIndex = 
    }
  },
  // method that starts the game
  playGame: function(){
    snowmanGame.selectWord();
    snowmanGame.splitWord();
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

// page listening for user input
document.addEventListener('keydown', snowmanGame.handleUserInput);