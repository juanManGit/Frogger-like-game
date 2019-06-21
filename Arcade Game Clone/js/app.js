//Global variables

//Each lane represents a specific Y coordinate where an enemy instance is allowed to spawn
const lane1 = 68;
const lane2 = 151;
const lane3 = 234;
    
    
// Enemies our player must avoid
var Enemy = function(lane) {


    //Gets a random number between -90 and 250 for the X coordinate
    this.startPos = this.getRandom(-90, -250); 
    //Spawn position. Takes a random X coordinate and a predefined Y coordinate (lane)
    this.pos = [this.startPos,lane];
    //Enemy sprite 
    this.sprite = 'images/enemy-bug.png';
    //Get a random number between 500 and 1200 for the X coordinate and sets it as the border for that enemy instance per each round.
    this.rightBorder = this.getRandom(500, 1200);
    //visual center of the sprite
    this.centerX = this.pos[0] + this.xOffset; 
    this.centerY = this.pos[1] + this.yOffset; 
    this.yOffset = 103.5; 
    this.xOffset = 50.5;
    //this.radius = 40;
};

//returns a random interger.
Enemy.prototype.getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//Calculates de magnitude or distance between the enemy vechicle and the player
Enemy.prototype.distance = function (x1,y1,x2,y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) );
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Updates the X and Y position of the visual center. Which is used for collision detection.
    this.centerX = this.pos[0] + this.xOffset;
    this.centerY = this.pos[1] + this.yOffset; 

    //if this instance has not reached the right border of the scene increase X
    if (this.pos[0] < this.rightBorder ){
        
            this.pos[0] = this.pos[0] + 250 * dt;
                
    }else{
            this.pos[0] = this.startPos; 
            this.rightBorder = this.getRandom(500, 900)};
    
    // Collision detection. Calculates the distance between this instance and the player vehicle. If collision is true resets player's position.
    if (this.distance( this.centerX ,this.centerY, player.centerX, player.centerY ) < 70) {
        
            player.pos[0] = player.Startpos[0];
            player.pos[1] = player.Startpos[1]
    }            
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]); 

       
};

function Player () {
    this.pos = [202,400]; // index 0 = X axis, index 1 = Y axis
    //starting position in grid
    this.Startpos = [202,400];
    //Number of pixels for each horizontal step
    this.horiJump = 101;
    //Number of pixels for each vertical step
    this.vertiJump = 83;
    //player sprite
    this.sprite = 'images/char-boy.png';
    //Sets the world borders for the player
    this.rightBorder = 404;
    this.leftBorder = 0;
    this.upperBorder = -15;
    this.bottomBorder = 400;
    //Visual center of the sprite
    this.centerX = this.pos[0] + this.xOffset; 
    this.centerY = this.pos[1] + this.yOffset; 
    this.yOffset = 98.5; 
    this.xOffset = 50.5;
    
 
    }
    

Player.prototype.update = function (e){
    //Updates the X and Y position of the visual center. Which is used for collision detection.
    this.centerX = this.pos[0] + this.xOffset; 
    this.centerY = this.pos[1] + this.yOffset; 
    
    //Winning condition
    if(this.pos[1]=== -15){
        //sets a modal screen with a message 
        document.getElementById('blocker').style.display = "block";
        document.getElementById('won').style.display = "block"
        //displays modal for a second and resets the player's position
        setTimeout(function reset() {
            document.getElementById('blocker').style.display = "none";
            document.getElementById('won').style.display = "none"
            },1000);
        player.pos[0] = player.Startpos[0];
        player.pos[1] = player.Startpos[1];
    }
    
    this.handleInput = function(e) {
        //If direction key is pressed and player within boundaries, make a jump in key's direction
        
        if (e==='left' & (this.pos[0] - 1 > this.leftBorder)){this.pos[0] = this.pos[0] - this.horiJump }
        
        if (e==='right' & (this.pos[0] + 1 < this.rightBorder)){this.pos[0] = this.pos[0] + this.horiJump}
        
        if (e==='up' & (this.pos[1] - 1 > this.upperBorder)){this.pos[1] = this.pos[1] - this.vertiJump}
        
        if (e==='down' & (this.pos[1] + 1 < this.bottomBorder)){this.pos[1] = this.pos[1] + this.vertiJump}
        

    }
    
}


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1])

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//instantiation
var player = new Player;
var enemy1 = new Enemy(lane1);
var enemy2 = new Enemy(lane2);
var enemy3 = new Enemy(lane3);

// Puts enemy instances into scene
var allEnemies = [enemy1,enemy2,enemy3];

