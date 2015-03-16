var prompt = require('sync-prompt').prompt
var colors = require('colors')


var player = {
	money: 100,
	bet: 0,
	guess: 0
}
var error = "You need to check your bet and guess..."
var gameOver = "Game Over...";
var win = "Congrats! You win";
var close = "So close! You can keep your money...this time.";
var lose = "You could not be more wrong... You could try but you would not be successful.";

var game = {
	start: function(){
		player.bet = game.getBet(prompt("How much would you like to bet? "));
		player.guess = game.getGuess(prompt("What is your guess? "));

		if (player.bet != false && player.guess != false) {
			var answer = Math.ceil(Math.random() * 10);
			console.log("You guessed " + player.guess + " and the answer was " + answer);
			game.checkGuess(player.guess, answer, player.bet);
			console.log("You have $" + player.money);

			if (player.money < 5){
				console.log(gameOver.red.bgBlack);
				// $('#restart').addClass('.active')
			} else { 
			game.start();
			}
		} else {
			console.log(error);
			game.start();
		};
	},

	checkGuess: function(guess, answer, bet){
		if (guess === answer){
			console.log(win.green);
			console.log(player.money += player.bet);
		} else if (guess === answer + 1 || guess == answer - 1){
			console.log(close.yellow);
		} else {
			console.log(lose.red);
			console.log(player.money -= player.bet);
		};
	},

	getBet: function(bet) {
		var amount = parseInt(bet, 10) || 0;
		if (amount < 5 || amount > 10 || amount > player.money){
			return false;
		} else {
			return amount;
		};
	},

	getGuess: function(number) {
		var guess = parseInt(number, 10);
		if (guess < 1 || guess > 10){
			return false;
		}	else {
			return guess;
		};
	}

};
console.log("Welcome to the betting game!");
console.log("You have $" + player.money)
game.start();