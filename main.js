// ====================== BRAND LOGIC =================
let isSnakeStarted = false;
let resetSnake;

let firstName;
let lastName;

let isRunnerStarted = false;
let stopRunner;
let restartRunner;

let isTowerStarted = false;

let isBirdStarted = false;
let isBirdGameOver = false;
let resetBirdGame;
let startBirdGame;
let restartBirdGame;
let isMemoryStarted = false;

let ninjaExitClicked = false;
let roadExitClicked = false;

let startRoadGame;
let stopRoadGame;

let sapperInterval;

let matchExitClicked = false;

let BrandSwiper;
let AchieveSwiper;
let PersSwiperLeft;
let PersSwiperRightl
function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
function initSwipers() {
  BrandSwiper = new Swiper('.brand-swiper', {
    slidesPerView: 'auto',
  });
  AchieveSwiper = new Swiper('.achieve-swiper', {
    slidesPerView: 'auto',
  });
}
function initPersSwipers() {
  PersSwiperLeft = new Swiper('.swiper-left', {
    effect: 'coverflow',
    slidesPerView: 5.5,
    centeredSlides: true,
    spaceBetween: 3,
    direction: 'vertical',
    coverflowEffect: {
      slideShadows: false,
      rotate: -15,
      depth: 150,
    },
  });
  PersSwiperRight = new Swiper('.swiper-right', {
    effect: 'coverflow',
    slidesPerView: 5.5,
    centeredSlides: true,
    spaceBetween: 3,
    direction: 'vertical',
    coverflowEffect: {
      slideShadows: false,
      rotate: -15,
      depth: 150,
    },
  });
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
document.addEventListener('DOMContentLoaded', () => {
  let app = window.Telegram.WebApp;
  let query = app.initData;
  let user_data_str = parseQuery(query).user;
  let user_data = JSON.parse(user_data_str);
  userData = user_data;
  app.expand();
  app.ready();
  userChatId = user_data["id"];
  initSwipers();
});
const firstBrandPage = document.querySelector('.brand-first');
const gamesArray = firstBrandPage.querySelectorAll('.brand-first__game-full');
const secondBrandPage = document.querySelector('.brand-second');
const backSecondBrandPage = secondBrandPage.querySelector('.brand-second__back');
const secondBrandTitle = secondBrandPage.querySelector('.brand-second__title');
const secondBrandPlay = secondBrandPage.querySelector('.brand-second__play-btn');
const snakePage = document.querySelector('.snake');
const puzzlePage = document.querySelector('.puzzle');
const runnerPage = document.querySelector('.runner');
const birdPage = document.querySelector('.bird');
const towerPage = document.querySelector('.tower');
const towerExit = towerPage.querySelector('.content__exit');
const ninjaPage = document.querySelector('.ninja');
const roadPage = document.querySelector('.road');
const sapperPage = document.querySelector('.sapper');
const sapperExit = sapperPage.querySelector('.sapper-exit');
const tagPage = document.querySelector('.tag');
const tagPageExit = document.querySelector('.tag__exit');
const matchPage = document.querySelector('.match-three');
const matchPageExit = matchPage.querySelector('#exit-match');
const brandWelcome = document.querySelector('.brand-welcome');
const brandWelcomeBtn = brandWelcome.querySelector('.brand-welcome__button');
const brandPers = document.querySelector('.brand-pers');
const brandPersRandom = brandPers.querySelector('.brand-pers__button_random');
const brandPersNext = brandPers.querySelector('.brand-pers__button_next');
const ratingPage = document.querySelector('.rating-page');
const ratingPageBack = ratingPage.querySelector('.rating-page__back');
const memoryPage = document.querySelector('.memory-card');
const memoryExit = memoryPage.querySelector('.exit');
const twentyPage = document.querySelector('.twenty');
const twentyPageExit = twentyPage.querySelector('.exit-button');

function vibro() {
  let detect = new MobileDetect(window.navigator.userAgent);
  if (detect.os() === 'iOS') {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }
  else {
    if ("vibrate" in navigator) {
      // Вибрируем устройство в течение 1000 миллисекунд (1 секунда)
      navigator.vibrate(10);
    } else {
      // Ваш браузер не поддерживает API вибрации
      console.log("Ваш браузер не поддерживает API вибрации.");
    }
  }
}

brandPersRandom.addEventListener('click', () => {
  PersSwiperLeft.slideTo(randomInteger(0, PersSwiperLeft.slides.length - 1));
  PersSwiperRight.slideTo(randomInteger(0, PersSwiperRight.slides.length - 1));
    // Проверяем поддержку API вибрации
  vibro();
});

brandPersNext.addEventListener('click', () => {
  brandPers.querySelectorAll('.swiper-slide-active .swiper__text').forEach((elem, index) => {
    if (index === 0) {
      firstName = elem.innerText;
    }
    else {
      lastName = elem.innerText;
    }
  });
  ratingPage.querySelector('.rating-page__rating_user .rating-page__rating-name').textContent = `${firstName} ${lastName}`;
  PersSwiperRight.destroy();
  PersSwiperLeft.destroy();
  brandPers.classList.remove('brand-pers_active');
  firstBrandPage.classList.add('brand-first_active');
  console.log(firstName, lastName)
})

gamesArray.forEach((elem, index) => {
  elem.addEventListener('click', () => {
      secondBrandTitle.textContent = elem.querySelector('.brand-first__game-title').textContent;
      firstBrandPage.classList.remove('brand-first_active');
      secondBrandPage.classList.add('brand-second_active');
  })
});
backSecondBrandPage.addEventListener('click', () => {
  firstBrandPage.classList.add('brand-first_active');
  secondBrandPage.classList.remove('brand-second_active');
});
document.addEventListener('touchstart', e => x = e.changedTouches[0].clientX);
secondBrandPage.addEventListener('touchend', (e) => {
  if (e.changedTouches[0].clientX - x > 170 && !e.target.className.includes('swiper')) {
    swipeRight();
  }
});
function swipeRight() {
  firstBrandPage.classList.add('brand-first_active');
  secondBrandPage.classList.remove('brand-second_active');
}
secondBrandPlay.addEventListener('click', () => {
  // setTimeout(() => {
  //   BrandSwiper.destroy();
  //   AchieveSwiper.destroy();
  // }, 500)
  if (secondBrandTitle.textContent.trim() === 'Змейка') {
    window.location.href = "./assets/snake/index.html";
  }
  if (secondBrandTitle.textContent.trim() === 'Пазлы') {
    secondBrandPage.classList.remove('brand-second_active');
    puzzlePage.classList.add('puzzle_active');
    startPuzzle();
  }
  if (secondBrandTitle.textContent.trim() === 'Раннер') {
    window.location.href = "./assets/korzinochka/index.html";
  }
  if (secondBrandTitle.textContent.trim() === 'Птичка') {
    secondBrandPage.classList.remove('brand-second_active');
    birdPage.classList.add('bird_active');

    startPage.classList.add('start-page_active');
    if (isBirdStarted) {
      startPage.classList.remove('start-page_active');
      gameOverPage.classList.remove('game-over_active');
      startBirdGame();
    }
    else {
      isBirdStarted = true;
      [resetBirdGame, restartBirdGame, startBirdGame] = startBird();
    }
  }
  if (secondBrandTitle.textContent.trim() === 'Башня') {
    secondBrandPage.classList.remove('brand-second_active');
    towerPage.classList.add('tower_active');
    startTower();
    isTowerStarted = true;
  }
  if (secondBrandTitle.textContent.trim() === 'Ниндзя') {
    window.location.href = "./assets/ninja/index.html";
  }
  if (secondBrandTitle.textContent.trim() === 'Дорога') {
    secondBrandPage.classList.remove('brand-second_active');
    roadPage.classList.add('road_active');
    if (roadExitClicked) {
      startRoadGame();
    }
    else {
      [startRoadGame, stopRoadGame] = startRoad();
      startRoadGame();
    }
  }
  if (secondBrandTitle.textContent.trim() === 'Сапёр') {
    secondBrandPage.classList.remove('brand-second_active');
    sapperPage.classList.add('sapper_active');
    sapperInterval = startSapper();
  }
  if (secondBrandTitle.textContent.trim() === 'Пятнашки') {
    secondBrandPage.classList.remove('brand-second_active');
    tagPage.classList.add('tag_active');
    startTag();
  }
  if (secondBrandTitle.textContent.trim() === 'Три в ряд') {
    secondBrandPage.classList.remove('brand-second_active');
    matchPage.classList.add('match-three_active');
    startMatch();
  }
  if (secondBrandTitle.textContent.trim() === 'Карточки') {
    secondBrandPage.classList.remove('brand-second_active');
    memoryPage.classList.add('memory-card_active');
    if (!isMemoryStarted) {
      let start =  startMemory();
      start();
    }
    isMemoryStarted = true;
  }
  if (secondBrandTitle.textContent.trim() === '2048') {
    secondBrandPage.classList.remove('brand-second_active');
    twentyPage.classList.add('twenty_active');
  }
  if (secondBrandTitle.textContent.trim() === 'Здание') {
    window.location.href = "./assets/building/index.html";
  }
  if (secondBrandTitle.textContent.trim() === 'Букины') {
    window.location.href = "./assets/gena/index.html";
  }
});
document.querySelector('.rating-button').addEventListener('click', () => {
  ratingPage.classList.add('rating-page_active');
  firstBrandPage.classList.remove('brand-first_active');
});

ratingPageBack.addEventListener('click', () => {
  ratingPage.classList.remove('rating-page_active');
  firstBrandPage.classList.add('brand-first_active');
})

twentyPageExit.addEventListener('click', () => {
  twentyPage.classList.remove('twenty_active');
  secondBrandPage.classList.add('brand-second_active');
  initSwipers();
})

memoryExit.addEventListener('click', () => {
  memoryPage.classList.remove('memory-card_active');
  secondBrandPage.classList.add('brand-second_active');
  initSwipers();
});

brandWelcomeBtn.addEventListener('click', () => {
  brandWelcome.classList.remove('brand-welcome_active');
  brandPers.classList.add('brand-pers_active');
  initPersSwipers();
  setTimeout(() => {
    PersSwiperLeft.slideTo(Math.floor(PersSwiperLeft.slides.length/2));
    PersSwiperRight.slideTo(Math.floor(PersSwiperRight.slides.length/2));
    PersSwiperRight.on('slideChange', function () {
      vibro();
    });
    PersSwiperLeft.on('slideChange', function () {
      vibro();
    });
  }, 50)
});

towerExit.addEventListener('click', () => {
  towerPage.classList.remove('tower_active');
  secondBrandPage.classList.add('brand-second_active');
  initSwipers();
});

runnerPage.querySelector('.runner__back').addEventListener('click', () => {
  secondBrandPage.classList.add('brand-second_active');
  runnerPage.classList.remove('runner_active');
  stopRunner();
  initSwipers();
});

puzzlePage.querySelector('.puzzle__back').addEventListener('click', () => {
  puzzlePage.classList.remove('puzzle_active');
  secondBrandPage.classList.add('brand-second_active');
  resetPuzzleGame();
  initSwipers();
});

birdPage.querySelector('.game-over__back').addEventListener('click', () => {
  birdPage.classList.remove('bird_active');
  secondBrandPage.classList.add('brand-second_active');
  resetBirdGame();
  initSwipers();
});

sapperExit.addEventListener('click', () => {
  secondBrandPage.classList.add('brand-second_active');
  sapperPage.classList.remove('sapper_active');
  sapperInterval();
  initSwipers();
});

tagPageExit.addEventListener('click', () => {
  secondBrandPage.classList.add('brand-second_active');
  tagPage.classList.remove('tag_active');
  initSwipers();
});

matchPageExit.addEventListener('click', () => {
  secondBrandPage.classList.add('brand-second_active');
  matchPage.classList.remove('match-three_active');
  initSwipers();
  matchExitClicked = true;
});


// ==================== PUZZLE CODE ==============

const PUZZLE_HOVER_TINT = "#009900";
const img = new Image();
const canvas = document.querySelector("#canvas-puzzle");
const stage = canvas.getContext("2d");
let difficulty = 2;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let currentPiece;
let currentDropPiece;
let mouse;

img.width = 350;
img.height = 500;

// константы (Узлы)
const firstPage = document.querySelector('.first-page');
const firstPageButton = firstPage.querySelector('.first-page__subtitle');
const toolTip = firstPage.querySelector('.first-page__tooltip');

const secondPage = document.querySelector('.second-page');
const secondPageItems = secondPage.querySelectorAll('.second-page__item');
const secondPageButton = secondPage.querySelector('.second-page__button');

const mainPage = document.querySelector('.main-page');
const mainPageNext = document.querySelector('.main-page__next');

function resetPuzzleGame() {
  firstPage.classList.add('first-page_active');
  secondPage.classList.remove('second-page_active');
  mainPage.classList.remove('main-page_active');
}

function startPuzzle() {
// код переключения меж страничками
setTimeout(() => {
  if (firstPage.className.includes('active')) {
    toolTip.classList.add('first-page__tooltip_active');
  }
}, 1300);

firstPageButton.addEventListener('click', () => {
  firstPage.classList.remove('first-page_active');
  secondPage.classList.add('second-page_active');
});

img.addEventListener("load", onImage, false);

secondPageItems.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    secondPageItems.forEach(elem => elem.classList.remove('second-page__item_active'))
    secondPageButton.classList.add('second-page__button_active');
    elem.classList.add('second-page__item_active');
    if (elem.className.includes('1')) {
      img.src = './assets/puzzle/images/cosmo-1.jpg';
    }
    else if (elem.className.includes('2')) {
      img.src = './assets/puzzle/images/sur-1.jpg';
    }
    else if (elem.className.includes('3')) {
      img.src = './assets/puzzle/images/car-1.jpg';
    }
    else if (elem.className.includes('4')) {
      img.src = './assets/puzzle/images/puzzle-1.jpg';
    }
  });
});

