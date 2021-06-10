var firstNumber = prompt('What is the first number?');
var secondNumber = prompt('What is the second number?');
var sum = Number(firstNumber) + Number(secondNumber);
var diff = Number(firstNumber) - Number(secondNumber);
var mult = Number(firstNumber) * Number(secondNumber);
var div = Number(firstNumber) / Number(secondNumber);
alert(
	'The following are results for the four most common operations for the number you input.\r\n' +
		' Sum: ' +
		sum +
		'\r\n' +
		' Difference: ' +
		diff +
		'\r\n' +
		' Multiplication: ' +
		mult +
		'\r\n' +
		' Division: ' +
		div
);
// alert(sum + ', ' + diff + ', ' + mult + ', ' + div);
