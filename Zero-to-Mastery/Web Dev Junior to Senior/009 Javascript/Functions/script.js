function multiply(a, b) {
  if (a > 10 || b > 10) {
    return "that's too hard!";
  } else {
    return a * b;
  }
}
console.log(multiply(5, 10));