secondPageButton.addEventListener("click", () => {
  if (secondPageButton.className.includes('active')) {
    secondPage.classList.remove('second-page_active');
    mainPage.classList.add('main-page_active');
  }
});


// ======================== GAME CODE ========================

function initPuzzle() {
  pieces = [];
  mouse = {
    x: 0,
    y: 0
  };
  currentPiece = null;
  currentDropPiece = null;
  stage.drawImage(
    img,
    0,
    0,
    puzzleWidth,
    puzzleHeight,
    0,
    0,
    puzzleWidth,
    puzzleHeight
  );
  // createTitle("Click to Start Puzzle");
  buildPieces();
}

function setCanvas() {
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  canvas.style.border = "1px solid black";
}

function onImage() {
  pieceWidth = Math.floor(img.width / difficulty);
  pieceHeight = Math.floor(img.height / difficulty);
  puzzleWidth = pieceWidth * difficulty;
  puzzleHeight = pieceHeight * difficulty;
  setCanvas();
  initPuzzle();
}

function createTitle(msg) {
  stage.fillStyle = "#000000";
  stage.globalAlpha = 0.4;
  stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
  stage.fillStyle = "#FFFFFF";
  stage.globalAlpha = 1;
  stage.textAlign = "center";
  stage.textBaseline = "middle";
  stage.font = "20px Arial";
  stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
}

function buildPieces() {
  let i;
  let piece;
  let xPos = 0;
  let yPos = 0;
  for (i = 0; i < difficulty * difficulty; i++) {
    piece = {};
    piece.sx = xPos;
    piece.sy = yPos;
    pieces.push(piece);
    xPos += pieceWidth;
    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }
  document.onpointerdown = shufflePuzzle;
}

function shufflePuzzle() {
  pieces = shuffleArray(pieces);
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  let xPos = 0;
  let yPos = 0;
  for (const piece of pieces) {
    piece.xPos = xPos;
    piece.yPos = yPos;
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      xPos,
      yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
    xPos += pieceWidth;
    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }
  document.onpointerdown = onPuzzleClick;
}

function checkPieceClicked() {
  for (const piece of pieces) {
    if (
      mouse.x < piece.xPos ||
      mouse.x > piece.xPos + pieceWidth ||
      mouse.y < piece.yPos ||
      mouse.y > piece.yPos + pieceHeight
    ) {
      //PIECE NOT HIT
    } else {
      return piece;
    }
  }
  return null;
}

function updatePuzzle(e) {
  currentDropPiece = null;
  if (e.layerX || e.layerX == 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;
  } else if (e.offsetX || e.offsetX == 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;
  }
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  for (const piece of pieces) {
    if (piece == currentPiece) {
      continue;
    }
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      piece.xPos,
      piece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    if (currentDropPiece == null) {
      if (
        mouse.x < piece.xPos ||
        mouse.x > piece.xPos + pieceWidth ||
        mouse.y < piece.yPos ||
        mouse.y > piece.yPos + pieceHeight
      ) {
        //NOT OVER
      } else {
        currentDropPiece = piece;
        stage.save();
        stage.globalAlpha = 0.4;
        stage.fillStyle = PUZZLE_HOVER_TINT;
        stage.fillRect(
          currentDropPiece.xPos,
          currentDropPiece.yPos,
          pieceWidth,
          pieceHeight
        );
        stage.restore();
      }
    }
  }
  stage.save();
  stage.globalAlpha = 0.6;
  stage.drawImage(
    img,
    currentPiece.sx,
    currentPiece.sy,
    pieceWidth,
    pieceHeight,
    mouse.x - pieceWidth / 2,
    mouse.y - pieceHeight / 2,
    pieceWidth,
    pieceHeight
  );
  stage.restore();
  stage.strokeRect(
    mouse.x - pieceWidth / 2,
    mouse.y - pieceHeight / 2,
    pieceWidth,
    pieceHeight
  );
}

