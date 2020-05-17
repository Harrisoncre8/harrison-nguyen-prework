// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');
let guessedElement = document.querySelector('#lettersGuessed');

// snowman game object
let snowmanGame = {
  // list of words property, must be uppercase
  wordList: ['IGLOO', 'SNOWFLAKE', 'SLED', 'SCRAF', 'MITTEN', 'HAIL', 'OLAF', 'CHILLY'],
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
  // amount of tries the user has attempted 
  triesRemaining: 10,
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
  initialRenderWord: function(){
    for (let i= 0; i<this.letterOfWord.length; i++) { 
      this.renderWord = this.renderWord + '_'
    }
    // render initial underscore word
    wordElement.innerText = this.renderWord;
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
      if(guessIndex !== -1){
        snowmanGame.letterOfWord.splice(guessIndex, 1);
        // get the index of the correct letter
        let index = snowmanGame.word.indexOf(snowmanGame.userInput);
        // call method to update the word on the DOM
        snowmanGame.updateRenderWord(index, snowmanGame.word, snowmanGame.renderWord);
      } 
      // if letter already guessed, it shouldn't count? 
      // else if(guessIndex === -1) {
      //   snowmanGame.triesRemaining --;
      //   console.log(snowmanGame.triesRemaining);
      // }
    }
  },
  // method that starts the game
  playGame: function(){
    snowmanGame.selectWord();
    snowmanGame.splitWord();
    snowmanGame.initialRenderWord();
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