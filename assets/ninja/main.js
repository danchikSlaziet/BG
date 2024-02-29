/*



If you want to know how this game was made, check out this video, that explains how it's made: 

https://youtu.be/eue3UdFvwPo

Follow me on twitter for more: https://twitter.com/HunorBorbely

*/

// Extend the base functionality of JavaScript
Array.prototype.last = function () {
  return this[this.length - 1];
};

// A sinus function that acceps degrees instead of radians
Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

// Game data
let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle

let heroX; // Changes when moving forward
let heroY; // Only changes when falling
let sceneOffset; // Moves the whole game

let platforms = [];
let sticks = [];
let trees = [];

// Todo: Save high score to localStorage (?)

let score = 0;
let maxScore = window.localStorage.getItem("maxScoreNinja") || undefined;

// Configuration
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;
const heroDistanceFromEdge = 10; // While waiting
const paddingX = 100; // The waiting position of the hero in from the original canvas size
const perfectAreaSize = 10;

// The background moves slower than the hero
const backgroundSpeedMultiplier = 0.2;

const hill1BaseHeight = 100;
const hill1Amplitude = 10;
const hill1Stretch = 1;
const hill2BaseHeight = 70;
const hill2Amplitude = 20;
const hill2Stretch = 0.5;

const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
const turningSpeed = 4; // Milliseconds it takes to turn a degree
const walkingSpeed = 4;
const transitioningSpeed = 2;
const fallingSpeed = 2;

const heroWidth = 17; // 24
const heroHeight = 30; // 40

const canvas = document.getElementById("game");
canvas.width = window.innerWidth; // Make the Canvas full screen
canvas.height = window.innerHeight;

const originalWidth = canvas.width;
const originalHeight = canvas.height;

const container = document.querySelector('.container');

const ctx = canvas.getContext("2d");
const scaleFactor = 2;
canvas.width = originalWidth * scaleFactor; // Увеличенная ширина
canvas.height = originalHeight * scaleFactor; // Увеличенная высота
canvas.style.width = originalWidth + 'px'; // Исходная ширина
canvas.style.height = originalHeight + 'px'; // Исходная высота
// Рисование на увеличенном холсте
ctx.scale(scaleFactor, scaleFactor);


const perfectElement = document.getElementById("perfect");
const restartButton = document.getElementById("restart");
const otherRestartButton = document.querySelector('.restart-button');

const roadImg = new Image();
roadImg.src = './images/road.png';
const platformImg = new Image();
platformImg.src = './images/platform.png';
const heroImg = new Image();
heroImg.src = './images/hero.svg';
const conusImg = new Image();
conusImg.src = './images/conus.svg';

const firstPage = document.querySelector('.first-page');
const firstPageButton = firstPage.querySelector('.first-page__button');

const conusPage = document.querySelector('.conus-page');
const conusPageButton = conusPage.querySelector('.conus-page__button');

const loosePage = document.querySelector('.loose-page');

firstPageButton.addEventListener('click', () => {
  firstPage.classList.remove('first-page_active');
  document.querySelector('.exit-button').src = './images/exit-img-other.svg';
  document.querySelector('.exit-button').style = 'top: 31px; left: 21px;'
});

conusPageButton.addEventListener('click', () => {
  conusPage.classList.remove('conus-page_active');
});

// Initialize layout
resetGame();

// Resets game variables and layouts but does not start the game (game starts on keypress)
function resetGame() {
  // Reset game progress
  phase = "waiting";
  lastTimestamp = undefined;
  sceneOffset = 0;
  score = 0;

  perfectElement.style.opacity = 0;

  // The first platform is always the same
  // x + w has to match paddingX
  platforms = [{ x: 50, w: 50 }];
  generatePlatform();
  generatePlatform();
  generatePlatform();
  generatePlatform();

  sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

  trees = [];
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();

  heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
  heroY = 0;

  draw();
}