function onPuzzleClick(e) {
  if (e.layerX || e.layerX === 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;
  } else if (e.offsetX || e.offsetX === 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;
  }
  currentPiece = checkPieceClicked();
  if (currentPiece !== null) {
    stage.clearRect(
      currentPiece.xPos,
      currentPiece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.save();
    stage.globalAlpha = 0.9;
    stage.drawImage(
      img,
      currentPiece.sx,
      currentPiece.sy,
      pieceWidth,
      pieceHeight,
      mouse.x - pieceWidth / 2,
      mouse.y - pieceHeight / 2,
      pieceWidth,
      pieceHeight
    );
    stage.restore();
    document.onpointermove = updatePuzzle;
    document.onpointerup = pieceDropped;
  }
}

function gameOver() {
  document.onpointerdown = null;
  document.onpointermove = null;
  document.onpointerup = null;
  initPuzzle();
  mainPageNext.classList.add('main-page__next_active');
}

function pieceDropped(e) {
  document.onpointermove = null;
  document.onpointerup = null;
  if (currentDropPiece !== null) {
    let tmp = {
      xPos: currentPiece.xPos,
      yPos: currentPiece.yPos
    };
    currentPiece.xPos = currentDropPiece.xPos;
    currentPiece.yPos = currentDropPiece.yPos;
    currentDropPiece.xPos = tmp.xPos;
    currentDropPiece.yPos = tmp.yPos;
  }
  resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin() {
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  let gameWin = true;
  for (piece of pieces) {
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      piece.xPos,
      piece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
      gameWin = false;
    }
  }
  if (gameWin) {
    setTimeout(gameOver, 300);
  }
}

function shuffleArray(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

function updateDifficulty(e) {
  difficulty = e.target.value;
  pieceWidth = Math.floor(img.width / difficulty);
  pieceHeight = Math.floor(img.height / difficulty);
  puzzleWidth = pieceWidth * difficulty;
  puzzleHeight = pieceHeight * difficulty;
  gameOver();
}

function onTouchStart(e) {
  e.preventDefault();
  let touch = e.touches[0];
  mouse.x = touch.pageX - canvas.offsetLeft;
  mouse.y = touch.pageY - canvas.offsetTop;
  onPuzzleClick(e);
}

function onTouchMove(e) {
  e.preventDefault();
  let touch = e.touches[0];
  mouse.x = touch.pageX - canvas.offsetLeft;
  mouse.y = touch.pageY - canvas.offsetTop;
  updatePuzzle(e);
}

function onTouchEnd(e) {
  e.preventDefault();
}
document.onpointerdown = shufflePuzzle;
canvas.addEventListener("touchstart", onTouchStart);
canvas.addEventListener("touchmove", onTouchMove);
canvas.addEventListener("touchend", onTouchEnd);
}

// ============ FLAPPY BIRD CODE ===============
const startPage = document.querySelector('.start-page');
let gameOverPage;
function startBird() {
  //board
  let board;
  let boardWidth = window.innerWidth;
  let boardHeight = window.innerHeight;
  let context;

  //bird
  let birdWidth = 34; //width/height ratio = 408/228 = 17/12
  let birdHeight = 24;
  let birdX = boardWidth / 8;
  let birdY = boardHeight / 2;
  let birdImg;

  let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
  }

  //pipes
  let pipeArray = [];
  let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
  let pipeHeight = 512;
  let pipeX = boardWidth + 100;
  let pipeY = 0;

  let topPipeImg;
  let bottomPipeImg;

  //physics
  let velocityX = -2; //pipes moving left speed
  let velocityY = 0; //bird jump speed
  let gravity = 0.2;

  let gameOver = false;
  let isPaused = false;
  let score = 0;

  let pauseKey = "Escape";
  let resumeKey = "Escape"; // Можете изменить клавишу для продолжения, если хотите
  let enterKey = "Enter";


  let coinArray = []; // Массив для хранения монеток
  let coinWidth = 34;
  let coinHeight = 34;
  let coinX = boardWidth + 100;
  let coinY = 0;

  let goldCoinImg;
  let silverCoinImg;
  let bronzeCoinImg;

  let scoreCountArray;
  let gameRestart;
  let scoreFinalPage;

  let coinTypes = ["gold", "silver", "bronze"]; // Три вида монеток
  let collectedCoins = { "gold": 0, "silver": 0, "bronze": 0 }; // Счетчик собранных монеток

  let gameStarted = false;

  function resetGame() {
    cancelAnimationFrame(animationId);  // Отмена анимации при сбросе игры
    bird.y = birdY;
    pipeArray = [];
    coinArray = [];
    score = 0;
    collectedCoins = { "gold": 0, "silver": 0, "bronze": 0 };
    gameStarted = false;
  }
  const startPageButton = startPage.querySelector('.start-page__button');
  board = document.getElementById("board");
  (function () {
    gameOverPage = document.querySelector('.game-over');
    scoreFinalPage = document.querySelector('.game-over__score');
    scoreCountArray = document.querySelectorAll('.game-over__score-num');

    gameRestart = document.querySelector('.game-over__restart');
    function changeImagesOnStartPage() {
      let coinImages = ['./assets/bird/images/gold_coin.png', './assets/bird/images/silver_coin.png', './assets/bird/images/bronze_coin.png'];
      let currentImageIndex = 0;
      let coinElement = document.querySelector('.start-page__coin');

      const intervalIdImages = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % coinImages.length;
        coinElement.src = coinImages[currentImageIndex];
      }, 1200);

      startPageButton.addEventListener('click', () => {
        clearInterval(intervalIdImages);
      })
    }
    changeImagesOnStartPage();

    // Добавляем обработчик событий после того, как gameRestart будет найден
    if (gameRestart) {
      gameRestart.addEventListener('click', function () {
        gameOverPage.classList.remove('game-over_active');
        resetGame();  // Сброс игры
        startGame();
      });
    }
    Resize();
    window.addEventListener("resize", Resize); // Change the canvas size with the window size
    context = board.getContext("2d"); //used for drawing on the board

    //load images
    birdImg = new Image();
    birdImg.src = "./assets/bird/images/flappybird.png";
    birdImg.onload = function () {
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./assets/bird/images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/bird/images/bottompipe.png";


    goldCoinImg = new Image();
    goldCoinImg.src = "./assets/bird/images/gold_coin.png"; // Путь к изображению золотой монетки

    silverCoinImg = new Image();
    silverCoinImg.src = "./assets/bird/images/silver_coin.png"; // Путь к изображению серебрянной монетки

    bronzeCoinImg = new Image();
    bronzeCoinImg.src = "./assets/bird/images/bronze_coin.png"; // Путь к изображению бронзовой монетки
    startPageButton.addEventListener('click', () => {
      startPage.classList.remove('start-page_active');
      requestAnimationFrame(update);
      setInterval(placePipes, 1500); // Переименовано для унификации функции генерации объектов
      document.addEventListener("keydown", handleKeyPress);
    });
  })();

  // startPageButton.addEventListener('click', () => {
  //   startPage.classList.remove('start-page_active');
  //   requestAnimationFrame(update);
  //   setInterval(placePipes, 1500); // Переименовано для унификации функции генерации объектов
  //   document.addEventListener("keydown", handleKeyPress);
  // });

  function handleRestartClick() {
    gameOverPage.classList.remove('game-over_active');
    resetGame();  // Сброс игры
    startGame();
  }

  function Resize() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
    boardWidth = window.innerWidth;
    boardHeight = window.innerHeight;
  }

  let animationId;

  function update() {
    animationId = requestAnimationFrame(update);
    if (gameOver || isPaused) {
      return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
      gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      pipe.x += velocityX;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && bird.x > pipe.x + pipe.width) {
        score += 0.5;
        pipe.passed = true;
      }

      if (detectCollision(bird, pipe)) {
        gameOver = true;
      }
    }

    for (let i = 0; i < coinArray.length; i++) {
      let coin = coinArray[i];
      coin.x += velocityX;

      let coinImage;
      switch (coin.type) {
        case "gold":
          coinImage = goldCoinImg;
          break;
        case "silver":
          coinImage = silverCoinImg;
          break;
        case "bronze":
          coinImage = bronzeCoinImg;
          break;
        default:
          coinImage = goldCoinImg;
      }

      // Проверка коллизии с монеткой
      if (!coin.collected && detectCollision(bird, coin)) {
        coin.collected = true;
        collectedCoins[coin.type]++;
        coinArray.splice(i, 1); // Удаление собранной монетки из массива
        i--; // Уменьшаем индекс, так как массив уменьшился
      } else {
        context.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
      }
    }

    coinArray = coinArray.filter((coin) => coin.x > -coin.width);

    // Генерация дополнительных монеток
    if (Math.random() < 0.015) {
      placeCoins();
    }

    // Draw the number of collected coins
    context.fillStyle = "white";
    context.font = "40px Pixel";
    context.fillText(`Счёт: ${collectedCoins.gold + collectedCoins.silver + collectedCoins.bronze}`, 5, 25);

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift();
    }

    if (gameOver) {
      scoreCountArray.forEach((elem, index) => {
        if (index === 0) {
          elem.textContent = `${collectedCoins["gold"]}`;
        }
        else if (index === 1) {
          elem.textContent = `${collectedCoins["silver"]}`;
        }
        else if (index === 2) {
          elem.textContent = `${collectedCoins["bronze"]}`;
        }
      });
      scoreFinalPage.textContent = `${collectedCoins["gold"] + collectedCoins["silver"] + collectedCoins["bronze"]}`;
      gameOverPage.classList.add('game-over_active');
      // Сброс счета по монеткам при проигрыше
      collectedCoins = { "gold": 0, "silver": 0, "bronze": 0 };
    }
  }

  document.addEventListener("touchstart", handleTouchStart);

  // Функция обработки касания
  function handleTouchStart(e) {
    // Проверяем, что игра не завершена
    if (!gameOver) {
      //jump
      velocityY = -3.75;

      //reset game
      if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
      }
    }
  }


  function placeCoins() {
    if (gameOver || isPaused) {
      return;
    }

    // Генерация случайного типа монетки
    let randomCoinType = coinTypes[Math.floor(Math.random() * coinTypes.length)];

    // Позиция для генерации монетки
    let coinPosition = generateRandomCoinPosition();

    let coin = {
      type: randomCoinType,
      x: coinPosition.x,
      y: coinPosition.y,
      width: coinWidth,
      height: coinHeight,
      collected: false
    };

    // Проверка, чтобы монетки не перекрывались с трубами
    if (!isCoinOverlappingWithPipes(coin)) {
      coinArray.push(coin);
    }
  }

  function generateRandomCoinPosition() {
    // Генерация случайной позиции для монетки справа от экрана
    let minY = board.height / 4; // Минимальная координата, чтобы не генерировать монетки выше верхней трети экрана
    let maxY = board.height * 3 / 4 - coinHeight; // Максимальная координата, чтобы не генерировать монетки ниже нижней трети экрана

    let pipeGap = 180; // Минимальное расстояние между трубами

    // Выбираем случайные трубы между которыми будет генерироваться монетка
    let randomTopPipe = pipeArray[Math.floor(Math.random() * pipeArray.length)];
    let randomBottomPipe = pipeArray.find(pipe => pipe.y > randomTopPipe.y + pipeGap);

    if (!randomTopPipe || !randomBottomPipe) {
      // Если трубы отсутствуют, возвращаем случайные координаты справа от экрана
      return { x: board.width + coinWidth, y: Math.random() * (maxY - minY) + minY };
    }

    // Генерация координаты по x за пределами экрана, чтобы монетка появилась справа
    let coinX = board.width + coinWidth;

    // Генерация случайной координаты по y для монетки между трубами
    let coinY = minY + Math.random() * (maxY - minY);

    return { x: coinX, y: coinY };
  }

  function generateRandomCoinY() {
    // Генерация случайной координаты по y для монетки
    let minY = board.height / 4; // Минимальная координата, чтобы не генерировать монетки выше верхней трети экрана
    let maxY = board.height * 3 / 4 - coinHeight; // Максимальная координата, чтобы не генерировать монетки ниже нижней трети экрана
    return minY + Math.random() * (maxY - minY);
  }

  // Проверка, чтобы монетка не перекрывалась с трубами
  function isCoinOverlappingWithPipes(coin) {
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      if (
        coin.x < pipe.x + pipe.width &&
        coin.x + coin.width > pipe.x &&
        coin.y < pipe.y + pipe.height &&
        coin.y + coin.height > pipe.y
      ) {
        return true;
      }
    }
    return false;
  }

  function placePipes() {
    if (gameOver || isPaused) {
      return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;
    let topPipe = {
      img: topPipeImg,
      x: pipeX,
      y: randomPipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false
    }
    // if (pipeArray.length >= 4) {
    //     console.log((pipeArray[pipeArray.length - 2]).x);
    //     console.log(topPipe.x)
    // } 
    if (pipeArray.length >= 4 && Math.abs(topPipe.x - pipeArray[pipeArray.length - 2].x) < 180) {
      topPipe.x += 300;
      pipeArray.push(topPipe);
    }
    else {
      pipeArray.push(topPipe);
    }

    let bottomPipe = {
      img: bottomPipeImg,
      x: pipeX,
      y: randomPipeY + pipeHeight + openingSpace,
      width: pipeWidth,
      height: pipeHeight,
      passed: false
    }
    if (pipeArray.length >= 4 && Math.abs(bottomPipe.x - pipeArray[pipeArray.length - 2].x) < 180) {
      bottomPipe.x += 300;
      pipeArray.push(bottomPipe);
    }
    else {
      pipeArray.push(bottomPipe);
    }
    placeCoins();
  }

  function moveBird(e) {
    // Проверяем, что игра не завершена
    if (!gameOver) {
      // Проверяем, что событие произошло внутри окна
      if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        // Проверяем, что игра не завершена
        if (!gameOver) {
          // Прыгаем
          velocityY = -3.75;

          // Сброс игры
          if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
          }
        }
      }
    }
  }

  function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
      a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
      a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
      a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
  }

  function handleKeyPress(e) {
    if (e.code === pauseKey) {
      togglePause();
    } else {
      // Вызываем moveBird только если игра не на паузе и не завершена
      moveBird(e);
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  function togglePause() {
    if (!gameOver) {
      if (isPaused) {
        // Если игра на паузе, продолжаем ее выполнение
        isPaused = false;
        requestAnimationFrame(update);
      } else {
        // Если игра не на паузе, ставим ее на паузу
        isPaused = true;
        cancelAnimationFrame(animationId);
      }
    }
  }

  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      // Инициализируем начальные значения переменных и начинаем игру
      gameOver = false;
      bird.y = birdY;
      velocityY = -3.75;
      pipeArray = [];
      coinArray = [];
      score = 0;
      collectedCoins = { "gold": 0, "silver": 0, "bronze": 0 };
      isPaused = false;
      animationId = requestAnimationFrame(update);
    }
  }
