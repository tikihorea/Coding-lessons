function longRunningTask() {
  let count = 0;
  for (let j = 0; j < 1e9; j++) {
    count++;
  }
  console.log("long task done!");
}

function importantTask() {
  console.log("important!");
}

longRunningTask();
importantTask();
