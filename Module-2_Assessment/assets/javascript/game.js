// global variables
let gameElement = document.querySelector('#gamePage');
let wordElement = document.querySelector('#currentWord');

// snowman game object
let snowmanGame = {
  // list of words property 
  wordList: ['igloo', 'snowflake', 'sled', 'scarf', 'mitten', 'hail', 'olaf', 'chilly'],
  word: '',
  lettersInWord: [],
  renderWord: '',
  lettersGuessed: [],
  guessesRemaining: 0,
  // amount of guesses the user has to solve the word
  totalTries: 8,
  wins: 0,
  continutePlay: true,
  // selects random word from wordList and set it to word property
  selectWord: function(){
    this.word = this.wordList[ Math.floor(Math.random() * this.wordList.length) ];
  },
  // display underscores based on word length, 
  // map through array of letters and display letter or underscore based on guess
  setupRenderWord: function(){
    this.renderWord = this.word.split('').map(
      letter => (this.lettersGuessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');

      wordElement.innerText = this.renderWord;
  },
  //
  // method that starts the game
  playGame: function(){
    snowmanGame.selectWord();
    snowmanGame.setupRenderWord();

    // while loop running while playGame is called
    // while( this.renderWord !== this.word){

    // }
  }
}

function changeDOM (){
  wordElement.innerText = snowmanGame.renderWord;
}

gameElement.addEventListener('keypress', snowmanGame.playGame);
