const fragment = document.createDocumentFragment();
const container = document.querySelector(".container");

let twoCards = [];
let numberOfMoves = 0;
let min = 0;
let sec = 0;

//create an array to hold eight pairs of images
let imageStack = [
{
  'name': 'email',
  'img': 'img/email.png',
},
{
  'name': 'email',
  'img': 'img/email.png',
},
{
  'name': 'app',
  'img': 'img/app.png',
},
{
  'name': 'app',
  'img': 'img/app.png',
},
{
  'name': 'coding',
  'img': 'img/coding.png',
},
{
  'name': 'coding',
  'img': 'img/coding.png',
},
{
  'name': 'calendar',
  'img': 'img/calendar.png',
},
{
  'name': 'calendar',
  'img': 'img/calendar.png',
},
{  'name': 'chart',
  'img': 'img/chart.png',
},
{
  'name': 'chart',
  'img': 'img/chart.png',
},
{
  'name': 'counter',
  'img': 'img/counter.png',
},
{
  'name': 'counter',
  'img': 'img/counter.png',
},
{
  'name': 'laptop',
  'img': 'img/laptop.png',
},
{
  'name': 'laptop',
  'img': 'img/laptop.png',
},
{
  'name': 'message',
  'img': 'img/message.png',
},
{
  'name': 'message',
  'img': 'img/message.png',
}];

//Use the Fisher–Yates shuffle to generate a random sequence for an array
function shuffle (array){
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0!==currentIndex){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue=array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex]=temporaryValue;
  }
  return array;
}

function startGame(){
  // randomize the imageStack array with the shuffle function
  imageStack = shuffle(imageStack);
  //construct the div and img elements
  for (let i = 0; i <16; i++){
    const newCard = document.createElement("div");
    const newImage = document.createElement("img");
    newCard.classList.add('card');
    newImage.classList.add('cardImage');
    //assign the randomized images to cardImage
    newImage.dataset.name = imageStack[i].name;
    newImage.src = imageStack[i].img;
    //append cardImage img to card div
    newCard.appendChild(newImage);
    //append card div to fragment
    fragment.appendChild(newCard);
    }
  //append fragment to container
  container.appendChild(fragment);
}

//start the game when the body element is loaded
document.body.onload = startGame();

//add event listeners to each card
let cardArray = document.querySelectorAll('.cardImage');
for (i=0; i<cardArray.length; i++){
  cardArray[i].addEventListener('click',openCard);
}

function openCard (){
  //turn the cards over by adding showImage class to opened cards
  this.classList.add('showImage');
  //add opened cards to the twoCards array
  twoCards.push(this);
  //checked if the two cards in twoCards array are a match
  if (twoCards.length === 2){
    //disable click after two cards are opened
    document.querySelector('.container').classList.add('disableClick');
    if (twoCards[0].dataset.name === twoCards[1].dataset.name){
      cardsMatched();
    }
    else {
      cardsNotMatched ();
    }
  }
}

//if the two cards in the twoCards array are a match...
function cardsMatched(){
  twoCards[0].parentElement.classList.add('rightMatch');
  twoCards[1].parentElement.classList.add('rightMatch');
  twoCards[0].parentElement.classList.add('rightMatch-animation');
  twoCards[1].parentElement.classList.add('rightMatch-animation');
  //increase the number of moves by 1
  numberOfMoves++;
  moveCount();
  //stop animation, and allow board to be clickable after 0.75 seconds
  setTimeout (function(){
    twoCards[0].parentElement.classList.remove('rightMatch-animation');
    twoCards[1].parentElement.classList.remove('rightMatch-animation');
    twoCards[1].parentElement.parentElement.classList.remove('disableClick');
    twoCards=[];
  },0750);
}

//if the two cards in the twoCards array are not a match...
function cardsNotMatched(){
  twoCards[0].parentElement.classList.add('wrongMatch');
  twoCards[1].parentElement.classList.add('wrongMatch');
  //increase the number of moves by 1
  numberOfMoves++;
  moveCount();
  //close the cards by removing the showImage class, stop animation, and allow board to be clickable after 0.75 seconds
  setTimeout (function(){
    twoCards[0].classList.remove('showImage');
    twoCards[1].classList.remove('showImage');
    twoCards[1].parentElement.parentElement.classList.remove('disableClick');
    twoCards[0].parentElement.classList.remove('wrongMatch');
    twoCards[1].parentElement.classList.remove('wrongMatch');
    twoCards=[];
  },0750);
}

function moveCount(){
  //show the number of moves in counter
  document.getElementById('counter').innerHTML = numberOfMoves + ' moves';
  //start timer
  if (numberOfMoves == 1){
    timerStart = setInterval(timer,1000);
  }
  starRating();
  setTimeout(winGame,0750);
}

function timer(){
    sec++;
    /*if (sec<10){
      sec = '0'+sec;
    }*/
    if (sec>60){
      sec = 0;
      sec = '0'+sec;
      min++;
      /*if (min<10){
        //min = '0'+min;
      }*/
    }
    //show the time taken
    document.getElementById('timer').innerHTML = min + ' minutes ' + sec + ' seconds ';
}

function starRating(){
  let star = document.getElementById('stars-full')
  if (numberOfMoves>12){
    star.innerHTML = '&starf;&starf;&starf;&starf;&star;';
  }
  if (numberOfMoves>16){
    star.innerHTML = '&starf;&starf;&starf;&star;&star;';
  }
  if (numberOfMoves>20){
    star.innerHTML = '&starf;&starf;&star;&star;&star;';
  }
  if (numberOfMoves>24){
    star.innerHTML = '&starf;&star;&star;&star;&star;';
  }
  if (numberOfMoves>28){
    star.innerHTML = '&star;&star;&star;&star;&star;';
  }
}

function winGame(){
  let numberOfRightMoves = document.getElementsByClassName('rightMatch');
  let numberOfStars = document.getElementById('stars-full').innerHTML;
  let numberofStarsLeft = (numberOfStars.match(/★/g)|| []).length;
  //launch congraluations modal after there are 16 right matches
  if (numberOfRightMoves.length == 16){
    document.querySelector('.modal').style.display = 'block';
    document.getElementById('completed-moves').innerHTML = 'You completed the game with ' + numberOfMoves + ' moves, and '+ numberofStarsLeft + ' stars!';
    document.getElementById('completed-time').innerHTML = 'You took ' + min + ' minutes ' + sec + ' seconds';//
    clearInterval(timerStart);
  }
}

function resetGame(){
  document.location.reload(true)
}
