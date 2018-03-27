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
//Modal code from https://sabe.io/tutorials/how-to-create-modal-popup-box
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

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

/*
 * Create the HTML for the cards in the deck
 */
function createCards() {
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
const ul = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let movesCounter = 0;
let stars = 3;
let match = 0;
let isfirstClick = true;
let timerID;
let isRestart = false;

function initGame() {// initializes the cards and the listeners
    createCards();
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click", function (event) {
            if (card[i] !== event.target) return;//if we don't click the card return 
            if (event.target.classList.contains("show")) return;//if the card has show class return
            if (isfirstClick) {//if its the start of the game
                timerID = setInterval(timer, 1000); // initialize the timer
                isfirstClick = false;
            }
            showCard(event.target);
            setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);//add the card to a list 
        }, false);
    }
}

function showCard(card) {
    card.classList.add('show');//add the css class show

}
/*
 * Adds the card in the test array and when there are two
 * cards, checks if the cards match or not  
 */
function addCard(card, cardHTML, testList, pos) {
    if (isRestart) {//if the game restarted empty the array
        testList.length = 0;
        isRestart = false;
    }
    testList.push(card);//the card name
    testList.push(cardHTML)//the HTML element that represents the card
    testList.push(pos);//the position of the card
    console.log(card, testList, testList.length, testList[0], cardHTML);
    if (testList.length === 6) {//when there are 2 cards in the array
        updateMoveCounter();
        testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]);//0-2 is first card, 3-5 the second
        testList.length = 0;
    }
}

function testCards(card1, html1, x1, card2, html2, x2) {
    if (card1 === card2 && x1 != x2) {//if names match in different positions
        cardsMatch(html1, html2);
    } else {
        cardsDontMatch(html1, html2);
    }
}

function cardsMatch(card1, card2) {
    card1.classList.add('match');
    card2.classList.add('match');
    match++;
    if (match === 8) {//all cards are open and matched
        win();
    }
}

function cardsDontMatch(card1, card2) {
    card1.classList.toggle('no-match');
    card2.classList.toggle('no-match');
    setTimeout(function () {//delay for closing the card for the player to notice 
        card1.classList.toggle('no-match');
        card2.classList.toggle('no-match');
        card1.classList.toggle('show');
        card2.classList.toggle('show');

    }, 300);
}

function win() {
    clearInterval(timerID);//stop the timer
    toggleModal();//open the win screen
    //add the stats to the modal
    const stats = document.querySelector(".stats");
    if (s % 60 < 10) {
        stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":0" + s % 60;
    } else {
        stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":" + s % 60;
    }
}

function updateMoveCounter() {// updates the move counter and decreases the stars in certain moves
    movesCounter++;
    moves.textContent = "Moves: " + movesCounter;
    if (movesCounter === 13) {
        let star = document.querySelector("#star3");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");
        stars--;
    } else if (movesCounter === 25) {
        let star = document.querySelector("#star2");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");
        stars--;
    } else if (movesCounter === 35) {
        let star = document.querySelector("#star1");
        star.classList.toggle("fa-star");
        star.classList.add("fa-star-o");
        stars--;
    }
}


/*
 * Timer for counting the time the player does to complete the game 
 */
let s = 0; //seconds
let m = 0; //minutes
function timer() {
    ++s;
    m = Math.floor(s / 60);
    let timer = document.querySelector(".timer");
    if (s % 60 < 10) {// checks if a second is one or two digits
        timer.textContent = "Elapsed Time: " + m + ":0" + s % 60;
    } else {
        timer.textContent = "Elapsed Time: " + m + ":" + s % 60;
    }

}

/*
 * Restart procedure - Adds a listener to the restart button
 * and resets every counter for scoring, the stars, deletes 
 * the current cards from the deck, re-shuffles the deck
 * and start the game again
 */
let restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame, false);
function restartGame() {
    clearInterval(timerID);
    movesCounter = 0;
    match = 0;
    s = 0;
    m = 0;
    isfirstClick = true;
    isRestart = true;
    const deck = document.querySelector('.deck');
    var elements = deck.getElementsByClassName("card");

    while (elements[0]) {//delete the cards
        elements[0].parentNode.removeChild(elements[0]);
    }
    shuffledCards = shuffle(cards); //re-shuffle the cards
    //reset the visual on the score table
    let timer = document.querySelector(".timer");
    timer.textContent = "Elapsed Time: 0:00";
    moves.textContent = "Moves: " + movesCounter;

    resetStars();
    initGame();// restart the game
}

function resetStars() {
    stars = 3;
    let star = document.querySelector("#star3");
    star.classList.remove("fa-star");
    star.classList.remove("fa-star-o");
    star.classList.add("fa-star");

    star = document.querySelector("#star2");
    star.classList.remove("fa-star");
    star.classList.remove("fa-star-o");
    star.classList.add("fa-star");

    star = document.querySelector("#star1");
    star.classList.remove("fa-star");
    star.classList.remove("fa-star-o");
    star.classList.add("fa-star");
}

/*
 * Restart from the modal 
 */
const newGameButton = document.querySelector(".new-game");//modal button
newGameButton.addEventListener("click", newGame);
function newGame() {
    toggleModal();//close the modal
    restartGame();
}

initGame();// start the game after everything loads







