// Grab a user input using a prompt() and store it in a variable.
let userInput = prompt('Insert user input here');

// Add a conditional statement where if the variable's length is greater than 4, 
// we alert the user that their name is greater than four characters.
// Otherwise, alert that their name is less than four characters.
if(userInput.length > 4){
  alert('Your name is greater than 4 characters')
} else {
  alert('Your name is less than 4 characters')
}
