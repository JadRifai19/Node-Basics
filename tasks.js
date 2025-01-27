
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

  else if (text.split(" ")[0] === "remove" || text === "remove\n") {
    removeTask(text);
  }

  else if (text.split(" ")[0] === "edit" || text === "edit\n") {
    editTask(text);
  }

  else if (text.split(" ")[0] === "check" || text === "check\n") {
    checkList(text);
  }
  
  else if (text.split(" ")[0] === "uncheck" || text === "uncheck\n") {
    uncheckList(text);
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
  console.log('exit, quit, hello, hello, list, add, remove, edit')
}

let list = [];

let listObject = {
  list_description: "",
  done: false
}

function showList() {
  if(list.length === 0){
    console.log("There is no tasks to do");
  }
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}- ${list[i]}`);
  }
}
function add(text) {
  text = text.replace('\n', '').trim();
  const words = text.split(' ');
  if (words[0] === 'add') {
    const argument = words.slice(1).join(' ');
    list.push(`[ ] ${argument}`);
  }
}


/**
 * Remove tasks
 * 
 * @returns {void}
 */
 function removeTask(text){
  if(text === "remove/n"){
    list.pop
    return
}

text = text.replace('\n', '').trim();
  const words = text.split(' ');
  if (words[0] === 'remove') {
    const a = words.slice(1).join(' ');
    list.splice(`${a - 1}`, 1);
    if (a > list.length) {
      console.log("You enter a number does not exist");
    } else {
      list.splice(`${a[0] - 1}`, 1);
    }
  }
}

/**
 * Remove tasksj
 *
 * @returns {void}
 */
 function editTask(text) {
  if (text === "edit\n") {
    console.log("error! which one do you want to edit!");
    return
  }
  text = text.replace('\n', '').trim();
  const words = text.split(' ');
  if (words[0] === 'edit') {
    const a = words.slice(1).join(' ');
    if (a[0] > list.length) {
      console.log("You enter a number does not exist")
    } else if (typeof parseInt(a[0]) === "number" && a[1] === " ") {
      list.splice(`${a[0] - 1}`, 1, a.slice(2));
    } else if (typeof a[0] === "string") {
      list.splice(-1, 1, a)
    }
  }
}

/**
 * Cehck a list
 *
 * @returns {void}
 */
 function checkList(text) {
  if (text === "check\n") {
    console.log("Which one you want to check it!")
    return
  }
  text = text.replace('\n', '').trim()
  const words = text.split(" ")
  if (words[0] === "check") {
    const a = words.slice(1).join(' ')
    if (a[0] > list.length) {
      console.log("You enter a number does exist")
    } else {
      list.splice(`${a[0] - 1}`, 1, `[✓]${list[a - 1].slice(3)}`)
      // list.replace(list[4], "✓")
    }
  }
}

/**
 * uncehck a list
 *
 * @returns {void}
 */
 function uncheckList(text) {
  if (text === "uncheck\n") {
    console.log("Which one you want to uncheck it!")
    return
  }
  text = text.replace('\n', '').trim();
  const words = text.split(' ');
  if (words[0] === "uncheck") {
    const a = words.slice(1).join(' ')
    if (a[0] > list.length) {
      console.log("You enter a number not exist")
    } else {
      list.splice(`${a[0] - 1}`, 1, `[ ]${list[a - 1].slice(3)}`)
    }
  }
}


// The following line starts the application
startApp("Jad Rifaii")
