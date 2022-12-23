
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n' )  {
    quit();
  }

  else if(text === 'hello\n' || text.split(" ")[0] === 'hello'){
    hello(text);
  }

  else if(text === 'help\n'){
    help();
  }

  else if(text === "list\n"){
    showList(text);
  }

  else if (text.split(" ")[0] === "add") {
    add(text);
  }

  else if (text === "remove\n"){
  removeLastTask();
  }

  else if(text === "remove 1\n"){
  removeFirstTask()
  }

  else if(text === "remove 2\n"){
  removeSecondTask();
  }

  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(data){
  if(data === 'hello\n') {
    console.log("Hello!")
    return
  }
  data = data.replace('\n', '').trim();
  let allWords = data.split(' ');

  if (allWords[0] === 'hello') {
    let userName = allWords.slice(1).join(' ');
    console.log(`Hello ${userName}!` );
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();


}
/**
 * lists all the possible commands
 */

function help(){
  console.log('exit, quit, hello, hello')
}

let list = ["task1", "task2"];

function showList(text) {
  if(list.length === 0){
    console.log("There is no tasks to do");
  }
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}- [] ${list[i]}`);
  }
}
function add(text) {
  text = text.replace('\n', '').trim();
  const words = text.split(' ');
  if (words[0] === 'add') {
    const argument = words.slice(1).join(' ');
    list.push(argument);
  }
}


/**
 * Remove last task
 * * @returns {void}
 */
 function removeLastTask(){
  list.pop();
}

/**
 * Remove first task
 *
 * @returns {void}
 */
function removeFirstTask(){
  list.shift();
}

/**
 * Remove second task
 *
 * @returns {void}
 */
function removeSecondTask(){
  list.splice(1,1);
}


// The following line starts the application
startApp("Jad Rifaii")
