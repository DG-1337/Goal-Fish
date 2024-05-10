let playerState = "sit"
const dropdown = document.getElementById('animations'); 
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value; 
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image(); 
playerImage.src = "shadow_dog_tutorial.png";

// represent one frame from the sprite sheet 
const spriteWidth = 575;    // image width / largest rows (6876 / 12)
const spriteHeight = 523;   // image height / col (5230/10);
let gameFrame = 0;  
const staggerFrames = 6; 
const spriteAnimations = [];


const animationStates = [
    {
        name:'idle',
        frames:7, 
    },
    {
        name:'jump',
        frames:7,
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:9,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    {
        name:'ko',
        frames:12,
    },

    {
        name:'getHit',
        frames:4,
    }
];


animationStates.forEach((state, index) => {
    let frames = {
        loc:[],
    }

    for (let j = 0; j < state.frames; j ++) {
        let posX = j * spriteWidth; 
        let posY = index * spriteHeight; 
        frames.loc.push({x: posX, y:posY}); 
    }

    spriteAnimations[state.name] = frames; 
});

console.log(spriteAnimations); 

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let pos = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState]
.loc.length; 
    let frameX = spriteWidth * pos;     
    let frameY = spriteAnimations[playerState].loc[pos].y;

    // source x allow to traverse rows y allows for cols
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); 
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 
        0, 0, spriteWidth, spriteHeight); 


    gameFrame ++; 

    requestAnimationFrame(animate);  
};

animate(); 