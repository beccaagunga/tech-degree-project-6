// Variables
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGameBtn = document.querySelector('.btn__reset');
const ul = document.querySelector('#phrase ul');
const letters = document.getElementsByClassName('letter');
const space = document.getElementsByClassName('space');
const buttons = document.getElementsByTagName('button');
const title = document.querySelector('.title');
const heart = document.getElementsByTagName('img');
const shownLetters = document.getElementsByClassName('show');
let missed = 0;

// Hide overlay div to show game
startGameBtn.addEventListener("click", () => {
  const toggle = document.getElementById('overlay');
  if (toggle.style.display === "none") {
    toggle.style.display = "block";
  } else {
    toggle.style.display = "none";
  }
});

// Array of phrases
let phrases = [
  'Today was a good day',
  'Cash rules everything around me',
  'Fight the power',
  'The world is yours',
  'New York state of mind'
];


// Randomly choose a phrase from the phrases array, split phrase into new array of characters, return the new character array.
function getRandomPhraseArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)].toLowerCase();
  const words = randomPhrase.split('');
  return words;
}

// Do stuff to any arr that is passed in, and add to `#phrase ul`
function addPhraseToDisplay(arr) {
  for (i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    ul.appendChild(li);
    if (arr[i] != ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
}

const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

// Get all elements with class of 'letter'
function checkLetter(buttons) {
  let check = false;
// Loop over the letters and check if they match the letter in the button the player has chosen.
  for (i = 0; i < letters.length; i+=1) {
//If match, add the “show” class to the list item containing that letter,
    if (buttons.textContent === letters[i].textContent.toLowerCase()) {
      check = true;
      letters[i].classList.add('show');
    }
  }
// Store the matching letter inside of a variable, and return that letter.
  return check;
}

// Each time the player guesses a letter, this function will check whether the game has been won or lost.
function checkWin() {
  const show = document.querySelectorAll('.show');
    if (missed === 5) {
      overlay.style.display = '';
      overlay.className = '';
      overlay.classList.add('lose');
      title.innerHTML= 'You lost! Try again?';
      overlay.style.backgroundColor = 'maroon';
      startGameBtn.textContent = 'Try Again';
    } else if (show.length === letters.length) {
      overlay.style.display = '';
      overlay.className = '';
      overlay.classList.add('win');
      title.innerHTML= 'You won! Play Again?';
      startGameBtn.textContent = 'Play Again';
        }
    }


//  When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice.
keyboard.addEventListener('click', (event) => {
const letterFound = checkLetter(event.target);
  if (event.target.tagName === 'BUTTON') {
      event.target.className = 'chosen';
      event.target.disabled = true;

    }
// Remove a heart for wrong click
    if (letterFound === false && missed < 5) {
      heart[missed].setAttribute('src', 'images/lostHeart.png');
   			missed++;
      }
// Reload game from 'win' or 'loss' screen
      startGameBtn.addEventListener('click', () => {
        if (startGameBtn.innerHTML === 'Play Again' || 'Try Again') {
            location.reload();
          }
});
    checkWin();
});
