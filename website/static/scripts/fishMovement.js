let playerState = "orangeStyle2"

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 1200;

const playerImage = new Image(); 
const oceanFloor = new Image();

playerImage.src = "/static/orange-fish-10x.png";
oceanFloor.src = "/static/pink-sand.png";


// represent one frame from the sprite sheet 
const spriteWidth = 320;    // image width / largest rows 2560 / 8)
const spriteHeight = 170;   // image height / col (5230/10);
let gameFrame = 0;  
let moveFrame = 0;
let randDirY = Math.floor(Math.random() * 1050);
const staggerFrames = 6; 
const spriteAnimations = [];

const animationStates = [
    {
        name:'orangeStyle1',
        frames:8, 
    },
    {
        name:'orangeStyle2',
        frames:8,
    },
    {
        name:'orangeStyle3',
        frames:8,
    },
    {
        name:'orangeStyle4',
        frames:8,
    },
    
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


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let pos = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; 
    let frameX = spriteWidth * pos;     
    let frameY = spriteAnimations[playerState].loc[pos].y;

    // source x allow to traverse rows y allows for cols
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); 

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 
        moveFrame, randDirY, spriteWidth, spriteHeight); 
    

    
    gameFrame ++; 

    if (moveFrame> 1140) {
        moveFrame = -300;
        randDirY = Math.floor(Math.random() * 1050);
    } 
    ctx.drawImage(oceanFloor, 0, 500, 1500, 700 );


    moveFrame += 2;
    requestAnimationFrame(animate);  
};

animate(); 