function generateTree() {
  const minimumGap = 30;
  const maximumGap = 150;

  // X coordinate of the right edge of the furthest tree
  const lastTree = trees[trees.length - 1];
  let furthestX = lastTree ? lastTree.x : 0;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));

  const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
  const color = treeColors[Math.floor(Math.random() * 3)];

  trees.push({ x, color });
}

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;
  const minimumWidth = 20;
  const maximumWidth = 100;

  // X coordinate of the right edge of the furthest platform
  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));
  const w =
    minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

  platforms.push({ x, w });
}

resetGame();

// If space was pressed restart the game
window.addEventListener("keydown", function (event) {
  if (event.key == " ") {
    event.preventDefault();
    resetGame();
    return;
  }
});
setTimeout(() => {
  draw();
}, 500)


window.addEventListener("mousedown", function (event) {
  if (phase == "waiting" && !firstPage.className.includes('active') && !conusPage.className.includes('active')) {
    lastTimestamp = undefined;
    phase = "stretching";
    window.requestAnimationFrame(animate);
  }
});

window.addEventListener("mouseup", function (event) {
  if (phase == "stretching" && !firstPage.className.includes('active') && !conusPage.className.includes('active')) {
    phase = "turning";
  }
});

window.addEventListener("touchstart", function (event) {
  if (phase == "waiting" && !firstPage.className.includes('active') && !conusPage.className.includes('active')) {
    lastTimestamp = undefined;
    phase = "stretching";
    window.requestAnimationFrame(animate);
  }
});
window.addEventListener("touchend", function (event) {
  if (phase == "stretching" && !firstPage.className.includes('active') && !conusPage.className.includes('active')) {
    phase = "turning";
  }
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
});
function showConusPage() {
  if (!localStorage.getItem('perfectHit')) {
    conusPage.classList.add('conus-page_active');
  }
}
window.requestAnimationFrame(animate);
let isBackgroundMoving = false;
// The main game loop
function animate(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
    window.requestAnimationFrame(animate);
    return;
  }

  switch (phase) {
    case "waiting":
      return; // Stop the loop
    case "stretching": {
      sticks.last().length += (timestamp - lastTimestamp) / stretchingSpeed;
      break;
    }
    case "turning": {
      sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

      if (sticks.last().rotation > 90) {
        sticks.last().rotation = 90;

        const [nextPlatform, perfectHit] = thePlatformTheStickHits();
        if (nextPlatform) {
          // Increase score
          score += perfectHit ? 2 : 1;

          if (perfectHit) {
            showConusPage();
            if (!window.localStorage.getItem('perfectHit')) {
              window.localStorage.setItem('perfectHit', true);
            }
            perfectElement.style.opacity = 1;
            setTimeout(() => (perfectElement.style.opacity = 0), 1000);
          }

          generatePlatform();
          generateTree();
          generateTree();
        }

        phase = "walking";
      }
      break;
    }
    case "walking": {
      updateBackgroundPosition(-3);
      heroX += (timestamp - lastTimestamp) / walkingSpeed;

      const [nextPlatform] = thePlatformTheStickHits();
      if (nextPlatform) {
        // If hero will reach another platform then limit it's position at it's edge
        const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;
          phase = "transitioning";
        }
      } else {
        // If hero won't reach another platform then limit it's position at the end of the pole
        const maxHeroX = sticks.last().x + sticks.last().length + heroWidth;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;
          phase = "falling";
        }
      }
      break;
    }
    case "transitioning": {
      isStartedBGMove = false;
      sceneOffset += (timestamp - lastTimestamp) / transitioningSpeed;

      const [nextPlatform] = thePlatformTheStickHits();
      if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
        // Add the next step
        sticks.push({
          x: nextPlatform.x + nextPlatform.w,
          length: 0,
          rotation: 0
        });
        phase = "waiting";
      }
      break;
    }
    case "falling": {
      maxScore ? null : (maxScore = score);
      score > maxScore ? (maxScore = score) : null;
      window.localStorage.setItem("maxScoreNinja", maxScore);
      loosePage.querySelector('.loose-page__info-stat-count').textContent = score;
      loosePage.querySelector('.loose-page__info-stat-count_best').textContent = maxScore;
      if (sticks.last().rotation < 180)
        sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

      heroY += (timestamp - lastTimestamp) / fallingSpeed;
      const maxHeroY =
        platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
      if (heroY > maxHeroY) {
        restartButton.style.display = "block";
        loosePage.classList.add('loose-page_active');
        return;
      }
      break;
    }
    default:
      throw Error("Wrong phase");
  }
  draw();
  window.requestAnimationFrame(animate);
  lastTimestamp = timestamp;
}

