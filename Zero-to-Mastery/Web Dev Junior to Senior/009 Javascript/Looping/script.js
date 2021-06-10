var todos = ['clean room', 'brush teeth', 'exercise', 'study', 'eat healthy'];
var todosImportant = [
  'clean room!',
  'brush teeth!',
  'exercise!',
  'study!',
  'eat healthy!',
];
// for (var i = 0; i < todos.length; i++) {
//   todos[i] = todos[i] + '!';
// }

var todosLength = todos.length;

// for (var i = 0; i < todosLength; i++) {
//   todos.pop();
// }

// for (var i = 0; i < todosLength; i++) {
//   console.log(todos[i], i);
// }

function logTodos(todo, i) {
  console.log(todo, i);
}

todos.forEach(logTodos);
todosImportant.forEach(logTodos);

// A while loop first checks if the conditions are met, then does the thing you tell it to.

// var counterOne = 10;
// while (counterOne > 0) {
//   console.log(counterOne);
//   counterOne--;
// }

// A do while loop first does the thing, then checks. If the conditions are not met, you only get the first "done" thing, but then the program stops.

// var counterTwo = 10;
// do {
//   console.log(counterTwo);
//   counterTwo--;
// } while (counterTwo > 0);
