// Sets an initial player score of 0.
var score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    

    this.getPositionX = function() {
        return this.x;
    }
    this.getPositionY = function() {
        return this.y;
    }
       
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    this.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < 505) {
            this.x += (150 * dt);
        }
        else {
            this.x = -90;
        }    
        console.log(player.getPositionX());
        // If the enemy and the player collide.
        if(this.x < player.getPositionX() + 30 && this.x + 60 > player.getPositionX() && this.y < player.getPositionY() + 60 && this.y + 40 > player.getPositionY()) {
            score = 0;
            document.getElementById('playerScore').innerHTML = score;
            player.reset();
        }
    };

    // Draw the enemy on the screen, required method for game
    this.render = function() {
        ctx.drawImage(Resources.get(sprite), this.x, this.y);
    };

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    
    var sprite = 'images/char-boy.png';
    var position = {x : 200, y : 300};

    this.getPositionX = function() {
        return position.x;
    };

    this.getPositionY = function() {
        return position.y;
    }

    this.setPosition = function(x, y) {
        position.x = x;
        position.y = y;
    }

    // Is called every time the player position is updated
    this.update = function() {
    
        // If the player reaches the water
        if (position.y < 20) {
        score++;
        document.getElementById('playerScore').innerHTML = score;
        this.reset();
    }
    };

    this.render = function() {
        ctx.drawImage(Resources.get(sprite), position.x, position.y);
    };

    this.handleInput = function(direction) {
        if(direction == 'left' && position.x > 0) {
            position.x -= 50;
        }
        if(direction == 'right' && position.x < 400) {
            position.x += 50;
        }
        if(direction == 'up' && position.y > 3) {
            position.y -= 50;
        }
        if(direction == 'down' && position.y < 400) {
            position.y += 50;
        }
    };

    // Is called when the player is reset to the starting point
    this.reset = function() {
        this.setPosition(200, 300);
    };

};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

