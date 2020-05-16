// snowman game object
let snowmanGame = {
  // list of words property 
  wordList: ['igloo', 'snowflake', 'sled', 'scarf', 'mitten', 'hail', 'olaf', 'chilly'],
  word: '',
  lettersInWord: [],
  renderWord: '',
  lettersGuessed: [],
  guessesRemaining: 0,
  totalTries: 5,
  wins: [],
  continutePlay: true,
  // selects random word from wordList and set it to word property
  selectWord: function(){
    this.word = this.wordList[ Math.floor(Math.random() * this.wordList.length) ];
  },
  // split the selected word into letters
  setLettersInWord: function(){
    this.lettersInWord = this.word.split('');
  },  
  // method that starts the game
  playGame: function(){
    this.selectWord();
    this.setLettersInWord();
  }
}