// Returns the platform the stick hit (if it didn't hit any stick then return undefined)
function thePlatformTheStickHits() {
  if (sticks.last().rotation != 90)
    throw Error(`Stick is ${sticks.last().rotation}°`);
  const stickFarX = sticks.last().x + sticks.last().length;

  const platformTheStickHits = platforms.find(
    (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
  );

  // If the stick hits the perfect area
  if (
    platformTheStickHits &&
    platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
      stickFarX &&
    stickFarX <
      platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
  )
    return [platformTheStickHits, true];

  return [platformTheStickHits, false];
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Center main canvas area to the middle of the screen
  ctx.translate(
    (window.innerWidth - canvasWidth) / 2 - sceneOffset,
    (window.innerHeight - canvasHeight) / 2
  );

  // Draw scene
  drawPlatforms();
  drawHero();
  drawSticks();

  // Restore transformation
  ctx.restore();
}

restartButton.addEventListener("click", function (event) {
  event.preventDefault();
  loosePage.classList.remove('loose-page_active');
  resetGame();
});
otherRestartButton.addEventListener("click", function (event) {
  event.preventDefault();
  loosePage.classList.remove('loose-page_active');
  resetGame();
});

function drawPlatforms() {
  platforms.forEach(({ x, w }) => {
    ctx.drawImage(
      platformImg,
      x,
      canvasHeight - platformHeight,
      w,
      platformHeight + (window.innerHeight - canvasHeight) / 2
    );
    // Draw perfect area only if hero did not yet reach the platform
    if (sticks.last().x < x) {
      ctx.drawImage(
        conusImg,
        x + w / 2 - perfectAreaSize / 2,
        canvasHeight - platformHeight - 10,
        perfectAreaSize,
        perfectAreaSize
      );
    }
  });
}

function drawHero() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.translate(
    heroX - heroWidth / 2,
    heroY + canvasHeight - platformHeight - heroHeight / 2
  );
  ctx.drawImage(heroImg, -heroWidth / 2, -heroHeight / 2, 30, 30);
  ctx.restore();
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

function drawSticks() {
  sticks.forEach((stick) => {
    ctx.save();

    // Move the anchor point to the start of the stick and rotate
    ctx.translate(stick.x, canvasHeight - platformHeight - 15);
    ctx.rotate((Math.PI / 180) * stick.rotation);
    ctx.drawImage(roadImg, 0, 0, roadImg.width, -stick.length);

    // Restore transformations
    ctx.restore();
  });
}
const backgroundSpeed = 1;
const backgroundBlock = document.querySelector('.background-block')
const backgroundElement1 = backgroundBlock.querySelector('.background');
let backgroundOffset1 = 0;


function updateBackgroundPosition(offsetX) {
    // Обновляем позицию обоих фоновых элементов на основе переданного смещения
    backgroundOffset1 += offsetX * backgroundSpeed;
    // backgroundOffset2 += offsetX * backgroundSpeed;
    // Если первый фон сдвинулся за пределы экрана, возвращаем его обратно за вторым фоном
    if (backgroundOffset1 <= -backgroundElement1.width + window.innerWidth) {
      backgroundElement1.style = 'transition: none';
      backgroundOffset1 = 0;
    }
    // Обновляем стиль изображения обоих фоновых элементов с учетом их новой позиции
    backgroundElement1.style.transform = `translateX(${backgroundOffset1}px)`;
}