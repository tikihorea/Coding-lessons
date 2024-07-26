var database = [
  {
    username: "1",
    password: "1",
  },
];

var newsFeed = [
  {
    username: "Bobby",
    timeline: "So tired from all that learning!",
  },
  {
    username: "Sally",
    timeline: "Javascript is so cool!",
  },
  {
    username: "Mitch",
    timeline: "Javascript is pretty cool!",
  },
];

var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("What's your password?");

function signIn(user, pass) {
  if (user === database[0].username && pass === database[0].password) {
    console.log(newsFeed);
  } else {
    alert("wrong username and password");
  }
}

signIn(userNamePrompt, passwordPrompt);