return [resetGame, handleRestartClick, startGame];
}

// ============ TOWER GAME CODE ============

function startTower() {
  window.focus(); // Capture keys right away (by default focus is on editor)
let detect = new MobileDetect(window.navigator.userAgent);
let camera, scene, renderer; // ThreeJS globals
let world; // CannonJs world
let lastTime; // Last timestamp of animation
let stack; // Parts that stay solid on top of each other
let overhangs; // Overhanging parts that fall down
const boxHeight = 1; // Height of each layer
const originalBoxSize = 3; // Original width and height of a box
let autopilot;
let gameEnded;
let robotPrecision; // Determines how precise the game is on autopilot

const scoreElement = document.getElementById("tower-score");
const instructionsElement = document.getElementById("instructions");
const resultsElement = document.querySelector(".results");
const restartElement = document.querySelector('.content__restart');

// Determines how precise the game is on autopilot
function setRobotPrecision() {
  robotPrecision = Math.random() * 1 - 0.5;
}

function init() {
  autopilot = false;
  gameEnded = false;
  lastTime = 0;
  stack = [];
  overhangs = [];
  setRobotPrecision();

  // Initialize CannonJS
    world = new CANNON.World();
  
  world.gravity.set(0, -10, 0); // Gravity pulls things down

    world.broadphase = new CANNON.NaiveBroadphase();
  
  world.solver.iterations = 40;

  // Initialize ThreeJs
  const aspect = window.innerWidth / window.innerHeight;
  const width = 10;
  const height = width / aspect;
    camera = new THREE.OrthographicCamera(
      width / -2, // left
      width / 2, // right
      height / 2, // top
      height / -2, // bottom
      0, // near plane
      100 // far plane
    );

  /*
  // If you want to use perspective camera instead, uncomment these lines
  camera = new THREE.PerspectiveCamera(
    45, // field of view
    aspect, // aspect ratio
    1, // near plane
    100 // far plane
  );
  */

  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);
    scene = new THREE.Scene();
  // Foundation
  addLayer(0, 0, originalBoxSize, originalBoxSize);

  // First layer
  addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(10, 20, 0);
  scene.add(dirLight);

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  if (!isTowerStarted) {
    towerPage.appendChild(renderer.domElement);
  }
}

init();

function stopLoop() {
  renderer.setAnimationLoop(null);
}
function startLoop() {
  renderer.setAnimationLoop(animation);
}

function startGame() {
  autopilot = false;
  gameEnded = false;
  lastTime = 0;
  stack = [];
  overhangs = [];

  if (instructionsElement) instructionsElement.style.display = "none";
  if (resultsElement) resultsElement.classList.remove('results_active');
  if (scoreElement) scoreElement.innerText = 0;

  if (world) {
    // Remove every object from world
    while (world.bodies.length > 0) {
      world.remove(world.bodies[0]);
    }
  }

  if (scene) {
    // Remove every Mesh from the scene
    while (scene.children.find((c) => c.type == "Mesh")) {
      const mesh = scene.children.find((c) => c.type == "Mesh");
      scene.remove(mesh);
    }

    // Foundation
    addLayer(0, 0, originalBoxSize, originalBoxSize);

    // First layer
    addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");
  }

  if (camera) {
    // Reset camera positions
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
  }
}

function addLayer(x, z, width, depth, direction) {
  const y = boxHeight * stack.length; // Add the new box one layer higher
  const layer = generateBox(x, y, z, width, depth, false);
  layer.direction = direction;
  stack.push(layer);
}

function addOverhang(x, z, width, depth) {
  const y = boxHeight * (stack.length - 1); // Add the new box one the same layer
  const overhang = generateBox(x, y, z, width, depth, true);
  overhangs.push(overhang);
}

function generateBox(x, y, z, width, depth, falls) {
  // ThreeJS
  const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // CannonJS
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
  );
  let mass = falls ? 5 : 0; // If it shouldn't fall then setting the mass to zero will keep it stationary
  mass *= width / originalBoxSize; // Reduce mass proportionately by size
  mass *= depth / originalBoxSize; // Reduce mass proportionately by size
  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.addBody(body);

  return {
    threejs: mesh,
    cannonjs: body,
    width,
    depth
  };
}

function cutBox(topLayer, overlap, size, delta) {
  const direction = topLayer.direction;
  const newWidth = direction == "x" ? overlap : topLayer.width;
  const newDepth = direction == "z" ? overlap : topLayer.depth;

  // Update metadata
  topLayer.width = newWidth;
  topLayer.depth = newDepth;

  // Update ThreeJS model
  topLayer.threejs.scale[direction] = overlap / size;
  topLayer.threejs.position[direction] -= delta / 2;

  // Update CannonJS model
  topLayer.cannonjs.position[direction] -= delta / 2;

  // Replace shape to a smaller one (in CannonJS you can't simply just scale a shape)
  const shape = new CANNON.Box(
    new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
  );
  topLayer.cannonjs.shapes = [];
  topLayer.cannonjs.addShape(shape);
}
if (detect.os() == null) {
  window.addEventListener("mousedown", eventHandler);
  window.addEventListener("keydown", function (event) {
    if (event.key == " ") {
      event.preventDefault();
      eventHandler();
      return;
    }
  });
}
else {
  window.addEventListener("touchstart", eventHandler);
}

restartElement.addEventListener('click', () => {
  renderer.setAnimationLoop(animation);
  startGame();
});

function eventHandler() {
  if (autopilot) startGame();
  else splitBlockAndAddNextOneIfOverlaps();
}

function splitBlockAndAddNextOneIfOverlaps() {
  if (gameEnded) return;

  const topLayer = stack[stack.length - 1];
  const previousLayer = stack[stack.length - 2];

  const direction = topLayer.direction;

  const size = direction == "x" ? topLayer.width : topLayer.depth;
  const delta =
    topLayer.threejs.position[direction] -
    previousLayer.threejs.position[direction];
  const overhangSize = Math.abs(delta);
  const overlap = size - overhangSize;

  if (overlap > 0) {
    cutBox(topLayer, overlap, size, delta);

    // Overhang
    const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
    const overhangX =
      direction == "x"
        ? topLayer.threejs.position.x + overhangShift
        : topLayer.threejs.position.x;
    const overhangZ =
      direction == "z"
        ? topLayer.threejs.position.z + overhangShift
        : topLayer.threejs.position.z;
    const overhangWidth = direction == "x" ? overhangSize : topLayer.width;
    const overhangDepth = direction == "z" ? overhangSize : topLayer.depth;

    addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

    // Next layer
    const nextX = direction == "x" ? topLayer.threejs.position.x : -10;
    const nextZ = direction == "z" ? topLayer.threejs.position.z : -10;
    const newWidth = topLayer.width; // New layer has the same size as the cut top layer
    const newDepth = topLayer.depth; // New layer has the same size as the cut top layer
    const nextDirection = direction == "x" ? "z" : "x";

    if (scoreElement) scoreElement.innerText = stack.length - 1;
    addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
  } else {
    missedTheSpot();
  }
}

function missedTheSpot() {
  const topLayer = stack[stack.length - 1];

  // Turn to top layer into an overhang and let it fall down
  addOverhang(
    topLayer.threejs.position.x,
    topLayer.threejs.position.z,
    topLayer.width,
    topLayer.depth
  );
  world.remove(topLayer.cannonjs);
  scene.remove(topLayer.threejs);

  gameEnded = true;
  if (resultsElement && !autopilot) {resultsElement.classList.add('results_active')};
  stopLoop();
}

function animation(time) {
  if (lastTime) {
    const timePassed = time - lastTime;
    const speed = 0.008;

    const topLayer = stack[stack.length - 1];
    const previousLayer = stack[stack.length - 2];

    // The top level box should move if the game has not ended AND
    // it's either NOT in autopilot or it is in autopilot and the box did not yet reach the robot position
    const boxShouldMove =
      !gameEnded &&
      (!autopilot ||
        (autopilot &&
          topLayer.threejs.position[topLayer.direction] <
            previousLayer.threejs.position[topLayer.direction] +
              robotPrecision));

    if (boxShouldMove) {
      // Keep the position visible on UI and the position in the model in sync
      topLayer.threejs.position[topLayer.direction] += speed * timePassed;
      topLayer.cannonjs.position[topLayer.direction] += speed * timePassed;

      // If the box went beyond the stack then show up the fail screen
      if (topLayer.threejs.position[topLayer.direction] > 10) {
        missedTheSpot();
      }
    } else {
      // If it shouldn't move then is it because the autopilot reached the correct position?
      // Because if so then next level is coming
      if (autopilot) {
        splitBlockAndAddNextOneIfOverlaps();
        setRobotPrecision();
      }
    }

    // 4 is the initial camera height
    if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
      camera.position.y += speed * timePassed;
    }

    updatePhysics(timePassed);
    renderer.render(scene, camera);
  }
  lastTime = time;
}

