// ====================== BRAND LOGIC =================
let isSnakeStarted = false;
let resetSnake;

let isRunnerStarted = false;
let stopRunner;
let restartRunner;

let isTowerStarted = false;

let isBirdStarted = false;
let isBirdGameOver = false;
let resetBirdGame;
let startBirdGame;
let restartBirdGame;

let ninjaExitClicked = false;
let roadExitClicked = false;

let startRoadGame;
let stopRoadGame;

let BrandSwiper;
let AchieveSwiper;
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

gamesArray.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    if (index !== gamesArray.length - 1 && index !== gamesArray.length - 2) {
      secondBrandTitle.textContent = elem.querySelector('.brand-first__game-title').textContent;
      firstBrandPage.classList.remove('brand-first_active');
      secondBrandPage.classList.add('brand-second_active');
    }
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
  setTimeout(() => {
    BrandSwiper.destroy();
    AchieveSwiper.destroy();
  }, 500)
  if (secondBrandTitle.textContent.trim() === 'Змейка') {
    secondBrandPage.classList.remove('brand-second_active');
    snakePage.classList.add('snake_active');
    if (isSnakeStarted) {
      resetSnake();
    }
    else {
      resetSnake = startSnake();
      isSnakeStarted = true;
    }
  }
  if (secondBrandTitle.textContent.trim() === 'Пазлы') {
    secondBrandPage.classList.remove('brand-second_active');
    puzzlePage.classList.add('puzzle_active');
    startPuzzle();
  }
  if (secondBrandTitle.textContent.trim() === 'Раннер') {
    secondBrandPage.classList.remove('brand-second_active');
    runnerPage.classList.add('runner_active');
    if (isRunnerStarted) {
      pausePage.classList.remove('pause-page_active');
      scorePage.classList.remove('score-page_active');
      restartPage.classList.remove('restart-page_active');
      resetRunner();
    }
    else {
      isRunnerStarted = true;
      [stopRunner, resetRunner] = startRunner();
    }
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
    secondBrandPage.classList.remove('brand-second_active');
    ninjaPage.classList.add('ninja_active');
    startNinja();
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
});

