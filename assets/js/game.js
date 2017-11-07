var tries = [];
var wins = 0;
var loses = 0;
var validChars =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z",1,2,3,4,5,6,7,8,9,0];
var unguessedString = ["text"]; // this array will create the "__" word placer
var currentString = ""; // current string being played
var counterObject;
var firstGame = true; //firstGame will prevent the script from updating 'tries' variable and update page on first game

//====================Random Value Picker inside Object===========================//

function randomObjectPicker()
{
  var ranPicker = Math.floor( Math.random() * Object.values(themes)[0].length);
  console.log("random number generated " + ranPicker);
  console.log("random word generated " + Object.values(themes)[0][ranPicker]);
  currentString = Object.values(themes)[0][ranPicker]; // the zero means the index 0 in the object i created, I will update this to pick different properties in the object
  currentString = currentString.toLowerCase();
  return Object.values(themes)[0][ranPicker];
}


//CHECK STRING SIZE AND CREATE "_" FOR EVERY CHARACTER //
  function createHangmanWord()
  {
    document.getElementById("isWin").innerHTML = "";
    unguessedString = [];
    var locWord = randomObjectPicker();
    for (i=0;i<locWord.length;i++)
    {
      if (locWord.charAt(i)== ' ')
      {
      unguessedString[i] = "\xa0"; // This will add a space between words
      } else
      { 
      unguessedString[i] = "_"; 
      }
    }

  firstGame = false;
  keystrokes();
 
  }




//====================CHAR COUNTER===========================//
// ==========================================================//
function countChar(string1,charCheck)
{
  var counter1 = 0;
  for (i=0; i<string1.length; i++)  
  {
    if(string1.charAt(i) == charCheck)
    {
      counter1++;
    }
  }
return counter1
}


// this function will check the keystrokes

function keystrokes(compKeystroke)
{
  for (i=0;i<currentString.length;i++)
    {
      if (currentString.charAt(i)== compKeystroke)
      {
      console.log(unguessedString);
      unguessedString[i] = compKeystroke; // This will add a space between words
      console.log(unguessedString[1] + "changed");
      } 
      if (currentString.charAt(i)== " ")
      {
        unguessedString[i] = " ";   // with this line the user doesn't need to type spaces for two word games.
      } 
    }
      if (compKeystroke != undefined) // will prevent "tries" to have undefined characters due to the function skipping controls. 
      {
        if (countChar(currentString, compKeystroke) == 0) // this line will check if the keystroke is in the current string, if not will add it to "tries"
        {
        if(tries.indexOf(compKeystroke) == -1)
        {
            tries[tries.length]= compKeystroke;
        } 
        }
      }
    printSingleCharacter("unguessed", unguessedString); // Refresh Unguessed string to the html document
    gameWin(); //check isWin
}

//CHECK IF THE USER GUESSED THE WORD CORRECTLY

function gameWin()
{
  var winChecker="";
for (var i=0;i<unguessedString.length;i++)
{
  winChecker=winChecker + unguessedString[i];
}
if (winChecker ==currentString)
{
  console.log("You Win" + winChecker + currentString);
  document.getElementById("isWin").innerHTML = "YOU WIN";
  wins++;
  setTimeout(createHangmanWord, 3000); // will wait 3 seconds until next word is displayed, also will delete the "isWin" tag
                                      // create a new word
  tries = []; //reset Tries
}
if (tries.length > 5) // check if Player has 5 tries, in which case loses
{
  console.log("You LOSE" + winChecker + currentString);
  document.getElementById("isWin").innerHTML = "YOU LOSE!!! the  word was: " +  currentString;
  document.getElementById("loses").innerHTML = "Loses : " + loses;
  loses++;
  firstGame = true;
  setTimeout(createHangmanWord, 3000); // will wait 3 seconds until next word is displayed, also will delete the "isWin" tag                                     // create a new word
  tries = []; //reset Tries
}

}
 
//====================================================================//
// this function will create a class to print the unguessed string character by character, it will help scalate design // printing character as buttons

function printSingleCharacter(idToChange ,stringToRun)
{
  var stringToBeDisplayed="";
  for (var i=0; i<stringToRun.length;i++)
  {  
    console.log('reading inside the for string char is' + stringToRun[i] + "end");
    if (stringToRun[i] === ' ') // this line will add three blank spaces when there is a multiword string
    {
      console.log("reading iside the string");
      //stringToBeDisplayed= stringToBeDisplayed + "\xa0\xa0\xa0"; // IN CASE I WANT THREE SPACES TO BE DISPLAYED INSTEAD OF BUTTONS 
      stringToBeDisplayed = stringToBeDisplayed + "<button type=" +'"button"'+ "class=" +'"btn btn-secondary">' + "\xa0" +"</button>"; // THIS IS AMAZING, IT WILL ADD A GROUP BUTTON WITH THE STRING CHAR    
    } else
    { 
      //stringToBeDisplayed= stringToBeDisplayed + " " +unguessedString[i] ; // IN CASE I JUST WANT "_" TO BE DISPLAYED
      stringToBeDisplayed = stringToBeDisplayed + "<button type=" +'"button"'+ "class=" +'"btn btn-warning">' + stringToRun[i].toUpperCase() +"</button>"; // THIS IS AMAZING, IT WILL ADD A GROUP BUTTON WITH THE STRING CHAR
    }
  }

document.getElementById(idToChange).innerHTML = stringToBeDisplayed;
} 


//====================================================================//
//====================================================================//
document.onkeyup = function(event) {
var choice = event.key;
var options = ["r","s","p"];
var choice2 = options[Math.floor(Math.random()*options.length)];

console.log("User choice: " + choice);

  if (choice == "`") //RESET THE GAME CURRENT WORDS, INCREASE LOSES BY 1
  {

  document.getElementById("isWin").innerHTML = "";
  createHangmanWord();
  firstGame = false;
  printSingleCharacter("unguessed",unguessedString); // Refresh Unguessed string to the html document
  document.getElementById("loses").innerHTML = "Loses : " + loses;
    console.log("Computer Wins");
    loses++;
  }

// this will check if the entry is in alphanumeric lowercase

  for (var i=0; i< validChars.length;i++)
  {
    if (validChars[i] == choice.toLowerCase() && firstGame === false)
    {
      keystrokes(choice);
      printSingleCharacter("unguessed",unguessedString); // Refresh Unguessed string to the html document
    }
  }
//===============================================================
 





  console.log("Tries : " + tries);
  console.log("Wins : " + wins);
  console.log("Loses : " + loses);
  document.getElementById("user").innerHTML = "User choice: " + choice;
  // document.getElementById("tries").innerHTML = "Tries : " + tries; // this line was only printing the tries to the button created. might use in the future
  printSingleCharacter("tries", tries);
	document.getElementById("wins").innerHTML = "Wins : " + wins;


}
