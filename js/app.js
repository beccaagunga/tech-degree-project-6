// Variables
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGameBtn = document.querySelector('.btn__reset');
const ul = document.querySelector('#phrase ul');
const letters = document.getElementsByClassName('letter');
const space = document.getElementsByClassName('space');
const buttons = document.getElementsByTagName('button');
let missed = 0;

// Hide overlay div
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

// Do stuff any arr that is passed in, and add to `#phrase ul`
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
//If match, add the “show” class to the list item containing that letter,
// Store the matching letter inside of a variable, and return that letter.
  for (i = 0; i < letters.length; i+=1) {
    if (buttons.textContent === letters[i].textContent.toLowerCase()) {
      check = true;
      letters[i].classList.add('show');

    }
  }
  return check;
}

//  When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice.
keyboard.addEventListener('click', (event) => {
  const letterFound = checkLetter(event.target);
  if (event.target.tagName === 'button') {
      event.target.classList.add('chosen');
      event.target.disabled = true;
    }

});
