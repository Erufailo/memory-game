// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Create a list that holds all of your cards
 */
let cardTest = [];
let cards = ["diamond", "diamond", "plane", "plane", "anchor", "anchor", "bolt", "bolt", "leaf", "leaf"
    , "bicycle", "bicycle", "cube", "cube", "bomb", "bomb"];
console.log(cards);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffledCards = shuffle(cards);
console.log(shuffledCards);

for (let card of shuffledCards) {
    const li = document.createElement("LI");
    li.classList.toggle("card");
    const i = document.createElement("i");
    i.classList.toggle("fa");
    if (card === "plane") {
        i.classList.toggle("fa-paper-plane-o");
    } else {
        i.classList.toggle("fa-" + card);
    }
    const deck = document.querySelector('.deck');
    li.appendChild(i);
    deck.appendChild(li);

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let cardObject = {
    name: "",
    clickable: false,
    HTML: ""

};

let cardsArray = []
const card = document.querySelectorAll('.card');
const ul = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let movesCounter = 0;
let match = 0;
let isfirstClick = true;

function updateMoveCounter() {
    movesCounter++;
    moves.textContent = "Moves: " + movesCounter;
    if (movesCounter === 13) {
        let star = document.querySelector("#star3");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");
    } else if (movesCounter === 25) {
        let star = document.querySelector("#star2");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");

    } else if (movesCounter === 35) {
        let star = document.querySelector("#star1");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");
    }
}
console.log(card);
let timerID;
function initListeners() {
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click", function (event) {
            if (card[i] !== event.target) return;
            if (event.target.classList.contains("show")) return;
            if (isfirstClick) {
                timerID = setInterval(timer , 1000);
                isfirstClick = false;
            }
            showCard(event.target);
            setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
        }, false);
    }
}
function showCard(card) {
    card.classList.add('show');

}
function addCard(card, cardHTML, testList, x) {
    testList.push(card);
    testList.push(cardHTML)
    testList.push(x);
    console.log(card, testList, testList.length, testList[0], cardHTML);
    if (testList.length === 6) {
        testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]);
        testList.length = 0;
        updateMoveCounter();
    }
}
function testCards(card1, html1, x1, card2, html2, x2) {
    if (card1 === card2 && x1 != x2) {
        html1.classList.add('match');
        html2.classList.add('match');
        match++;
        if (match === 8) {
            clearInterval(timerID);
            alert("You won");
            
        }

    } else {
        setTimeout(function () {
            html1.classList.toggle('no-match');
            html2.classList.toggle('no-match');
            html1.classList.toggle('show');
            html2.classList.toggle('show');

        }, 300);
        html1.classList.toggle('no-match');
        html2.classList.toggle('no-match');


    }
    return false;
}
let s=0;
let m=0;
function timer(){
    ++s;
    m=Math.floor( s / 60);
    let timer = document.querySelector(".timer");
    if(s%60<10){
        timer.textContent= "Elapsed Time: "+m +":0"+s%60; 
    }else{
        timer.textContent= "Elapsed Time: "+m +":"+s%60; 
    }
    
}
initListeners();







