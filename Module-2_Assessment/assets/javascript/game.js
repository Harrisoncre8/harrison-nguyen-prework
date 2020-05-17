// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');
let guessedElement = document.querySelector('#lettersGuessed');
let mistakeElement = document.querySelector('#guessRemain');
let winElement = document.querySelector('#win');

// snowman game object
let snowmanGame = {
  // list of words property, must be uppercase
  wordList: ['IGLOO', 'SNOWFLAKE', 'SLED', 'SCRAF', 'MITTEN', 'HAIL', 'OLAF', 'CHILLY'],
  word: '',   // the selected word is set here
  renderWord: '',   // letter or underscore is set here
  letterOfWord: [],   // initial underscore word
  lettersGuessed: [],   // keep track of letters used
  userInput: '',   // set to the user's guess letter
  triesRemaining: 10,   // amount of tries the user has attempted 
  triesCorrect: 0,   // counter until win
  wins: 0,   // amount of words the user has solve is set here
  
  // reset game
  resetGame: function(){
    this.renderWord = '';
    this.letterOfWord = [];
    this.lettersGuessed = [];
    this.word = '';
    this.triesCorrect = 0;
    this.triesRemaining = 10;
  },
  // select random word from wordList and set it to word property
  selectWord: function(){
    this.resetGame();
    this.word = this.wordList[ Math.floor(Math.random() * this.wordList.length) ];
    console.log(this.word);
  },
  // split word into letters within array
  splitWord: function(){
    this.letterOfWord = this.word.split('');
    console.log(this.letterOfWord);
  },
  // display underscores based on word length, 
  initialRenderWord: function(){
    for (let i= 0; i<this.letterOfWord.length; i++) { 
      this.renderWord = this.renderWord + '_'
    }
    // render initial underscore word and guesses
    wordElement.innerText = this.renderWord;
    mistakeElement.innerText = this.triesRemaining;
  },
  // updates word as user guesses correctly
  updateRenderWord: function(index, wordParam, renderWordParam){
    // get correct letter based off of index position within array
    let letter = wordParam[index];
    // split current renderWord value into array of letters
    renderWordParam = this.renderWord.split('');
    // target letter position by index and replace underscore with correct letter
    renderWordParam[index] = letter;
    // return string from array
    this.renderWord = renderWordParam.join('');
    // update correct words on DOM
    wordElement.innerText = this.renderWord;
  },
  // subtract from triesRemaining value and render
  updateMistake: function(){
    this.triesRemaining --;
    mistakeElement.innerText = this.triesRemaining;
  },
  handleUserInput: function(event){
    // set keycode to code variable
    let code = event.keyCode;
    // validate that the user typed in a letter
    if(code > 64 && code < 91 ){
      // set string of key code to userInput
      snowmanGame.userInput = String.fromCharCode(code); 
      // get index of guess if it matches with letters in word
      let guessIndex = snowmanGame.letterOfWord.indexOf(snowmanGame.userInput);
      // if guess is correct, get rid of matched letter in letterOfWord array
      if(guessIndex >= 0){
        // update tries correct
        snowmanGame.triesCorrect ++;        
        // remove guess from letterOfWord array
        snowmanGame.letterOfWord.splice(guessIndex, 1);
        // get the index of the correct letter
        let index = snowmanGame.word.indexOf(snowmanGame.userInput);
        // call method to update the word on the DOM
        snowmanGame.updateRenderWord(index, snowmanGame.word, snowmanGame.renderWord);
        // check to see if game is won
        snowmanGame.gameWonCheck();
      } else if(guessIndex === -1) {
        snowmanGame.updateMistake();
        // check if game lost
        snowmanGame.gameLoseCheck();
      }
    }
  },
  // method to play the game
  playGame: function(){
    snowmanGame.selectWord();
    snowmanGame.splitWord();
    snowmanGame.initialRenderWord();
  },
  gameWonCheck: function(){
    if(this.triesCorrect === this.renderWord.length){
      console.log('You win!');
      // play music
      snowmanGame.wins ++;
      winElement.innerText = snowmanGame.wins;
      snowmanGame.playGame();
    }
  },
  gameLoseCheck: function(){
    if(this.triesRemaining === 0){
      // play lose music
      console.log('You lose!');
      snowmanGame.playGame();
    }
  },
  // method to setup the snowman game and 
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