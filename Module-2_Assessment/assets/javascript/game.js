// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');
let guessedElement = document.querySelector('#lettersGuessed');
let mistakeElement = document.querySelector('#guessRemain');
let winElement = document.querySelector('#win');
let prevElement = document.querySelector('#previousWord');

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
  wins: 0,   // amount of words the user has solve is set here
  previousWord: '', // set word from last round here
  // win/lose messeages to render on condition
  winMessage: 'Congrats! You built a snowman using the word ',
  loseMessage: 'Oh no! You melted the snowman with the word ',

  
  // reset game
  resetGame: function(){
    this.renderWord = '';
    this.letterOfWord = [];
    this.lettersGuessed = [];
    this.word = '';
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
    // array to store positions of same letters in word
    let letterPositions = []; 
    // get current guessed letter
    let letter = wordParam[index];
    // split current word and renderWord value into array of letters
    let arrayOfWord = this.word.split('');
    renderWordParam = this.renderWord.split('');
    // loop through selected word to store matched letter positions in array
    for(let j=0; j<arrayOfWord.length; j++){
      if(arrayOfWord[j] === letter){
        letterPositions.push([j]);
        // loop through letter position array to target specific letter
        for(let x=0; x<letterPositions.length; x++){
          // target letter position by stored positions and replace underscore with correct letter
          renderWordParam[letterPositions[x]] = letter;
          // return string from array
          snowmanGame.renderWord = renderWordParam.join('');          
        }
      }
    }
    // render letters
    wordElement.innerText = this.renderWord;
  },
  // subtract from triesRemaining value and render
  updateMistake: function(){
    this.triesRemaining --;
    mistakeElement.innerText = this.triesRemaining;
  },
  // check if incorrect letter is already displyed otherwise render to DOM
  checkGuessedLetter: function(){
    if(snowmanGame.lettersGuessed.includes(snowmanGame.userInput)){
      return null;
    } else {
      snowmanGame.lettersGuessed.push(snowmanGame.userInput);
      guessedElement.innerText = snowmanGame.lettersGuessed;
    }
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
        // check for letters guessed
        snowmanGame.checkGuessedLetter();
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
    if(this.renderWord.indexOf('_') === -1){
      // play win music
      snowmanGame.previousWord = snowmanGame.winMessage + snowmanGame.word;
      prevElement.innerText = snowmanGame.previousWord;
      snowmanGame.wins ++;
      winElement.innerText = snowmanGame.wins;
      snowmanGame.playGame();
    }
  },
  gameLoseCheck: function(){
    if(this.triesRemaining === 0){
      // play lose music
      snowmanGame.previousWord = snowmanGame.loseMessage + snowmanGame.word;
      prevElement.innerText = snowmanGame.previousWord;
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