function updatePhysics(timePassed) {
  world.step(timePassed / 1000); // Step the physics world

  // Copy coordinates from Cannon.js to Three.js
  overhangs.forEach((element) => {
    element.threejs.position.copy(element.cannonjs.position);
    element.threejs.quaternion.copy(element.cannonjs.quaternion);
  });
}

window.addEventListener("resize", () => {
  // Adjust camera
  console.log("resize", window.innerWidth, window.innerHeight);
  const aspect = window.innerWidth / window.innerHeight;
  const width = 10;
  const height = width / aspect;

  camera.top = height / 2;
  camera.bottom = height / -2;

  // Reset renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});
}

// =============== CROSSY ROAD GAME CODE =================
function startRoad() {
  let detect = new MobileDetect(window.navigator.userAgent);
  let isGameStopped = false;

  const counterDOM = document.getElementById('counter');  
  const endDOM = document.getElementById('end');  

  const scene = new THREE.Scene();

  const distance = 500;
  const camera = new THREE.OrthographicCamera( window.innerWidth/-2, window.innerWidth/2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000 );

  camera.rotation.x = 50*Math.PI/180;
  camera.rotation.y = 20*Math.PI/180;
  camera.rotation.z = 10*Math.PI/180;

  const initialCameraPositionY = -Math.tan(camera.rotation.x)*distance;
  const initialCameraPositionX = Math.tan(camera.rotation.y)*Math.sqrt(distance**2 + initialCameraPositionY**2);
  camera.position.y = initialCameraPositionY;
  camera.position.x = initialCameraPositionX;
  camera.position.z = distance;

  const zoom = 2;

  const chickenSize = 15;

  const positionWidth = 42;
  const columns = 17;
  const boardWidth = positionWidth*columns;

  const stepTime = 200; // Miliseconds it takes for the chicken to take a step forward, backward, left or right

  let lanes;
  let currentLane;
  let currentColumn;

  let previousTimestamp;
  let startMoving;
  let moves;
  let stepStartTimestamp;

  const carFrontTexture = new Texture(40,80,[{x: 0, y: 10, w: 30, h: 60 }]);
  const carBackTexture = new Texture(40,80,[{x: 10, y: 10, w: 30, h: 60 }]);
  const carRightSideTexture = new Texture(110,40,[{x: 10, y: 0, w: 50, h: 30 }, {x: 70, y: 0, w: 30, h: 30 }]);
  const carLeftSideTexture = new Texture(110,40,[{x: 10, y: 10, w: 50, h: 30 }, {x: 70, y: 10, w: 30, h: 30 }]);

  const truckFrontTexture = new Texture(30,30,[{x: 15, y: 0, w: 10, h: 30 }]);
  const truckRightSideTexture = new Texture(25,30,[{x: 0, y: 15, w: 10, h: 10 }]);
  const truckLeftSideTexture = new Texture(25,30,[{x: 0, y: 5, w: 10, h: 10 }]);

  const generateLanes = () => [-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9].map((index) => {
    const lane = new Lane(index);
    lane.mesh.position.y = index*positionWidth*zoom;
    scene.add( lane.mesh );
    return lane;
  }).filter((lane) => lane.index >= 0);

  const addLane = () => {
    const index = lanes.length;
    const lane = new Lane(index);
    lane.mesh.position.y = index*positionWidth*zoom;
    scene.add(lane.mesh);
    lanes.push(lane);
  }

  const chicken = new Chicken();
  scene.add( chicken );

  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  scene.add(hemiLight)

  const initialDirLightPositionX = -100;
  const initialDirLightPositionY = -100;
  dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(initialDirLightPositionX, initialDirLightPositionY, 200);
  dirLight.castShadow = true;
  dirLight.target = chicken;
  scene.add(dirLight);

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  var d = 500;
  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;

  // var helper = new THREE.CameraHelper( dirLight.shadow.camera );
  // var helper = new THREE.CameraHelper( camera );
  // scene.add(helper)

  backLight = new THREE.DirectionalLight(0x000000, .4);
  backLight.position.set(200, 200, 50);
  backLight.castShadow = true;
  scene.add(backLight)

  const laneTypes = ['car', 'truck', 'forest'];
  const laneSpeeds = [2, 2.5, 3];
  const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b];
  const threeHeights = [20,45,60];

  const initaliseValues = () => {
    lanes = generateLanes()

    currentLane = 0;
    currentColumn = Math.floor(columns/2);

    previousTimestamp = null;

    startMoving = false;
    moves = [];
    stepStartTimestamp;

    chicken.position.x = 0;
    chicken.position.y = 0;

    camera.position.y = initialCameraPositionY;
    camera.position.x = initialCameraPositionX;

    dirLight.position.x = initialDirLightPositionX;
    dirLight.position.y = initialDirLightPositionY;
  }

  initaliseValues();

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );
  roadPage.appendChild( renderer.domElement );

  function Texture(width, height, rects) {
    const canvas = document.createElement( "canvas" );
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext( "2d" );
    context.fillStyle = "#ffffff";
    context.fillRect( 0, 0, width, height );
    context.fillStyle = "rgba(0,0,0,0.6)";  
    rects.forEach(rect => {
      context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    return new THREE.CanvasTexture(canvas);
  }

  function Wheel() {
    const wheel = new THREE.Mesh( 
      new THREE.BoxBufferGeometry( 12*zoom, 33*zoom, 12*zoom ), 
      new THREE.MeshLambertMaterial( { color: 0x333333, flatShading: true } ) 
    );
    wheel.position.z = 6*zoom;
    return wheel;
  }

  function Car() {
    const car = new THREE.Group();
    const color = vechicleColors[Math.floor(Math.random() * vechicleColors.length)];
    
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 60*zoom, 30*zoom, 15*zoom ), 
      new THREE.MeshPhongMaterial( { color, flatShading: true } )
    );
    main.position.z = 12*zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main)
    
    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 33*zoom, 24*zoom, 12*zoom ), 
      [
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true, map: carBackTexture } ),
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true, map: carFrontTexture } ),
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true, map: carRightSideTexture } ),
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true, map: carLeftSideTexture } ),
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true } ), // top
        new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true } ) // bottom
      ]
    );
    cabin.position.x = 6*zoom;
    cabin.position.z = 25.5*zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add( cabin );
    
    const frontWheel = new Wheel();
    frontWheel.position.x = -18*zoom;
    car.add( frontWheel );

    const backWheel = new Wheel();
    backWheel.position.x = 18*zoom;
    car.add( backWheel );

    car.castShadow = true;
    car.receiveShadow = false;
    
    return car;  
  }

  function Truck() {
    const truck = new THREE.Group();
    const color = vechicleColors[Math.floor(Math.random() * vechicleColors.length)];


    const base = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 100*zoom, 25*zoom, 5*zoom ), 
      new THREE.MeshLambertMaterial( { color: 0xb4c6fc, flatShading: true } )
    );
    base.position.z = 10*zoom;
    truck.add(base)

    const cargo = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 75*zoom, 35*zoom, 40*zoom ), 
      new THREE.MeshPhongMaterial( { color: 0xb4c6fc, flatShading: true } )
    );
    cargo.position.x = 15*zoom;
    cargo.position.z = 30*zoom;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo)

    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 25*zoom, 30*zoom, 30*zoom ), 
      [
        new THREE.MeshPhongMaterial( { color, flatShading: true } ), // back
        new THREE.MeshPhongMaterial( { color, flatShading: true, map: truckFrontTexture } ),
        new THREE.MeshPhongMaterial( { color, flatShading: true, map: truckRightSideTexture } ),
        new THREE.MeshPhongMaterial( { color, flatShading: true, map: truckLeftSideTexture } ),
        new THREE.MeshPhongMaterial( { color, flatShading: true } ), // top
        new THREE.MeshPhongMaterial( { color, flatShading: true } ) // bottom
      ]
    );
    cabin.position.x = -40*zoom;
    cabin.position.z = 20*zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add( cabin );

    const frontWheel = new Wheel();
    frontWheel.position.x = -38*zoom;
    truck.add( frontWheel );

    const middleWheel = new Wheel();
    middleWheel.position.x = -10*zoom;
    truck.add( middleWheel );

    const backWheel = new Wheel();
    backWheel.position.x = 30*zoom;
    truck.add( backWheel );

    return truck;  
  }

  function Three() {
    const three = new THREE.Group();

    const trunk = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 15*zoom, 15*zoom, 20*zoom ), 
      new THREE.MeshPhongMaterial( { color: 0x4d2926, flatShading: true } )
    );
    trunk.position.z = 10*zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    three.add(trunk);

    height = threeHeights[Math.floor(Math.random()*threeHeights.length)];

    const crown = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 30*zoom, 30*zoom, height*zoom ), 
      new THREE.MeshLambertMaterial( { color: 0x7aa21d, flatShading: true } )
    );
    crown.position.z = (height/2+20)*zoom;
    crown.castShadow = true;
    crown.receiveShadow = false;
    three.add(crown);

    return three;  
  }

  function Chicken() {
    const chicken = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxBufferGeometry( chickenSize*zoom, chickenSize*zoom, 20*zoom ), 
      new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } )
    );
    body.position.z = 10*zoom;
    body.castShadow = true;
    body.receiveShadow = true;
    chicken.add(body);

    const rowel = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 2*zoom, 4*zoom, 2*zoom ), 
      new THREE.MeshLambertMaterial( { color: 0xF0619A, flatShading: true } )
    );
    rowel.position.z = 21*zoom;
    rowel.castShadow = true;
    rowel.receiveShadow = false;
    chicken.add(rowel);

    return chicken;  
  }

  function Road() {
    const road = new THREE.Group();

    const createSection = color => new THREE.Mesh(
      new THREE.PlaneBufferGeometry( boardWidth*zoom, positionWidth*zoom ), 
      new THREE.MeshPhongMaterial( { color } )
    );

    const middle = createSection(0x454A59);
    middle.receiveShadow = true;
    road.add(middle);

    const left = createSection(0x393D49);
    left.position.x = - boardWidth*zoom;
    road.add(left);

    const right = createSection(0x393D49);
    right.position.x = boardWidth*zoom;
    road.add(right);

    return road;
  }

  function Grass() {
    const grass = new THREE.Group();

    const createSection = color => new THREE.Mesh(
      new THREE.BoxBufferGeometry( boardWidth*zoom, positionWidth*zoom, 3*zoom ), 
      new THREE.MeshPhongMaterial( { color } )
    );

    const middle = createSection(0xbaf455);
    middle.receiveShadow = true;
    grass.add(middle);

    const left = createSection(0x99C846);
    left.position.x = - boardWidth*zoom;
    grass.add(left);

    const right = createSection(0x99C846);
    right.position.x = boardWidth*zoom;
    grass.add(right);

    grass.position.z = 1.5*zoom;
    return grass;
  }

  function Lane(index) {
    this.index = index;
    this.type = index <= 0 ? 'field' : laneTypes[Math.floor(Math.random()*laneTypes.length)];

    switch(this.type) {
      case 'field': {
        this.type = 'field';
        this.mesh = new Grass();
        break;
      }
      case 'forest': {
        this.mesh = new Grass();

        this.occupiedPositions = new Set();
        this.threes = [1,2,3,4].map(() => {
          const three = new Three();
          let position;
          do {
            position = Math.floor(Math.random()*columns);
          }while(this.occupiedPositions.has(position))
            this.occupiedPositions.add(position);
          three.position.x = (position*positionWidth+positionWidth/2)*zoom-boardWidth*zoom/2;
          this.mesh.add( three );
          return three;
        })
        break;
      }
      case 'car' : {
        this.mesh = new Road();
        this.direction = Math.random() >= 0.5;

        const occupiedPositions = new Set();
        this.vechicles = [1,2,3].map(() => {
          const vechicle = new Car();
          let position;
          do {
            position = Math.floor(Math.random()*columns/2);
          }while(occupiedPositions.has(position))
            occupiedPositions.add(position);
          vechicle.position.x = (position*positionWidth*2+positionWidth/2)*zoom-boardWidth*zoom/2;
          if(!this.direction) vechicle.rotation.z = Math.PI;
          this.mesh.add( vechicle );
          return vechicle;
        })

        this.speed = laneSpeeds[Math.floor(Math.random()*laneSpeeds.length)];
        break;
      }
      case 'truck' : {
        this.mesh = new Road();
        this.direction = Math.random() >= 0.5;

        const occupiedPositions = new Set();
        this.vechicles = [1,2].map(() => {
          const vechicle = new Truck();
          let position;
          do {
            position = Math.floor(Math.random()*columns/3);
          }while(occupiedPositions.has(position))
            occupiedPositions.add(position);
          vechicle.position.x = (position*positionWidth*3+positionWidth/2)*zoom-boardWidth*zoom/2;
          if(!this.direction) vechicle.rotation.z = Math.PI;
          this.mesh.add( vechicle );
          return vechicle;
        })

        this.speed = laneSpeeds[Math.floor(Math.random()*laneSpeeds.length)];
        break;
      }
    }
  }

  document.querySelector("#retry").addEventListener("click", () => {
    lanes.forEach(lane => scene.remove( lane.mesh ));
    initaliseValues();
    endDOM.style.visibility = 'hidden';
  });

  if (detect.os() == null) {
    document.getElementById('forward').addEventListener("click", () => move('forward'));

    document.getElementById('backward').addEventListener("click", () => move('backward'));

    document.getElementById('left').addEventListener("click", () => move('left'));

    document.getElementById('right').addEventListener("click", () => move('right'));
  }

  else {
    document.getElementById('forward').addEventListener("touchstart", () => move('forward'));

    document.getElementById('backward').addEventListener("touchstart", () => move('backward'));

    document.getElementById('left').addEventListener("touchstart", () => move('left'));

    document.getElementById('right').addEventListener("touchstart", () => move('right'));
  }

  window.addEventListener("keydown", event => {
    if (event.keyCode == '38') {
      // up arrow
      move('forward');
    }
    else if (event.keyCode == '40') {
      // down arrow
      move('backward');
    }
    else if (event.keyCode == '37') {
      // left arrow
      move('left');
    }
    else if (event.keyCode == '39') {
      // right arrow
      move('right');
    }
  });

  function move(direction) {
    const finalPositions = moves.reduce((position,move) => {
      if(move === 'forward') return {lane: position.lane+1, column: position.column};
      if(move === 'backward') return {lane: position.lane-1, column: position.column};
      if(move === 'left') return {lane: position.lane, column: position.column-1};
      if(move === 'right') return {lane: position.lane, column: position.column+1};
    }, {lane: currentLane, column: currentColumn})

    if (direction === 'forward') {
      if(lanes[finalPositions.lane+1].type === 'forest' && lanes[finalPositions.lane+1].occupiedPositions.has(finalPositions.column)) return;
      if(!stepStartTimestamp) startMoving = true;
      addLane();
    }
    else if (direction === 'backward') {
      if(finalPositions.lane === 0) return;
      if(lanes[finalPositions.lane-1].type === 'forest' && lanes[finalPositions.lane-1].occupiedPositions.has(finalPositions.column)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    else if (direction === 'left') {
      if(finalPositions.column === 0) return;
      if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column-1)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    else if (direction === 'right') {
      if(finalPositions.column === columns - 1 ) return;
      if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column+1)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    moves.push(direction);
  }

  let reqID;

  function animate(timestamp) {
    if (isGameStopped) {
      return;
    }
    reqID = requestAnimationFrame( animate );

    if(!previousTimestamp) previousTimestamp = timestamp;
    const delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // Animate cars and trucks moving on the lane
    lanes.forEach(lane => {
      if(lane.type === 'car' || lane.type === 'truck') {
        const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/2 - positionWidth*2*zoom;
        const aBitAfterTheEndOFLane = boardWidth*zoom/2 + positionWidth*2*zoom;
        lane.vechicles.forEach(vechicle => {
          if(lane.direction) {
            vechicle.position.x = vechicle.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : vechicle.position.x -= lane.speed/16*delta;
          }else{
            vechicle.position.x = vechicle.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : vechicle.position.x += lane.speed/16*delta;
          }
        });
      }
    });

    if(startMoving) {
      stepStartTimestamp = timestamp;
      startMoving = false;
    }

    if(stepStartTimestamp) {
      const moveDeltaTime = timestamp - stepStartTimestamp;
      const moveDeltaDistance = Math.min(moveDeltaTime/stepTime,1)*positionWidth*zoom;
      const jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime/stepTime,1)*Math.PI)*8*zoom;
      switch(moves[0]) {
        case 'forward': {
          const positionY = currentLane*positionWidth*zoom + moveDeltaDistance;
          camera.position.y = initialCameraPositionY + positionY; 
          dirLight.position.y = initialDirLightPositionY + positionY; 
          chicken.position.y = positionY; // initial chicken position is 0

          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'backward': {
          positionY = currentLane*positionWidth*zoom - moveDeltaDistance
          camera.position.y = initialCameraPositionY + positionY;
          dirLight.position.y = initialDirLightPositionY + positionY; 
          chicken.position.y = positionY;

          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'left': {
          const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 - moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;     
          dirLight.position.x = initialDirLightPositionX + positionX; 
          chicken.position.x = positionX; // initial chicken position is 0
          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'right': {
          const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 + moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;       
          dirLight.position.x = initialDirLightPositionX + positionX;
          chicken.position.x = positionX; 

          chicken.position.z = jumpDeltaDistance;
          break;
        }
      }
      // Once a step has ended
      if(moveDeltaTime > stepTime) {
        switch(moves[0]) {
          case 'forward': {
            currentLane++;
            counterDOM.innerHTML = currentLane;    
            break;
          }
          case 'backward': {
            currentLane--;
            counterDOM.innerHTML = currentLane;    
            break;
          }
          case 'left': {
            currentColumn--;
            break;
          }
          case 'right': {
            currentColumn++;
            break;
          }
        }
        moves.shift();
        // If more steps are to be taken then restart counter otherwise stop stepping
        stepStartTimestamp = moves.length === 0 ? null : timestamp;
      }
    }

    // Hit test
    if(lanes[currentLane].type === 'car' || lanes[currentLane].type === 'truck') {
      const chickenMinX = chicken.position.x - chickenSize*zoom/2;
      const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
      const vechicleLength = { car: 60, truck: 105}[lanes[currentLane].type]; 
      lanes[currentLane].vechicles.forEach(vechicle => {
        const carMinX = vechicle.position.x - vechicleLength*zoom/2;
        const carMaxX = vechicle.position.x + vechicleLength*zoom/2;
        if(chickenMaxX > carMinX && chickenMinX < carMaxX) {
          endDOM.style.visibility = 'visible';
        }
      });

    }
    renderer.render( scene, camera );	
  }

  function startGame() {
    isGameStopped = false;
    reqID = requestAnimationFrame( animate );
  }
  function stopGame() {
    isGameStopped = true;
    cancelAnimationFrame( animate );
    reqID = null;
  }
  document.getElementById('exit').addEventListener('click', () => {
    roadExitClicked = true;
    stopGame();
    initSwipers();
    roadPage.classList.remove('road_active');
    secondBrandPage.classList.add('brand-second_active');
  })
  return [startGame, stopGame];
}

// ================= SAPPER GAME CODE ===============

function startSapper() {
  var grid = document.getElementById("grid");
  var startTime = null;
  var timerInterval = null;
  var minesRemaining = 40;
  var gameOver = false;
  var clockAudioPlaying = false;

  function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    console.log('timer is active')
    var currentTime = new Date();
    var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    document.getElementById("timer").textContent = elapsedSeconds;

    var flaggedCells = document.querySelectorAll(".flagged").length;
    var remaining = 10 - flaggedCells;

    if (elapsedSeconds >= 60 && remaining > 0) {
      clearInterval(timerInterval);
      revealMines();
      gameOver = true;
    }
  }

  function endGame() {
    clearInterval(timerInterval);
    revealMines();
    gameOver = true;
  }

  function updateMinesRemaining() {
    var flaggedCells = document.querySelectorAll(".flagged").length;
    var remaining = 10 - flaggedCells;
    document.getElementById("mines-remaining").textContent = remaining;
  }

  function addMines() {
    var minePositions = [];
    while (minePositions.length < 10) {
      var row = Math.floor(Math.random() * 10);
      var col = Math.floor(Math.random() * 10);
      var position = row * 10 + col;
      if (!minePositions.includes(position)) {
        minePositions.push(position);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("data-mine", "true");
      }
    }
  }

  function revealMines() {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine") == "true") {
          cell.classList.add("mine");
          cell.innerHTML = "💣";
        }
      }
    }
  }

  var grid = document.getElementById("grid");
  var startTime = null;
  var timerInterval = null;
  var minesRemaining = 40;
  var gameOver = false;


  function playClockAudio() {


  }

  function stopClockAudio() {

  }

  function checkLevelCompletion() {
    var allTilesRevealed = true;
    var allBombsFlagged = true;

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cell = grid.rows[i].cells[j];
        var isMine = cell.getAttribute("data-mine") === "true";
        var isFlagged = cell.classList.contains("flagged");
        var isRevealed = cell.classList.contains("revealed");

        if (!isRevealed && !isFlagged && !isMine) {
          allTilesRevealed = false;
        }

        if (!isRevealed && !isFlagged && isMine) {
          allBombsFlagged = false;
        }
      }
    }

    if (allTilesRevealed) {
      clearInterval(timerInterval);
      revealMines();
    }

    if (allBombsFlagged) {
      clearInterval(timerInterval);
    }
  }

  function generateGrid() {
    grid.innerHTML = "";
    startTime = null;
    clearInterval(timerInterval);
    minesRemaining = 40;
    document.getElementById("timer").textContent = 0;
    document.getElementById("mines-remaining").textContent = minesRemaining;

    for (var i = 0; i < 10; i++) {
      var row = grid.insertRow(i);
      for (var j = 0; j < 10; j++) {
        var cell = row.insertCell(j);
        cell.setAttribute("data-state", "hidden");
        cell.addEventListener("mousedown", function (event) {
          if (!startTime) {
            startTimer();
          }

          if (event.button === 0) {
            clickCell(this, event);
          } else if (event.button === 2) {
            toggleFlag(this);
          }

          event.preventDefault();
        });

        var mine = document.createAttribute("data-mine");
        mine.value = "false";
        cell.setAttributeNode(mine);
      }
    }
    addMines();
  }

  function toggleFlag(cell) {
    if (!cell.classList.contains("revealed")) {
      if (cell.getAttribute("data-state") === "hidden" && minesRemaining > 0) {
        cell.setAttribute("data-state", "flagged");
        cell.innerHTML = "🚩";

        if (cell.getAttribute("data-mine") === "true") {
          minesRemaining--;
          document.getElementById("mines-remaining").textContent = minesRemaining;
        }
      } else if (cell.getAttribute("data-state") === "flagged") {
        cell.setAttribute("data-state", "hidden");
        cell.innerHTML = "";

        if (cell.getAttribute("data-mine") === "true") {
          minesRemaining++;
          document.getElementById("mines-remaining").textContent = minesRemaining;
        }
      }
      checkLevelCompletion();
    }
  }

  function clickCell(cell, event) {
    if (!cell.classList.contains("revealed")) {
      if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        clearInterval(timerInterval);
        gameOver = true;
      } else {
        cell.classList.add("revealed");
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;

        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
          for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") {
              mineCount++;
            }
          }
        }

        cell.innerHTML = mineCount;

        if (mineCount == 0) {
          for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
              var adjacentCell = grid.rows[i].cells[j];
              if (!adjacentCell.classList.contains("revealed") && !adjacentCell.classList.contains("flagged")) {
                clickCell(adjacentCell, event);
              }
            }
          }
        }
        checkLevelCompletion();
      }
    }
  }
  generateGrid();
  document.querySelector('.sapper-restart').addEventListener('click', () => {
    generateGrid();
  });
  return endGame;
}

