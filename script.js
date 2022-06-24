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

const checkValue = () => {
  if(inputText.value === '') {
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Zadaj pytanie!';
  } else if(!(inputText.value.match(questionMark))){
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Brak znaku zapytania!';
  } else if(inputText.value.match(signs)){
    createP.classList.add('error');
    questionArea.appendChild(createP);
    createP.textContent = 'Błędna wartość!';
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

    // what's checking function return
    if(getAnswear2) {
      createP.classList.remove('error');
      createP.classList.add('answear');
      questionArea.appendChild(createP);
      createP.textContent = `${randomAnswear(professionArr)}`;
    } else if(getAnswear){
      createP.classList.remove('answear');
      createP.classList.add('error');
      questionArea.appendChild(createP);
      createP.textContent = `Nie wolno przeklinać!`;
    } else {
      createP.classList.remove('error');
      createP.classList.add('answear');
      questionArea.appendChild(createP);
      createP.textContent = `Nie wiem!`;
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


const randomAnswear = newArr => {
  for(let x = 0; x < newArr.length; x++){
    newAnswear = Math.floor(Math.random() * newArr.length);
  }
  return newArr[newAnswear];
}

ballImage.addEventListener('click', e => {
  ballImage.classList.add('shake-animation');
  setTimeout( () => {
    checkValue();
  }, 1000)
  e.preventDefault();
})