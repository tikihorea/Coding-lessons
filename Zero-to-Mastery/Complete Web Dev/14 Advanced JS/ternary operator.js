function isUserValid(bool) {
  return bool;
}

let answer = isUserValid(false) ? "You may enter" : "Access denied";

let automatedAnswer =
  "Your account number is " + (isUserValid(true) ? "1234" : "not available");

function condition() {
  if (isUserValid(true)) {
    return "You may enter";
  } else {
    return "Access denied";
  }
}

let answer2 = condition();

console.log(answer2);
