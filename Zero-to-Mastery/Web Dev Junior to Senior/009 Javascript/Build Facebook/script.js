var database = [
  {
    username: 'mike',
    password: '1234',
  },
  {
    username: 'sally',
    password: 'password',
  },
  {
    username: 'ingrid',
    password: '777',
  },
];

var newsfeed = [
  {
    username: 'agent1',
    timeline: 'target acquired',
  },
  {
    username: 'agent2',
    timeline: 'my back itches!',
  },
  {
    username: 'spy',
    timeline: "you'll never catch me alive",
  },
];

function isUserValid(username, password) {
  for (var i = 0; i < database.length; i++) {
    if (
      database[i].username === username &&
      database[i].password === password
    ) {
      return true;
    }
  }
  return false;
}

function signIn(username, password) {
  if (isUserValid(username, password)) {
    console.log(newsfeed);
  } else {
    alert('sorry, wrong username and/or password!');
  }
}

var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("What's your password?");

signIn(userNamePrompt, passwordPrompt);