// ================== ПЯТНАШКИ ==================

function startTag() {
  function getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
  }
  
  function Game(context, cellSize){
    this.state = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ];
    
    this.color = "#FFB93B";
  
    this.context = context;
    this.cellSize = cellSize;
  
    this.clicks = 0;
  }
  
  Game.prototype.getClicks = function() {
    return this.clicks;
  };
  
  Game.prototype.cellView = function(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x + 1, 
      y + 1, 
      this.cellSize - 2, 
      this.cellSize - 2
    );
  };
  
  Game.prototype.numView = function() {
    this.context.font = "bold " + (this.cellSize/2) + "px Sans";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "#222";
  };
  
  Game.prototype.draw = function() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state[i][j] > 0) {
          this.cellView(
            j * this.cellSize, 
            i * this.cellSize
          );
          this.numView();
          this.context.fillText(
            this.state[i][j], 
            j * this.cellSize + this.cellSize / 2,
            i * this.cellSize + this.cellSize / 2
          );
        }
      }
    }
  };
  
  Game.prototype.getNullCell = function(){
    for (let i = 0; i<4; i++){
      for (let j=0; j<4; j++){
        if(this.state[j][i] === 0){
          return {x: i, y: j};
        }
      }
    }
  };
  
  Game.prototype.move = function(x, y) {
    let nullCell = this.getNullCell();
    let canMoveVertical = (x - 1 == nullCell.x || x + 1 == nullCell.x) && y == nullCell.y;
    let canMoveHorizontal = (y - 1 == nullCell.y || y + 1 == nullCell.y) && x == nullCell.x;
  
    if (canMoveVertical || canMoveHorizontal) {
      this.state[nullCell.y][nullCell.x] = this.state[y][x];
      this.state[y][x] = 0;
      this.clicks++;
    }
  };
    
  Game.prototype.victory = function() {
    let combination = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
    let res = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (combination[i][j] != this.state[i][j]) {
          res = false;
          break;
        }
      }
    }
    return res;
  };
  
  Game.prototype.mix = function(count) {
    let x, y;
    for (let i = 0; i < count; i++) {
      let nullCell = this.getNullCell();
  
      let verticalMove = getRandomBool();
      let upLeft = getRandomBool();
  
      if (verticalMove) {
        x = nullCell.x; 
        if (upLeft) {
          y = nullCell.y - 1;
        } else {
          y = nullCell.y + 1;
        }
      } else {
        y = nullCell.y; 
        if (upLeft) {
          x = nullCell.x - 1;
        } else {
          x = nullCell.x + 1;
        }
      }
  
      if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
        this.move(x, y);
      }
    }
  
    this.clicks = 0;
  };
  
  (function(){
    let canvas = document.getElementById("tag-canvas");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerWidth;
  
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    let cellSize = canvas.width / 4;
  
    let game = new Game(context, cellSize);
    game.mix(300);
    game.draw();
  
    canvas.onclick = function(e) {
      let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
      let y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
      onEvent(x, y); 
    };
  
    canvas.ontouchend = function(e) {
      let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
      let y = (e.touches[0].pageY - canvas.offsetTop)  / cellSize | 0;
  
      onEvent(x, y);
    };  
  
    function onEvent(x, y) { 
      game.move(x, y);
      context.fillRect(0, 0, canvas.width, canvas.height);
      game.draw();
      if (game.victory()) {
        alert("Собрано за "+game.getClicks()+" касание!"); 
        game.mix(300);
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw(context, cellSize);
      }
    }
  })()
}

