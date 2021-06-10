var age = prompt('What is your age?');

if (Number(age) < 18) {
  alert('Sorry, you are too young to drive this car. Powering off');
} else if (Number(age) > 18) {
  alert('Powering On. Enjoy the ride!');
} else if (Number(age) === 18) {
  alert('Congratulations on your first year of driving. Enjoy the ride!');
}
// https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052#:~:text=Function%20Expression%20VS.&text=Declarations%20are%20loaded%20before%20any%20code%20can%20run.&text=Function%20declarations%20load%20before%20any,the%20top%20of%20other%20code.

//1. Make the above code have a function called checkDriverAge(). Whenever you call this function, you will get prompted for age. Use Function Declaration to create this function.
function checkDriverAge() {
  var age = prompt('What is your age?');

  if (Number(age) < 18) {
    alert('Sorry, you are too young to drive this car. Powering off');
  } else if (Number(age) > 18) {
    alert('Powering On. Enjoy the ride!');
  } else if (Number(age) === 18) {
    alert('Congratulations on your first year of driving. Enjoy the ride!');
  }
}

//2. Create another function that does the same thing, assign it to checkDriverAge2 variable using Function Expression.
var checkDriverAge2 = function () {
  var age = prompt('What is your age?');
  if (Number(age) < 18) {
    alert('Sorry, you are too young to drive this car. Powering off');
  } else if (Number(age) > 18) {
    alert('Powering On. Enjoy the ride!');
  } else if (Number(age) === 18) {
    alert('Congratulations on your first year of driving. Enjoy the ride!');
  }
};
