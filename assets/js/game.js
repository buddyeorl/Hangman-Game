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
      if (countChar(currentString, compKeystroke) == 0)
      {
      if(tries.indexOf(compKeystroke) == -1)
      {
         tries[tries.length]= compKeystroke;
      } 
      }
    document.getElementById("unguessed").innerHTML = unguessedString;
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
  setTimeout(createHangmanWord, 3000); // will wait 3 seconds until next word is displayed, also will delete the "isWin" tag                                     // create a new word
  tries = []; //reset Tries
}

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
  firstGame = false;
  document.getElementById("isWin").innerHTML = "";
  createHangmanWord();
  document.getElementById("unguessed").innerHTML = unguessedString;
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
      document.getElementById("unguessed").innerHTML = unguessedString;
    }
  }
//===============================================================
 





  console.log("Tries : " + tries);
  console.log("Wins : " + wins);
  console.log("Loses : " + loses);
  document.getElementById("user").innerHTML = "User choice: " + choice;
  document.getElementById("tries").innerHTML = "Tries : " + tries;
	document.getElementById("wins").innerHTML = "Wins : " + wins;


}