// ============= MATCH 3 GAME CODE ===============
function startMatch() {
  // JavaScript Document

  var board;
var boardSize = 8;
var candyNum = 5;
var active;
var tileWidth;
var score;
var timeInterval;

function initBoard() {
  $('#score-match span').text('0');
  $('#time-match span').text('0');

  board = new Array(boardSize);

  // generate board
  do {
    for (var i = 0; i < boardSize; i++) {
      board[i] = new Array(boardSize);
      for (var j = 0; j < boardSize; j++) {
        board[i][j] = Math.ceil(candyNum * Math.random());
      }
    }
  } while (checkInitialMatches());

  // draw board
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      $('#board-match > div').append('<div class="tile"><a href="javascript:void;" class="candy' + board[i][j] + ' x' + i + ' y' + j + '"><span></span></a></div>');
    }
  }

  tileWidth = $('#board-match .tile').width();

  for (var i = 0; i < boardSize; i++) {
    var offset = tileWidth * (boardSize - i - 1);
    $('#board-match .tile .y' + i).css('left', offset);
    $('#board-match .tile .x' + i).css('top', offset);
  }

  minDist = $('#board-match .tile a').width() / 2;

  // css3 animation settings
  $('#board-match .tile a').css('transition', 'top 0.3s, left 0.3s, background-color 0.3s, border-color 0.3s')
    .css('-moz-transition', 'top 0.3s, left 0.3s, background-color 0.3s, border-color 0.3s')
    .css('-webkit-transition', 'top 0.3s, left 0.3s, background-color 0.3s, border-color 0.3s')
    .css('-o-transition', 'top 0.3s, left 0.3s, background-color 0.3s, border-color 0.3s')
    .bind('mousedown', function (e) {
      if (active) {
        if ($('a.selected').length > 0 && !$(this).hasClass('selected')) {
          var a = $('.selected');
          $('.selected').removeClass('selected');

          swapTiles(a, $(this));
        }
        else {
          $(this).toggleClass('selected');
        }
      }
    })
    .bind('mouseup', function (e) {
      if (active) {
        if ($('a.selected').length > 0 && !$(this).hasClass('selected')) {
          var a = $('.selected');
          $('.selected').removeClass('selected');

          swapTiles(a, $(this));
        }
      }
    });

  score = 0;
  updateTime();

  active = true;
  tDamage = window.setTimeout(timeDamage, 500);
}

function updateTime() {
  timeInterval = setInterval(function () {
    var time = parseInt($('#time-match span').text());
    $('#time-match span').text(time + 1);
  }, 1000);
}

function checkInitialMatches() {
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      // Check for horizontal matches
      if (j < boardSize - 2) {
        if (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
          return true;
        }
      }
      // Check for vertical matches
      if (i < boardSize - 2) {
        if (board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j]) {
          return true;
        }
      }
      // Check for 2x2 square matches
      if (i < boardSize - 1 && j < boardSize - 1) {
        if (board[i][j] === board[i + 1][j] && board[i][j] === board[i][j + 1] && board[i][j] === board[i + 1][j + 1]) {
          return true;
        }
      }
    }
  }
  return false;
}

function tile(x, y) {
  this.x = x;
  this.y = y;
}