document.getElementById('ninja-exit').addEventListener('click', () => {
  secondBrandPage.classList.add('brand-second_active');
  ninjaPage.classList.remove('ninja_active');
  ninjaExitClicked = true;
  initSwipers();
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

// ==================== SNAKE CODE ===================
let dom_canvas = document.createElement("canvas");
function startSnake() {
  let dom_replay = document.querySelector("#replay");
  let dom_score = document.querySelector("#score");
  document.querySelector("#canvas-snake").appendChild(dom_canvas);
  let CTX = dom_canvas.getContext("2d");
  const infoPage = document.querySelector('.info-page');
  const infoPageButton = infoPage.querySelector('.info-page__button');
  const infoPageText = infoPage.querySelector('.info-page__text');
  const controlsBlock = document.getElementById('controls');
  const infoPC = document.querySelector('.info-pc');
  const settingsButton = document.querySelector('.settings-btn');
  const settingsPage = document.querySelector('.settings-page');
  const settingsPageClose = settingsPage.querySelector('.settings-page__close');
  const settingsPageInput = settingsPage.querySelector('.settings-page__color-input');
  const settingsPageButton = settingsPage.querySelector('.settings-page__button');
  const settingsPageSpeed = settingsPage.querySelector('#speed');
  document.querySelector('.snake__back').addEventListener('click', () => {
    initSwipers();
    secondBrandPage.classList.add('brand-second_active');
    snakePage.classList.remove('snake_active');
    pause();
  });

  const img = document.querySelector('.controls__arrow');
  let hexSnake = '';
  let speedSnake;
  let buildWalls = false;

  $('.select').each(function () {
    // Variables
    var $this = $(this),
      selectOption = $this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      dur = 500;

    $this.hide();
    // Wrap all in select box
    $this.wrap('<div class="select"></div>');
    // Style box
    $('<div>', {
      class: 'select__gap',
      text: 'Выбрать из списка'
    }).insertAfter($this);

    var selectGap = $this.next('.select__gap'),
      caret = selectGap.find('.caret');
    // Add ul list
    $('<ul>', {
      class: 'select__list'
    }).insertAfter(selectGap);

    var selectList = selectGap.next('.select__list');
    // Add li - option items
    for (var i = 0; i < selectOptionLength; i++) {
      $('<li>', {
        class: 'select__item',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
    // Find all items
    var selectItem = selectList.find('li');

    selectList.slideUp(0);
    selectGap.on('click', function () {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.slideDown(dur);

        selectItem.on('click', function () {
          var chooseItem = $(this).data('value');

          $('select').val(chooseItem).attr('selected', 'selected');
          selectGap.text($(this).find('span').text());

          selectList.slideUp(dur);
          selectGap.removeClass('on');
        });

      } else {
        $(this).removeClass('on');
        selectList.slideUp(dur);
      }
    });

  });

  settingsPageButton.addEventListener('click', () => {
    hexSnake = settingsPageInput.value.trim();
    if (settingsPageSpeed.value === 'low') {
      speedSnake = 15;
    }
    if (settingsPageSpeed.value === 'medium') {
      speedSnake = 5;
    }
    if (settingsPageSpeed.value === 'high') {
      speedSnake = 1;
    }
    reset();
  });

  settingsButton.addEventListener('click', () => {
    settingsPage.classList.add('settings-page_active');
  });

  settingsPageClose.addEventListener('click', () => {
    settingsPage.classList.remove('settings-page_active');
  })

  infoPageButton.addEventListener('click', () => {
    infoPage.classList.remove('info-page_active');
    setTimeout(() => { continiue(); }, 400)
  });
  let detect = new MobileDetect(window.navigator.userAgent);

  if (detect.os() == null) {
    console.log('It is PC');
    controlsBlock.style.display = 'none';
  }

  else {
    infoPC.style.display = 'none';
  }

  const W = (dom_canvas.width = 300);
  const H = (dom_canvas.height = 300);

  let snake,
    food,
    currentHue,
    cells = 20,
    cellSize,
    walls,
    isGameOver = false,
    tails = [],
    score = 0,
    maxScore = window.localStorage.getItem("maxScore") || undefined,
    particles = [],
    splashingParticleCount = 20,
    cellsCount,
    requestID;

  let helpers = {
    Vec: class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }
      mult(v) {
        if (v instanceof helpers.Vec) {
          this.x *= v.x;
          this.y *= v.y;
          return this;
        } else {
          this.x *= v;
          this.y *= v;
          return this;
        }
      }
    },
    isCollision(v1, v2) {
      return v1.x == v2.x && v1.y == v2.y;
    },
    garbageCollector() {
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].size <= 0) {
          particles.splice(i, 1);
        }
      }
    },
    drawGrid() {
      CTX.lineWidth = 1.1;
      CTX.strokeStyle = "#232332";
      CTX.shadowBlur = 0;
      for (let i = 1; i < cells; i++) {
        let f = (W / cells) * i;
        CTX.beginPath();
        CTX.moveTo(f, 0);
        CTX.lineTo(f, H);
        CTX.stroke();
        CTX.beginPath();
        CTX.moveTo(0, f);
        CTX.lineTo(W, f);
        CTX.stroke();
        CTX.closePath();
      }
    },
    randHue() {
      return ~~(Math.random() * 360);
    },
    hsl2rgb(hue, saturation, lightness) {
      if (hue == undefined) {
        return [0, 0, 0];
      }
      var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
      var huePrime = hue / 60;
      var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

      huePrime = ~~huePrime;
      var red;
      var green;
      var blue;

      if (huePrime === 0) {
        red = chroma;
        green = secondComponent;
        blue = 0;
      } else if (huePrime === 1) {
        red = secondComponent;
        green = chroma;
        blue = 0;
      } else if (huePrime === 2) {
        red = 0;
        green = chroma;
        blue = secondComponent;
      } else if (huePrime === 3) {
        red = 0;
        green = secondComponent;
        blue = chroma;
      } else if (huePrime === 4) {
        red = secondComponent;
        green = 0;
        blue = chroma;
      } else if (huePrime === 5) {
        red = chroma;
        green = 0;
        blue = secondComponent;
      }

      var lightnessAdjustment = lightness - chroma / 2;
      red += lightnessAdjustment;
      green += lightnessAdjustment;
      blue += lightnessAdjustment;

      return [
        Math.round(red * 255),
        Math.round(green * 255),
        Math.round(blue * 255)
      ];
    },
    lerp(start, end, t) {
      return start * (1 - t) + end * t;
    }
  };

  let KEY = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    resetState() {
      this.ArrowUp = false;
      this.ArrowRight = false;
      this.ArrowDown = false;
      this.ArrowLeft = false;
    },
    listenMobile() {
      if (detect.os() == null) {
        let directionName;
        addEventListener(
          "keydown",
          (e) => {
            if (e.key === "w" && this.ArrowDown) return;
            if (e.key === "s" && this.ArrowUp) return;
            if (e.key === "a" && this.ArrowRight) return;
            if (e.key === "d" && this.ArrowLeft) return;
            switch (e.key) {
              case "w":
                this.ArrowUp = true;
                directionName = 'ArrowUp';
                break;
              case "s":
                this.ArrowDown = true;
                directionName = 'ArrowDown';
                break;
              case "a":
                this.ArrowLeft = true;
                directionName = 'ArrowLeft';
                break;
              case "d":
                this.ArrowRight = true;
                directionName = 'ArrowRight';
                break;
              default:
                break;
            }
            Object.keys(this)
              .filter((f) => f !== directionName && f !== "listenMobile" && f !== "resetState")
              .forEach((k) => {
                this[k] = false;
              });
          },
          false
        );
      }
      else {
        addEventListener(
          "touchstart",
          (e) => {
            if (e.target.id === "ArrowUp" && this.ArrowDown) return;
            if (e.target.id === "ArrowDown" && this.ArrowUp) return;
            if (e.target.id === "ArrowLeft" && this.ArrowRight) return;
            if (e.target.id === "ArrowRight" && this.ArrowLeft) return;
            switch (e.target.id) {
              case "ArrowUp":
                this.ArrowUp = true;
                break;
              case "ArrowDown":
                this.ArrowDown = true;
                break;
              case "ArrowLeft":
                this.ArrowLeft = true;
                break;
              case "ArrowRight":
                this.ArrowRight = true;
                break;
              default:
                break;
            }
            Object.keys(this)
              .filter((f) => f !== e.target.id && f !== "listenMobile" && f !== "resetState")
              .forEach((k) => {
                this[k] = false;
              });
          },
          false
        );
      }
    }
  };

  class Snake {
    constructor(i, type) {
      this.pos = new helpers.Vec(W / 2, H / 2);
      this.dir = new helpers.Vec(0, 0);
      this.type = type;
      this.index = i;
      this.delay = speedSnake ? speedSnake : 5;
      this.size = W / cells;
      this.color = hexSnake ? hexSnake : "white";
      this.history = [];
      this.total = 1;
    }
    draw() {
      let { x, y } = this.pos;
      CTX.fillStyle = this.color;
      CTX.shadowBlur = 20;
      // CTX.shadowColor = "rgba(255,255,255,.3 )";
      CTX.fillRect(x, y, this.size, this.size);
      CTX.shadowBlur = 0;
      if (this.total >= 2) {
        for (let i = 0; i < this.history.length - 1; i++) {
          let { x, y } = this.history[i];
          CTX.lineWidth = 1;
          CTX.fillStyle = hexSnake ? hexSnake : "white";
          CTX.fillRect(x, y, this.size, this.size);
        }
      }
    }
    walls() {
      let { x, y } = this.pos;
      if (x + cellSize > W) {
        this.pos.x = 0;
      }
      if (y + cellSize > W) {
        this.pos.y = 0;
      }
      if (y < 0) {
        this.pos.y = H - cellSize;
      }
      if (x < 0) {
        this.pos.x = W - cellSize;
      }
    }
    controlls() {
      let dir = this.size;
      if (KEY.ArrowUp) {
        this.dir = new helpers.Vec(0, -dir);
      }
      if (KEY.ArrowDown) {
        this.dir = new helpers.Vec(0, dir);
      }
      if (KEY.ArrowLeft) {
        this.dir = new helpers.Vec(-dir, 0);
      }
      if (KEY.ArrowRight) {
        this.dir = new helpers.Vec(dir, 0);
      }
    }
    wallsCollision() {
      walls.pos.forEach((elem) => {
        if (helpers.isCollision(this.pos, elem)) {
          isGameOver = true;
        }
      });
    }
    selfCollision() {
      for (let i = 0; i < this.history.length; i++) {
        let p = this.history[i];
        if (helpers.isCollision(this.pos, p)) {
          isGameOver = true;
        }
      }
    }
    update() {
      this.walls();
      this.draw();
      if (buildWalls) {
        this.wallsCollision();
      }
      this.controlls();
      if (!this.delay--) {
        if (helpers.isCollision(this.pos, food.pos)) {
          incrementScore();
          particleSplash();
          food.spawn();
          this.total++;
        }
        this.history[this.total - 1] = new helpers.Vec(this.pos.x, this.pos.y);
        for (let i = 0; i < this.total - 1; i++) {
          this.history[i] = this.history[i + 1];
        }
        this.pos.add(this.dir);
        this.delay = speedSnake ? speedSnake : 5;
        this.total > 3 ? this.selfCollision() : null;
      }
    }
  }

  class Walls {
    constructor() {
      this.pos = [new helpers.Vec(W / 20, H / 2), new helpers.Vec(W / 10, H / 2), new helpers.Vec(W / 5, H / 2), new helpers.Vec(W / 5, H / 20), new helpers.Vec(W / 5, H / 10), new helpers.Vec(W / 5, H / 5), new helpers.Vec(W / 10, H / 2), new helpers.Vec(W / 4, H / 5)];
    }
    draw() {
      if (buildWalls) {
        this.pos.forEach((elem) => {
          let { x, y } = elem;
          CTX.fillStyle = "black";
          CTX.fillRect(x, y, cellSize, cellSize);
        });
      }
    }
  }

  class Food {
    constructor() {
      this.pos = new helpers.Vec(
        ~~(Math.random() * cells) * cellSize,
        ~~(Math.random() * cells) * cellSize
      );
      this.color = currentHue = `hsl(${~~(Math.random() * 360)},100%,50%)`;
      this.size = cellSize;
    }
    draw() {
      let { x, y } = this.pos;
      CTX.globalCompositeOperation = "lighter";
      CTX.shadowBlur = 20;
      CTX.shadowColor = this.color;
      CTX.fillStyle = this.color;
      if (score === 1) {
        CTX.drawImage(img, x, y, this.size, this.size);
      }
      else if (score === 4) {
        CTX.drawImage(img, x, y, this.size, this.size);
      }
      else {
        CTX.fillRect(x, y, this.size, this.size);
      }
      CTX.globalCompositeOperation = "source-over";
      CTX.shadowBlur = 0;
    }
    wallsCollision(x, y) {
      this.bool = false;
      walls.pos.forEach((elem) => {
        if (elem.x == x && elem.y == y) {
          this.bool = true;
          return;
        }
      });
    }
    spawn() {
      let randX = ~~(Math.random() * cells) * this.size;
      let randY = ~~(Math.random() * cells) * this.size;
      // if (buildWalls) {
      //   this.wallsCollision(randX, randY);
      //   while (this.bool) {
      //     randX = ~~(Math.random() * cells) * this.size;
      //     randY = ~~(Math.random() * cells) * this.size;
      //     this.wallsCollision(randX, randY);
      //   }
      // }
      this.wallsCollision(randX, randY);
      while (this.bool) {
        randX = ~~(Math.random() * cells) * this.size;
        randY = ~~(Math.random() * cells) * this.size;
        this.wallsCollision(randX, randY);
      }
      for (let path of snake.history) {
        if (helpers.isCollision(new helpers.Vec(randX, randY), path)) {
          return this.spawn();
        }
      }
      this.color = currentHue = `hsl(${helpers.randHue()}, 100%, 50%)`;
      this.pos = new helpers.Vec(randX, randY);
    }
  }

  class Particle {
    constructor(pos, color, size, vel) {
      this.pos = pos;
      this.color = color;
      this.size = Math.abs(size / 2);
      this.ttl = 0;
      this.gravity = -0.2;
      this.vel = vel;
    }
    draw() {
      let { x, y } = this.pos;
      let hsl = this.color
        .split("")
        .filter((l) => l.match(/[^hsl()$% ]/g))
        .join("")
        .split(",")
        .map((n) => +n);
      let [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100);
      CTX.shadowColor = `rgb(${r},${g},${b},${1})`;
      CTX.shadowBlur = 0;
      CTX.globalCompositeOperation = "lighter";
      CTX.fillStyle = `rgb(${r},${g},${b},${1})`;
      CTX.fillRect(x, y, this.size, this.size);
      CTX.globalCompositeOperation = "source-over";
    }
    update() {
      this.draw();
      this.size -= 0.3;
      this.ttl += 1;
      this.pos.add(this.vel);
      this.vel.y -= this.gravity;
    }
  }

  function incrementScore() {
    score++;
    dom_score.innerText = score.toString().padStart(2, "0");
    if (score === 2) {
      buildWalls = true;
      pause();
      infoPage.classList.add('info-page_active');
    }
    if (score === 5) {
      buildWalls = false;
      pause();
      infoPageText.textContent = 'Поздравляем, ты снова собрал стрелочку! Теперь кайфуй без препятствий.';
      infoPage.classList.add('info-page_active');
    }
  }

  function particleSplash() {
    for (let i = 0; i < splashingParticleCount; i++) {
      let vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3);
      let position = new helpers.Vec(food.pos.x, food.pos.y);
      particles.push(new Particle(position, currentHue, food.size, vel));
    }
  }

  function clear() {
    CTX.clearRect(0, 0, W, H);
  }

  function initialize() {
    CTX.imageSmoothingEnabled = false;
    KEY.listenMobile();
    cellsCount = cells * cells;
    cellSize = W / cells;
    snake = new Snake();
    food = new Food();
    walls = new Walls();
    dom_replay.addEventListener("click", reset, false);
    loop();
  }

  function loop() {
    clear();
    if (!isGameOver) {
      requestID = setTimeout(loop, 1000 / 60);
      helpers.drawGrid();
      snake.update();
      food.draw();
      walls.draw();
      for (let p of particles) {
        p.update();
      }
      helpers.garbageCollector();
    } else {
      clear();
      gameOver();
    }
  }

  function pause() {
    clearTimeout(requestID);
  }

  function continiue() {
    requestID = setTimeout(loop, 1000 / 60);
  }

  function gameOver() {
    infoPageText.textContent = 'Ты поймал волшебную стрелку! Теперь появились чёрные препятствия, избегай их.';
    maxScore ? null : (maxScore = score);
    score > maxScore ? (maxScore = score) : null;
    window.localStorage.setItem("maxScore", maxScore);
    CTX.fillStyle = "#4cffd7";
    CTX.textAlign = "center";
    CTX.font = "bold 30px Poppins, sans-serif";
    CTX.fillText("КОНЕЦ", W / 2, H / 2);
    CTX.font = "15px Poppins, sans-serif";
    CTX.fillText(`СЧЁТ:   ${score}`, W / 2, H / 2 + 60);
    CTX.fillText(`МАКС. СЧЁТ:   ${maxScore}`, W / 2, H / 2 + 80);
  }

  function reset() {
    infoPageText.textContent = 'Ты поймал волшебную стрелку! Теперь появились чёрные препятствия, избегай их.';
    dom_score.innerText = "00";
    score = "00";
    snake = new Snake();
    buildWalls = false;
    food.spawn();
    KEY.resetState();
    isGameOver = false;
    clearTimeout(requestID);
    loop();
  }
  initialize();
  return reset;
}

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

