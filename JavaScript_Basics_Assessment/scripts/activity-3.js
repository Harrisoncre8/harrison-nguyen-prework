// Start off by creating an array with three student names.
let studentName = ['Jon', 'Joe', 'Jane'];

// Create a loop that will prompt the user for three more names.
for(i=0; i<3; i++){
  let newStudent = prompt('Type a name here');
  // After every user input, store the new name into the array.
  studentName.push(newStudent);
}

// Create a new loop that will iterate through the array and console log each element of the array.
for(i=0; i<1; i++){
  console.log(studentName);
}