function swapTiles(a, b) {
  active = false;
  var aClass = a.attr('class');
  var ax = parseInt(aClass.slice(aClass.search(' x') + 2, aClass.search(' x') + 3));
  var ay = parseInt(aClass.slice(aClass.search(' y') + 2, aClass.search(' y') + 3));

  var bClass = b.attr('class');
  var bx = parseInt(bClass.slice(bClass.search(' x') + 2, bClass.search(' x') + 3));
  var by = parseInt(bClass.slice(bClass.search(' y') + 2, bClass.search(' y') + 3));

  if (((ax - bx == 1 || bx - ax == 1) && ay == by) || ((ay - by == 1 || by - ay == 1) && ax == bx)) {
    board[ax][ay] = board[ax][ay] + board[bx][by];
    board[bx][by] = board[ax][ay] - board[bx][by];
    board[ax][ay] = board[ax][ay] - board[bx][by];

    aLeft = a.css('left') + '';
    bLeft = b.css('left') + '';
    aTop = a.css('top') + '';
    bTop = b.css('top') + '';
    a.css('left', bLeft);
    b.css('left', aLeft);
    a.css('top', bTop);
    b.css('top', aTop);

    a.removeClass('x' + ax + ' y' + ay).addClass('x' + bx + ' y' + by);
    b.removeClass('x' + bx + ' y' + by).addClass('x' + ax + ' y' + ay);

    if (checkMatches()) {
    }
    else {
      a.removeClass('x' + bx + ' y' + by).addClass('x' + ax + ' y' + ay);
      b.removeClass('x' + ax + ' y' + ay).addClass('x' + bx + ' y' + by);

      c = board[ax][ay];
      board[ax][ay] = board[bx][by];
      board[bx][by] = c;

      var t = window.setTimeout(function () {
        a.css('left', aLeft);
        b.css('left', bLeft);
        a.css('top', aTop);
        b.css('top', bTop);
      }, 300);
    }
  }
}

function checkMatches() {
  var matches = [];

  // Check for square matches
  for (var i = 0; i < boardSize - 1; i++) {
    for (var j = 0; j < boardSize - 1; j++) {
      if (board[i][j] == board[i][j + 1] && board[i][j] == board[i + 1][j] && board[i][j] == board[i + 1][j + 1]) {
        matches.push(new tile(i, j));
        matches.push(new tile(i, j + 1));
        matches.push(new tile(i + 1, j));
        matches.push(new tile(i + 1, j + 1));
      }
    }
  }

  // Check for row matches
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize - 2; j++) {
      if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]) {
        matches.push(new tile(i, j));
        matches.push(new tile(i, j + 1));
        matches.push(new tile(i, j + 2));
      }
    }
  }

  // Check for column matches
  for (var i = 0; i < boardSize - 2; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (board[i][j] == board[i + 1][j] && board[i][j] == board[i + 2][j]) {
        matches.push(new tile(i, j));
        matches.push(new tile(i + 1, j));
        matches.push(new tile(i + 2, j));
      }
    }
  }

  if (matches.length === 0) {
    var t = window.setTimeout(function () { active = true; }, 300);
    return false;
  } else {
    window.clearTimeout(tDamage);

    for (var i = 0; i < matches.length; i++) {
      var x = matches[i].x;
      var y = matches[i].y;
      board[x][y] = 0;
      $('.x' + x + '.y' + y).addClass('match');
      score += 10;
    }

    tDamage = window.setTimeout(timeDamage, 500);
    var t = window.setTimeout(removeMatches, 300);

    return true;
  }
}

function removeMatches() {
  updateScore(parseInt($('#score-match span').text()));

  for (var i = 0; i < boardSize - 1; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (board[i][j] == 0) {
        var k = i + 1;
        while (board[k][j] == 0 && k < boardSize - 1) {
          k++;
        }
        if (k == boardSize - 1 && board[k][j] == 0) {
        } else {
          var a = $('.x' + k + '.y' + j);
          var b = $('.x' + i + '.y' + j);
          a.css('top', ($('#board-match .tile').width() * (boardSize - i - 1))).removeClass('x' + k).addClass('x' + i);
          b.removeClass('x' + i).addClass('x' + k).css('top', -tileWidth);
          board[i][j] = board[k][j];
          board[k][j] = 0;
        }
      }
    }
  }

  var t = window.setTimeout(function () {
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        if (board[i][j] == 0) {
          board[i][j] = Math.ceil(candyNum * Math.random());
          $('.x' + i + '.y' + j).css('top', (tileWidth * (boardSize - i - 2)))
            .removeClass().addClass('candy' + board[i][j] + ' x' + i + ' y' + j)
            .css('top', (tileWidth * (boardSize - i - 1)));
        }
      }
    }
    var t2 = window.setTimeout(checkMatches, 300);
  }, 300);
}

function updateScore(s) {
  if (s < score) {
    s = s + 1;
    $('#score-match span').text(s);
    var t = window.setTimeout(() => {
      updateScore(s);
    }, 10);
  }
}

function printBoard() {
  for (var i = 0; i < boardSize; i++) {
    var s = '';
    for (var j = 0; j < boardSize; j++) {
      s = s + board[i][j] + ' ';
    }
    console.log(s);
  }
}

var tDamage;

function timeDamage() {
  var hpWidth = ($('#remaining-hp').width() / $('#hp').width()) * 100 - 1;
  $('#remaining-hp').width(hpWidth + '%');

  if (hpWidth < 0) {
    gameOver();
  } else {
    tDamage = window.setTimeout(timeDamage, 500);
  }
}

function gameOver() {
  $('#game-over').fadeIn(200).click(function () {
    $('#board-match > div .tile').remove();
    $('#remaining-hp').width('100%');
    $('#game-over').fadeOut(500);
    var t = window.setTimeout(initBoard, 500);
  });
}

if (!matchExitClicked) {
  initBoard();
}

}

// ========================= MEMORY GAME CODE ============================

function startMemory() {
  const cardDeck = document.querySelector('.memory.deck');	//the score the deck of card

  let cardStack = document.querySelectorAll('.memory.card');	//nodelist of all cards 

  let cardArray = [...cardStack];	// create array initialized to cardStack

  let moves = 0;// initial moves count

  let count = document.querySelector('.memory.moves');// access the 'moves' class to set up event listeners

  const starCount = document.querySelectorAll('.memory.fa-star');// adds stars to array for rating 

  let matchList = 0;//count the number of cards matched

  let timer = document.querySelector('.memory.gameTimer');//access the timer at the top of the game 

  let openCards = [];//array to hold open cards

  //variables for timer
  let second = 0;
  let minute = 0;
  let hour = 0;
  let timePassed;

  let isAnimating = true;// allow additional card clicks to be disabled during animations 

  let endStar = document.querySelector('.memory.rating');// access class "rating" in html 

  let endTime = document.querySelector('.memory.endTime');//access the ending time for the model display 

  let endMoves = document.querySelector('.memory.totalMoves');//access the amount of moves for the model display 

  let starList = document.querySelector('.memory.stars');// access stars to set up for model

  let modelSelector = document.querySelector('.memory.model');// access the class "model" from html 

  let replayButton = document.querySelector('.memory.replay');// target "replay" at top right of screen and triggers displayCards on click 

  replayButton.onclick = displayCards;

  // document.body.onload = displayCards;

  /* @description: changes .restart to a clickable event which triggers the function displayCards
  */
  let replayGame = document.querySelector('.memory.restart');
  replayGame.onclick = displayCards;
  /*
  @param: Name: array, type: array
  @returns: randomized array
  */
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
  /* @description: calls the shuffle function and displays all cards face down
  */
  function displayCards() {
    cardArray = shuffle(cardArray);
    let tempHolder = [];
    for (let i = 0; i < cardArray.length; i++) {
      cardDeck.innerHTML = '';
      tempHolder.forEach.call(cardArray, function (item) {
        cardDeck.appendChild(item);
      });
      cardArray[i].classList.remove('show', 'open', 'match', 'unmatched', 'disabled');
    }
    moves = 0;
    matchList = 0;
    count.innerHTML = 0;
    for (let i = 0; i < starCount.length; i++) {
      starCount[i].style.visibility = 'visible';
    }
    /*starts/restarts timer */
    clearInterval(timePassed);
    /* resets all variables and innerHTML */
    hour = 0;
    minute = 0;
    second = 0;
    timer.innerHTML = hour + ' h ' + minute + ' m ' + second + ' s';
    endTime.innerHTML = '';
    endMoves.innerHTML = '';
    endStar.innerHTML = '';
    openCards = [];
    isAnimating = false;
    modelSelector.classList.remove('show');
    gameTime();
  }
  /* @description: open and compare cards open the cards and pushes it into the array.
   Compares cards and executes code or calls function whether or not they match.
  */
  let openCard = function () {
    if (isAnimating) return;
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
    openCards.push(this);
    let cardCount = openCards.length;
    if (cardCount === 2) {
      movesCounter();
      if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        matchList++;
        for (let i = 0; i < 2; i++) {
          openCards[i].classList.add('match');
          openCards[i].classList.remove('show', 'open');
        }
        openCards = [];
      } else {
        notMatch();
      }
    }
    finished();
  }
  /* @description: sets delay when cards don't match and flips over 
  */
  function notMatch() {
    isAnimating = true;
    for (let i = 0; i < 2; i++) {
      openCards[i].classList.add('unmatched');
    }
    setTimeout(function () {
      isAnimating = false;
      for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove('show', 'open', 'unmatched', 'disabled');
      }
      openCards = [];
    }, 600);
  }
  /* @description: Add 1 each time 2 cards are clicked and updates the moves in index.html. Track moves and adjust star rating.
  */
  function movesCounter() {
    moves++;
    count.innerHTML = moves;
    if (moves < 30 && moves > 23) {
      starCount[2].style.visibility = 'collapse';
    } else if (moves > 30) {
      starCount[1].style.visibility = 'collapse';
    }
  }
  /*@description: game timer
  */
  function gameTime() {
    timePassed = setInterval(function () {
      console.log('set interval')
      timer.innerHTML = hour + ' h ' + minute + ' m ' + second + ' s';
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);
  }
  /* @description: model for when all cards are matched
  */
  function finished() {
    if (matchList === 8) {
      clearInterval(timePassed);
      endTime.innerHTML = timer.innerHTML;
      endMoves.innerHTML = count.innerHTML;
      endStar.innerHTML = starList.innerHTML;
      modelSelector.classList.add('show');
    }
  }
  /* @description: loop through the cards and add event listeners
  */
  for (let i = 0; i < cardArray.length; i++) {
    cardStack = cardArray[i];
    cardStack.addEventListener('click', openCard);
  }
  return displayCards;
}