// ======================= RUNNER GAME ===================
const pausePage = document.querySelector('.pause-page');
const scorePage = document.querySelector('.score-page');
const restartPage = document.querySelector('.restart-page');

function startRunner() {
  let carWidth = 201 * 0.14;
  let carHeight = 512 * 0.14;
  let obstacleCount = 3;
  let coinGenerationTimeout;
  let scoreCount = 0;
  let detect = new MobileDetect(window.navigator.userAgent);
  const pauseBtn = document.querySelector('.pause');
  const pausePageContinue = pausePage.querySelector('.pause-page__btn_continue');
  const pausePageRestart = pausePage.querySelector('.pause-page__btn_restart');
  const arrowLeft = document.querySelector('.arrow-btn_left');
  const arrowRight = document.querySelector('.arrow-btn_right');
  const score = document.querySelector('.score');
  const scoreButton = scorePage.querySelector('.score-page__btn');
  const scorePageText = scorePage.querySelector('.score-page__text');
  const restartButton = restartPage.querySelector('.restart-page__btn');

  class Road {
    constructor(image, y) {
      this.x = 0;
      this.y = y;
      this.loaded = false;

      this.image = new Image();

      var obj = this;

      this.image.addEventListener("load", function () {
        obj.loaded = true;
      });

      this.image.src = image;
    }

    Update(road) {
      this.y += speed; //The image will move down with every frame

      if (this.y > window.innerHeight) {
        this.y = road.y - canvas.height + speed;
      }
    }
  }

  class Car {
    constructor(image, x, y, isPlayer) {
      this.x = x;
      this.y = y;
      this.loaded = false;
      this.dead = false;
      this.paused = false;
      this.isPlayer = isPlayer;

      this.image = new Image();

      var obj = this;

      this.image.addEventListener("load", function () {
        obj.loaded = true;
      });

      this.image.src = image;
    }

    Update() {
      if (!this.isPlayer) {
        this.y += speed;
      }

      if (this.y > canvas.height + 50) {
        this.dead = true;
      }
    }

    Collide(car) {
      var hit = false;

      if (
        this.y < car.y + car.image.height * scale &&
        this.y + this.image.height * scale > car.y
      ) {
        // If there is collision by y
        if (
          this.x + this.image.width * scale > car.x &&
          this.x < car.x + car.image.width * scale
        ) {
          // If there is collision by x
          hit = true;
        }
      }

      return hit;
    }

    // Move(v, direction) {
    //   if (v == "x") {
    //     const step = canvas.width / 3;
    //     // Moving on x
    //     if (direction == "left") {
    //       if (this.x < 130) {
    //         return;
    //       } else {
    //         this.x -= step;
    //       }
    //     }
    //     if (direction == "right") {
    //       this.x += step;
    //     }

    //     // Rolling back the changes if the car left the screen
    //     if (this.x + this.image.width * scale > canvas.width) {
    //       this.x -= step;
    //     }

    //     if (this.x < 0) {
    //       this.x = 0;
    //     }
    //   }
    // }
    Move(v, direction, speedMultiplier = 6) {
      if (v == "x" && !this.isAnimating) {
        this.isAnimating = true;

        const targetX = (direction == "left") ? Math.max(0, this.x - canvas.width / 3) :
          Math.min(canvas.width - this.image.width * scale, this.x + canvas.width / 3);

        // Check if the car is in the extreme lanes
        if ((this.x <= 130 && direction == "left") || (this.x + this.image.width * scale > canvas.width * 0.8 && direction == "right")) {
          this.isAnimating = false;
          return;
        }

        const step = (targetX - this.x > 0) ? canvas.width / 200 * speedMultiplier : -canvas.width / 200 * speedMultiplier;

        const move = () => {
          if ((direction == "left" && this.x > targetX) || (direction == "right" && this.x < targetX)) {
            this.x += step;

            if ((direction == "left" && this.x <= targetX) || (direction == "right" && this.x >= targetX)) {
              this.x = targetX;
              this.isAnimating = false;
            } else {
              requestAnimationFrame(move);
            }
          }
        };

        move();
      }
    }
  }

  class Coin {
    constructor(image, x, y) {
      this.x = x;
      this.y = y;
      this.loaded = false;
      this.dead = false;

      this.image = new Image();

      var obj = this;

      this.image.addEventListener("load", function () {
        obj.loaded = true;
      });

      this.image.src = image;
    }

    Update() {
      this.y += speed;

      if (this.y > canvas.height + 50) {
        this.dead = true;
      }
    }

    Collide(car) {
      var hit = false;

      if (
        this.y < car.y + car.image.height * scale &&
        this.y + this.image.height * scale > car.y
      ) {
        // If there is collision by y
        if (
          this.x + this.image.width * scale > car.x &&
          this.x < car.x + car.image.width * scale
        ) {
          // If there is collision by x
          hit = true;
        }
      }

      return hit;
    }
  }

  var coins = [];

  var canvas = document.getElementById("canvas-runner"); // Getting the canvas from DOM
  var ctx = canvas.getContext("2d"); // Getting the context to work with the canvas

  var scale = 0.13; // Cars scale

  Resize(); // Changing the canvas size on startup

  window.addEventListener("resize", Resize); // Change the canvas size with the window size

  // Forbidding opening the context menu to make the game play better on mobile devices
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  window.addEventListener("keydown", function (e) {
    KeyDown(e);
  }); // Listening for keyboard events
  arrowLeft.addEventListener("touchstart", () => {
    ButtonDown("left");
  });
  arrowRight.addEventListener("touchstart", () => {
    ButtonDown("right");
  });
  if (detect.os() == null) {
    arrowLeft.addEventListener("click", () => {
      ButtonDown("left");
    });
    arrowRight.addEventListener("click", () => {
      ButtonDown("right");
    });
  }

  var objects = []; // Game objects

  var roads = [
    new Road("./assets/runner/images/road.png", 0),
    new Road("./assets/runner/images/road.png", canvas.height),
  ]; // Backgrounds
  var player = new Car(
    "./assets/runner/images/car.png",
    canvas.width / 2 - carWidth,
    canvas.height / 2,
    true
  ); // Player's object
  var speed = 6;

  Start();

  var animationId;

  function Start() {
    if (!player.dead) {
      animationId = requestAnimationFrame(Update);
    }
  }

  function Stop() {
    cancelAnimationFrame(animationId);
    clearTimeout(obstacleGenerationTimeout);
    clearTimeout(coinGenerationTimeout);
    animationId = null;
    obstacleGenerationTimeout = null;
    coinGenerationTimeout = null;
  }

  function random1to3() {
    // случайное число от 1 до 3
    let rand = 1 + Math.random() * (3 + 1 - 1);
    return Math.floor(rand);
  }

  function randomLane() {
    const lane = random1to3();
    if (lane === 1) {
      return canvas.width / 6 - carWidth;
    }
    if (lane === 2) {
      return canvas.width / 2 - carWidth;
    }
    if (lane === 3) {
      return 2 * (canvas.width / 3) + canvas.width / 6 - carWidth;
    }
  }

  // ... (предыдущий код)

  function generateObstacle() {
    if (objects.length < obstacleCount) {
      const lane = random1to3();
      const obstacleX = (lane === 1) ? canvas.width / 6 - carWidth :
        (lane === 2) ? canvas.width / 2 - carWidth :
          2 * (canvas.width / 3) + canvas.width / 6 - carWidth;

      const obstacleY = getRandomHeight();

      if (!objects.some(obstacle => Math.abs(obstacle.x - obstacleX) < carWidth &&
        Math.abs(obstacle.y - obstacleY) < carHeight) &&
        !coins.some(coin => Math.abs(coin.x - obstacleX) < carWidth &&
          Math.abs(coin.y - obstacleY) < carHeight)) {
        objects.push(
          new Car(
            "./assets/runner/images/car_red.png",
            obstacleX,
            -700,
            false
          )
        );
      }
    }

    obstacleGenerationTimeout = setTimeout(generateObstacle, 1000); // Задержка в миллисекундах между генерациями
  }

  function generateCoin() {
    if (coins.length < obstacleCount) {
      const lane = random1to3();
      const coinX = (lane === 1) ? canvas.width / 6 - carWidth :
        (lane === 2) ? canvas.width / 2 - carWidth :
          2 * (canvas.width / 3) + canvas.width / 6 - carWidth;

      const coinY = getRandomHeight();

      if (!coins.some(coin => Math.abs(coin.x - coinX) < carWidth &&
        Math.abs(coin.y - coinY) < carHeight) &&
        !objects.some(obstacle => Math.abs(obstacle.x - coinX) < carWidth &&
          Math.abs(obstacle.y - coinY) < carHeight))
        coins.push(
          new Coin(
            "./assets/runner/images/coin.png",
            coinX,
            RandomInteger(250, 400) * -1
          )
        );

    }

    coinGenerationTimeout = setTimeout(generateCoin, 1000); // Задержка в миллисекундах между генерациями
  }

  function getRandomHeight() {
    return -canvas.height * 0.5 + Math.random() * (canvas.height * 0.5);
  }

  function RandomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  var obstacleGenerationTimeout;


  function Update() {
    roads[0].Update(roads[1]);
    roads[1].Update(roads[0]);

    if (!obstacleGenerationTimeout) {
      generateObstacle(); // Запуск первой генерации
    }
    generateCoin();

    player.Update();

    if (player.dead) {
      Stop();
    }
    else if (player.paused) {
      Stop();
    }

    let isDead = false;

    let isCoinDead = false;

    for (let i = 0; i < objects.length; i++) {
      objects[i].Update();

      if (objects[i].dead) {
        isDead = true;
      }
    }

    if (isDead) {
      objects.shift();
    }

    for (let i = 0; i < coins.length; i++) {
      coins[i].Update();

      if (coins[i].dead) {
        isCoinDead = true;
      }
    }

    if (isCoinDead) {
      coins.shift();
    }

    let hit = false;

    for (let i = 0; i < objects.length; i++) {
      hit = player.Collide(objects[i]);

      if (hit) {
        Stop();
        player.dead = true;
        restartPage.classList.add('restart-page_active');
        break;
      }
    }

    for (let i = 0; i < coins.length; i++) {
      hit = player.Collide(coins[i]);

      if (hit) {
        scoreCount++;
        score.textContent = `Счёт: ${scoreCount}`;
        coins.splice(i, 1); // Удалить монетку при столкновении
        if (scoreCount === 10) {
          player.dead = true;
          Stop();
          scorePageText.textContent = `Поздравляю, ты собрал 10 канистр. Ускоряемся и скорее ждём тебя в уличных гонках!`;
          scorePage.classList.add('score-page_active');
        }
        break;
      }
    }

    Draw();
    if (!player.dead) {
      animationId = requestAnimationFrame(Update);
    }
  }

  function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearing the canvas

    for (let i = 0; i < roads.length; i++) {
      ctx.drawImage(
        roads[i].image, // Image
        0, // First X on image
        0, // First Y on image
        roads[i].image.width, // End X on image
        roads[i].image.height, // End Y on image
        roads[i].x, // X on canvas
        roads[i].y, // Y on canvas
        canvas.width, // Width on canvas
        canvas.height // Height on canvas
      );
    }

    DrawCar(player);

    for (let i = 0; i < objects.length; i++) {
      DrawCar(objects[i]);
    }

    for (let i = 0; i < coins.length; i++) {
      DrawCar(coins[i]);
    }
  }

  function DrawCar(car) {
    ctx.drawImage(
      car.image,
      0,
      0,
      car.image.width,
      car.image.height,
      car.x,
      car.y,
      car.image.width * scale,
      car.image.height * scale
    );
  }

  function KeyDown(e) {
    switch (e.keyCode) {
      case 37:
        // Left
        player.Move("x", "left");
        break;

      case 39:
        // Right
        player.Move("x", "right");
        break;
    }
  }

  function ButtonDown(side) {
    switch (side) {
      case "left":
        player.Move("x", "left");
        break;
      case "right":
        player.Move("x", "right");
        break;
    }
  }

  function Restart() {
    // Сбросить счёт
    scoreCount = 0;
    score.textContent = 'Счёт: 0';

    // Очистить массивы объектов
    objects = [];
    coins = [];

    // Сбросить позицию игрока
    player.x = canvas.width / 2 - carWidth;
    player.y = canvas.height / 2;

    // Сбросить флаги
    player.dead = false;
    player.paused = false;
    speed = 6;

    // Запустить игру заново
    Start();
  }

  function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function setObstacleCount(newCount) {
    obstacleCount = newCount;
  }

  pauseBtn.addEventListener('click', () => {
    Stop();
    pausePage.classList.add('pause-page_active');
  });

  pausePageContinue.addEventListener('click', () => {
    pausePage.classList.remove('pause-page_active');
    setTimeout(() => {
      Start();
    }, 200)
  });

  pausePageRestart.addEventListener('click', () => {
    Restart();
    pausePage.classList.remove('pause-page_active');
  });

  scoreButton.addEventListener('click', () => {
    scorePage.classList.remove('score-page_active');
    setTimeout(() => {
      speed = 13;
      player.dead = false;
      Start();
    }, 200)
  });

  restartButton.addEventListener('click', () => {
    Restart();
    restartPage.classList.remove('restart-page_active');
  });
  return [Stop, Restart];
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

