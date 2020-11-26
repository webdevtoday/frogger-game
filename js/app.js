// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -50;
    this.y = 50;
    this.speed = 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    if (this.x > 555) {
        this.speed = randomInteger(1, 10);
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), (this.x += this.speed) * dt, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 505 / 2 - 50;
    this.y = 606 - 220;
    this.leftRightStepSize = 100;
    this.upDownStepSize = 80;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
    // ctx.drawImage(Resources.get(this.sprite), this.x++ * dt, this.y);
};
Player.prototype.render = function() {
    allEnemies.forEach(enemy => {
        if (this.x + 100 >= enemy.x && this.x + 100 <= enemy.x + 170) {
            this.x = 505 / 2 - 50;
            this.y = 606 - 220;
        }
    });
    ctx.drawImage( Resources.get(this.sprite), this.x, this.y );
};
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x >= 100) this.x -= this.leftRightStepSize;
            break;
        case 'up':
            if (this.y >= 50) this.y -= this.upDownStepSize;
            break;
        case 'right':
            if (this.x <= 505 - 200) this.x += this.leftRightStepSize;
            break;
        case 'down':
            if (this.y <= 606 - 250) this.y += this.upDownStepSize;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        // 37: 'left',
        // 38: 'up',
        // 39: 'right',
        // 40: 'down'
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
