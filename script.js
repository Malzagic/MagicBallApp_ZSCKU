const ballImage = document.querySelector('img');
const inputText = document.querySelector('input[type=text]');
const questionArea = document.querySelector('.question-area');

// Create html elements
const createP = document.createElement('p');

// Regexp value
const questionMark = /[?]/;
const signs = /[0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;

// Changing variables
let newAnswear;

// Start checking basic input values
const checkValue = () => {
  if(inputText.value === '') {
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Odpowiedź: Zadaj pytanie!';
  } else if(!(inputText.value.match(questionMark))){
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Odpowiedź: Brak znaku zapytania!';
  } else if(inputText.value.match(signs)){
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Odpowiedź: Błędna wartość!';
  } else {
    getResponse()
  }
  ballImage.classList.remove('shake-animation');
}

// Fetch date from .json, crate callback to checking array function. If arr is true, return specific condition
async function getResponse(){
  // get data from .json
  const myRequest = new Request('data.json');
  fetch(myRequest)
  .then(response => response.json())
  .then(date => {
    const profanityArr = date.profanity;
    const professionArr = date.profession;
    const directionArr = date.direction;

    // callback
    let getAnswear = checkInput(profanityArr);
    let getAnswear2 = checkInput(directionArr);
    console.log(getAnswear);
    console.log(getAnswear2);
    // what's checking function return
    if(getAnswear2 && getAnswear == undefined) {
      createP.classList.remove('error');
      createP.classList.add('answear');
      questionArea.appendChild(createP);
      createP.textContent = `Odpowiedź: ${randomAnswear(professionArr)}`;
      inputText.value = '';
    } else if(getAnswear == true && getAnswear2 == true || getAnswear == true && getAnswear2 == undefined){
      createP.classList.remove('answear');
      createP.classList.add('error');
      questionArea.appendChild(createP);
      createP.textContent = `Odpowiedź: Nie wolno przeklinać!`;
      inputText.value = '';
    } else {
      createP.classList.remove('error');
      createP.classList.add('answear');
      questionArea.appendChild(createP);
      createP.textContent = `Odpowiedź: Nie wiem!`;
      inputText.value = '';
    }
  });
}

// Here we are checking index of arrays and find if it's somewhere in array. Then return boolean value.
const checkInput = arr => {
  let checker;
  const getValue = inputText.value.toLowerCase().replace(questionMark, '').split(' ');
  for(let i = 0; i < getValue.length; i++){
    checker = arr.indexOf(getValue[i])
    if(checker >= 0){
      return true;
    }
  }
}

// Generate random answears from array
const randomAnswear = newArr => {
  for(let x = 0; x < newArr.length; x++){
    newAnswear = Math.floor(Math.random() * newArr.length);
  }
  return newArr[newAnswear];
}

// Listener to start app and shakeball
ballImage.addEventListener('click', e => {
  ballImage.classList.add('shake-animation');
  setTimeout( () => {
    checkValue();
  }, 1000)
  e.preventDefault();
})