// ================ NINJA GAME CODE ==================
function startNinja() {
  if (ninjaExitClicked) {
    return
  }
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
  let detect = new MobileDetect(window.navigator.userAgent);
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

  const ctx = canvas.getContext("2d");

  const introductionElement = document.getElementById("introduction");
  const perfectElement = document.getElementById("perfect");
  const restartButton = document.getElementById("restart");
  const exitButton = document.getElementById('ninja-exit');
  const scoreElement = document.getElementById("score-ninja");

  // Initialize layout
  resetGame();

  // Resets game variables and layouts but does not start the game (game starts on keypress)
  function resetGame() {
    // Reset game progress
    phase = "waiting";
    lastTimestamp = undefined;
    sceneOffset = 0;
    score = 0;

    introductionElement.style.opacity = 1;
    perfectElement.style.opacity = 0;
    restartButton.style.display = "none";
    exitButton.style.display = "none";
    scoreElement.innerText = score;

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

  if (detect.os() == null) {
    // If space was pressed restart the game
    window.addEventListener("keydown", function (event) {
      if (event.key == " ") {
        event.preventDefault();
        resetGame();
        return;
      }
    });

    window.addEventListener("mousedown", function (event) {
      if (phase == "waiting") {
        lastTimestamp = undefined;
        introductionElement.style.opacity = 0;
        phase = "stretching";
        window.requestAnimationFrame(animate);
      }
    });
    window.addEventListener("mouseup", function (event) {
      if (phase == "stretching") {
        phase = "turning";
      }
    });
  }
  else {
    window.addEventListener("touchstart", function (event) {
      if (phase == "waiting") {
        lastTimestamp = undefined;
        introductionElement.style.opacity = 0;
        phase = "stretching";
        window.requestAnimationFrame(animate);
      }
    });
    window.addEventListener("touchend", function (event) {
      if (phase == "stretching") {
        phase = "turning";
      }
    });
  }
  window.addEventListener("resize", function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  });

  window.requestAnimationFrame(animate);

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
            scoreElement.innerText = score;

            if (perfectHit) {
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
        if (sticks.last().rotation < 180)
          sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

        heroY += (timestamp - lastTimestamp) / fallingSpeed;
        const maxHeroY =
          platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
        if (heroY > maxHeroY) {
          exitButton.style.display = 'block';
          restartButton.style.display = "block";
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

    drawBackground();

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
    resetGame();
    restartButton.style.display = "none";
    exitButton.style.display = 'none';
  });

  function drawPlatforms() {
    platforms.forEach(({ x, w }) => {
      // Draw platform
      ctx.fillStyle = "black";
      ctx.fillRect(
        x,
        canvasHeight - platformHeight,
        w,
        platformHeight + (window.innerHeight - canvasHeight) / 2
      );

      // Draw perfect area only if hero did not yet reach the platform
      if (sticks.last().x < x) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          x + w / 2 - perfectAreaSize / 2,
          canvasHeight - platformHeight,
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

    // Body
    drawRoundedRect(
      -heroWidth / 2,
      -heroHeight / 2,
      heroWidth,
      heroHeight - 4,
      5
    );

    // Legs
    const legDistance = 5;
    ctx.beginPath();
    ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx.fill();

    // Eye
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
    ctx.fill();

    // Band
    ctx.fillStyle = "red";
    ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
    ctx.beginPath();
    ctx.moveTo(-9, -14.5);
    ctx.lineTo(-17, -18.5);
    ctx.lineTo(-14, -8.5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -10.5);
    ctx.lineTo(-15, -3.5);
    ctx.lineTo(-5, -7);
    ctx.fill();

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
      ctx.translate(stick.x, canvasHeight - platformHeight);
      ctx.rotate((Math.PI / 180) * stick.rotation);

      // Draw stick
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -stick.length);
      ctx.stroke();

      // Restore transformations
      ctx.restore();
    });
  }

  function drawBackground() {
    // Draw sky
    var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient.addColorStop(0, "#BBD691");
    gradient.addColorStop(1, "#FEF1E1");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw hills
    drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#95C629");
    drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#659F1C");

    // Draw trees
    trees.forEach((tree) => drawTree(tree.x, tree.color));
  }

  // A hill is a shape under a stretched out sinus wave
  function drawHill(baseHeight, amplitude, stretch, color) {
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
    for (let i = 0; i < window.innerWidth; i++) {
      ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
    }
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawTree(x, color) {
    ctx.save();
    ctx.translate(
      (-sceneOffset * backgroundSpeedMultiplier + x) * hill1Stretch,
      getTreeY(x, hill1BaseHeight, hill1Amplitude)
    );

    const treeTrunkHeight = 5;
    const treeTrunkWidth = 2;
    const treeCrownHeight = 25;
    const treeCrownWidth = 10;

    // Draw trunk
    ctx.fillStyle = "#7D833C";
    ctx.fillRect(
      -treeTrunkWidth / 2,
      -treeTrunkHeight,
      treeTrunkWidth,
      treeTrunkHeight
    );

    // Draw crown
    ctx.beginPath();
    ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
    ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
    ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  }

  function getHillY(windowX, baseHeight, amplitude, stretch) {
    const sineBaseY = window.innerHeight - baseHeight;
    return (
      Math.sinus((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
      amplitude +
      sineBaseY
    );
  }

  function getTreeY(x, baseHeight, amplitude) {
    const sineBaseY = window.innerHeight - baseHeight;
    return Math.sinus(x) * amplitude + sineBaseY;
  }

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


