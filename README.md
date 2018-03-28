# Card Matching Game

A memory game for the needs of the Google Front-End Web Dev Nanodegree at Udacity.
A full working demo is [here](https://codepen.io/JohnRin/full/pLJMoy/).

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

## Game Mechanics

When the game starts it shuffles the cards and renders them in the play area. When you first click a card the game starts.
Along with the game, a timer starts to measure your time you take to complete the game. Every pair of cards consists of 1 move.
The stars, start as 3 and are decreased as the moves goes up in certain points. A restart button is on the top right corner so you
can restart the game along with the scoring system. If two cards are face-up, the game checks if they match or not. If they match they
lock in an open position and painted green, if the don't they painted red and flip down. The game ends when all cards are found their matches
and turned green. Then a popup appears congratulating the player and informing of his scoring(time, moves, stars) with the option to play again.

## Playability

The game is playable by all devices with a modern internet browser. Although in smartphones, playing in portrait orientation is recommended for a better experience.

## Future improvements

These are some ideas I want to implement in the near future.

* Better animations in cards.
* Save/Load state with local storage
* Leaderboard System
* Difficulty system