// canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


// size of the character desired, added by theo
const desiredWidth = 44;
const desiredHeight = 100;


canvas.width = 1450
canvas.height = 600

//variables
const gravity = 1
var playerLeft = true
var stand = true

// declaring images
const avatarIdleUp = new Image()
avatarIdleUp.src='../Images/Characters/main-character-1.png'

const avatarIdleDown = new Image()
avatarIdleDown.src='../Images/Characters/main-character-2.png'

// classes
class Player {
    constructor (up, down, position) {
        this.up = up
        this.down = down
        this.position = position
        this.velocity = {
            x: 0,
            y: 1, // default we are falling down
        }
        this.height = 100
        this.width = 44
    }

    draw() {
        if (frame%40 < 20) {
            if (this.up.complete){
                if (playerLeft){
                    c.save(); // Save the current state
                    c.scale(-1, 1); // Flip along y-axis
                    c.drawImage(this.up, -this.position.x-this.width, this.position.y, desiredWidth, desiredHeight);
                    c.restore(); // Restore to the previous state
                    
                }
                else {
                    c.drawImage(this.up, this.position.x, this.position.y, desiredWidth, desiredHeight)
                }
            }
        }
        else {
            if (this.down.complete){
                if (playerLeft){
                    c.save(); // Save the current state
                    c.scale(-1, 1); // Flip along y-axis
                    c.drawImage(this.down, -this.position.x-this.width, this.position.y, desiredWidth, desiredHeight);
                    c.restore(); // Restore to the previous state
                }
                else {
                    c.drawImage(this.down, this.position.x, this.position.y, desiredWidth, desiredHeight)
                }
            }
        }
        
    }

    update() {
        this.draw()

        if (this.width + this.position.x + this.velocity.x < canvas.width) {
            this.position.x += this.velocity.x //x bound
        }
        if (this.position.x + this.velocity.x <= 0) {
            this.position.x -= this.velocity.x //x bound
        }
        if (this.position.y + this.velocity.y <= 0) {
            this.position.y -= this.velocity.y //y bounds (up)
        }
        if (this.height + this.position.y + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += gravity //add acceleration, gravity
            stand = false
        }
        else{
            stand = true
        }
    }
}


const cera = new Player(avatarIdleUp, avatarIdleDown, {
    x:canvas.width/2-100,
    y:canvas.height-100,
})


let frame = 0
const keys = {
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

// animation
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)

    //draw background (groud? floors?)
    
    //drawing updated player
    cera.update()

    //updating player's x positions
    cera.velocity.x = 0
    if (keys.ArrowRight.pressed) {
        cera.velocity.x = 5
        playerLeft = true
    }
    else if (keys.ArrowLeft.pressed) {
        cera.velocity.x = -5
        playerLeft = false // flipped vs cera's image
    }

    frame++
    window.requestAnimationFrame(animate) //shcedules to run animate() on the next frame
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
        break
        case 'ArrowUp':
            if(stand) {
            cera.velocity.y = -15
            }
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            // cera.velocity.x = 5
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            // cera.velocity.x = -5
        break
    }
})