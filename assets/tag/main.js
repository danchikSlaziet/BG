function getRandomBool() {
  if (Math.floor(Math.random() * 2) === 0) {
    return true;
  }
}
const memeTexts = [
  {title: `«Палка в колеса»`, text: `Автор оригинального комикса – французский карикатурист Корентин Пенлоуп. Он опубликовал изображение в своем блоге 23 января 2011 года под названием Baton roue (фр. “Палка в колесо”).`},
  {title: `«Очки ннада?»`, text: `Китайца из ролика зовут Тун Те Цзюнь. Он торговал сувенирами на остановках и в автобусах, следующих по маршруту “Владивосток-Суйфэньхэ”. Первое видео с ним появилось еще в 2008 году`},
  {title: `«Сомневающийся фрай»`, text: `Кадр с прищуренным Фраем, ставший шаблоном для мема, взят из шестого эпизода второго сезона мультсериала «Футурама» (Futurama). ТВ-код серии – S02E11, название – «The Lesser of Two Evils» (“Меньшее из двух зол”).`},
  {title: `«Гарольд скрывающий боль»`, text: `Впервые деда в качестве шутки использовали на сайте Facepunch от 13 сентября 2011 года: стоковую фотографии с ним опубликовал пользователь под ником Greenen72. Неизвестный на тот момент персонаж получил свое первое прозвище – «Гарольд, скрывающий боль».`},
  {title: `«Девочка с хвостиками»`, text: `Кадр с удивленной девочкой с хвостиками взят из американского сериала “Держись, Чарли!” (Good luck Charlie), который начал выходить в 2010 году. Момент, который стал мемом, был показан в 2011 году в серии “Знакомство с родителями”.`},
  {title: `«Кандибобер»`, text: `Всё началось с социологического опроса, который в 2010 году проводился на улицах Минска. Ролик был снят на площади Якуба Коласа. Тема опроса: странные имена. Одним из респондентов оказалась странная дама в красном тюрбане на голове. Вот что она сказала:`},
  {title: `«Ломай меня полностью»`, text: `Видео появилось на YouTube 15 июня 2010 года (оригинал удален). Персонажа зовут Шайдабек Эседуллаев, он по национальности лезгин. В ролике появился порядком выпившим. Место действия — город Гусь-Хрустальный Владимирской области.`},
  {title: `«Доге (Doge)»`, text: `23 февраля 2010 воспитательница японского детского сада Ацуко Сато опубликовала в своём блоге несколько фотографий Кабосу – собаки породы сиба-ину, которую женщина спасла и приютила. Среди этих снимков была и фотография с поднятой бровью, которая и стала основой мема Doge.`},
  {title: `«И так сойдет»`, text: `Мультфильм “Вовка в тридевятом царстве вышел” студии Союзмультфильм вышел в 1965 году. 
  По сюжету мальчик Вова мечтает жить в сказке и ничего не делать. Он попадает в книгу сказок и делает то, от чего страдают другие сказочные герои.  Свою плохую работу он оправдывает фразой “И так сойдет”.`},
  {title: `«Ну давай расскажи мне»`, text: `На картинке изображен персонаж актера Джина Уайлдера из старого доброго фильма (1971 год выпуска) под названием «Вилли Вонка и шоколадная фабрика». Его лицо якобы выражает эмоцию заинтересованности, но со скрытой злорадной усмешкой и проницательным взглядом, который видит собеседника насквозь.`},
]
let meme1 = new Array(16);
let meme2 = new Array(16);
let meme3 = new Array(16);
let meme4 = new Array(16);
let meme5 = new Array(16);
let meme6 = new Array(16);
let meme7 = new Array(16);
let meme8 = new Array(16);
let meme9 = new Array(16);
let meme10 = new Array(16);
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme1[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme1[i] = img;
    };
    img.src = `./images/number-${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme2[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme2[i] = img;
    };
    img.src = `./images/number-2${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme3[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme3[i] = img;
    };
    img.src = `./images/number-3${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme4[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme4[i] = img;
    };
    img.src = `./images/number-4${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme5[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme5[i] = img;
    };
    img.src = `./images/number-5${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme6[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme6[i] = img;
    };
    img.src = `./images/number-6${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme7[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme7[i] = img;
    };
    img.src = `./images/number-7${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme8[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme8[i] = img;
    };
    img.src = `./images/number-8${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme9[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme9[i] = img;
    };
    img.src = `./images/number-9${i}.png`;
  }
}
for (let i = 0; i < 16; i++) {
  if (i === 0) {
    const img = new Image();
    img.onload = function() {
      meme10[0] = img;
    };
    img.src = `./images/number-0.png`;
  }
  else {
    const img = new Image();
    img.onload = function() {
      meme10[i] = img;
    };
    img.src = `./images/number-10${i}.png`;
  }
}

function fillState(imgArray) {
  return [
    [{number: 1,image: imgArray[1]},{number: 2,image: imgArray[2]},{number: 3,image: imgArray[3]},{number: 4,image: imgArray[4]}],
    [{number: 5,image: imgArray[5]},{number: 6,image: imgArray[6]},{number: 7,image: imgArray[7]},{number: 8,image: imgArray[8]}],
    [{number: 9,image: imgArray[9]},{number: 10,image: imgArray[10]},{number: 11,image: imgArray[11]},{number: 12,image: imgArray[12]}],
    [{number: 13,image: imgArray[13]},{number: 14,image: imgArray[14]},{number: 15,image: imgArray[15]},{number: 0,image: imgArray[0]}],
  ]
}

const firstPage = document.querySelector('.first-page');
const firstPageButton = firstPage.querySelector('.first-page__button');
const secondPage = document.querySelector('.second-page');
const secondPageExit = document.querySelector('.second-page__exit-btn');
const secondPageLevels = secondPage.querySelectorAll('.second-page__level');
const secondPageLevelButtons = secondPage.querySelectorAll('.second-page__level');
const tagPage = document.querySelector('.tag');
const tagOverlay = document.querySelector('.tag__overlay');
const tagOverlayTouches = tagOverlay.querySelector('.tag__touches-count');
const tagOverlayContinue = tagOverlay.querySelector('.tag__overlay-button');
const tagOverlayRestart = tagOverlay.querySelector('.tag__overlay-restart');
const topBarTouches = document.querySelector('.topbar__touch-count');
const topBarExit = document.querySelector('.topbar__exit');

const memeTitle = document.querySelector('.tag__meme-title');
const memeText = document.querySelector('.tag__meme-text');

firstPageButton.addEventListener('click', () => {
  firstPage.classList.remove('first-page_active');
  secondPage.classList.add('second-page_active');
})

tagOverlayContinue.addEventListener('click', () => {
  tagOverlay.classList.remove('tag__overlay_active');
  tagPage.classList.remove('tag_active');
  secondPage.classList.add('second-page_active');
});
tagOverlayRestart.addEventListener('click', () => {
  tagOverlay.classList.remove('tag__overlay_active');
});
secondPageExit.addEventListener('click', () => {
  secondPage.classList.remove('second-page_active');
  firstPage.classList.add('first-page_active');
});
topBarExit.addEventListener('click', () => {
  tagPage.classList.remove('tag_active');
  secondPage.classList.add('second-page_active');
});

function unlockedLevel(level) {
  level.classList.remove('second-page__level_disable');
}
function passedLevel(level, touches) {
  level.querySelector('.second-page__level-ratings').classList.add('second-page__level-ratings_active');
  level.querySelector('.second-page__level-touches-count').textContent = touches;
  level.querySelector('.second-page__level-button').classList.add('second-page__level-button_restart');
  level.querySelector('.second-page__level-button').textContent = 'Перепройти';
  level.querySelector('.second-page__level-img-text').classList.add('second-page__level-img-text_active');
}

if (localStorage.getItem('level-passed-1')) {
  passedLevel(secondPageLevels[0], localStorage.getItem('level-passed-1'));
  unlockedLevel(secondPageLevels[1]);
}
if (localStorage.getItem('level-passed-2')) {
  passedLevel(secondPageLevels[1], localStorage.getItem('level-passed-2'));
  unlockedLevel(secondPageLevels[2]);
}
if (localStorage.getItem('level-passed-3')) {
  passedLevel(secondPageLevels[2], localStorage.getItem('level-passed-3'));
  unlockedLevel(secondPageLevels[3]);
}
if (localStorage.getItem('level-passed-4')) {
  passedLevel(secondPageLevels[3], localStorage.getItem('level-passed-4'));
  unlockedLevel(secondPageLevels[4]);
}
if (localStorage.getItem('level-passed-5')) {
  passedLevel(secondPageLevels[4], localStorage.getItem('level-passed-5'));
  unlockedLevel(secondPageLevels[5]);
}
if (localStorage.getItem('level-passed-6')) {
  passedLevel(secondPageLevels[5], localStorage.getItem('level-passed-6'));
  unlockedLevel(secondPageLevels[6]);
}
if (localStorage.getItem('level-passed-7')) {
  passedLevel(secondPageLevels[6], localStorage.getItem('level-passed-7'));
  unlockedLevel(secondPageLevels[7]);
}
if (localStorage.getItem('level-passed-8')) {
  passedLevel(secondPageLevels[7], localStorage.getItem('level-passed-8'));
  unlockedLevel(secondPageLevels[8]);
}
if (localStorage.getItem('level-passed-9')) {
  passedLevel(secondPageLevels[8], localStorage.getItem('level-passed-9'));
  unlockedLevel(secondPageLevels[9]);
}
if (localStorage.getItem('level-passed-10')) {
  passedLevel(secondPageLevels[9], localStorage.getItem('level-passed-10'));
}

function Game(canvas, context, cellSize, meme) {
  this.state = fillState(meme);

  this.color = "#350b4b";

  this.context = context;
  this.cellSize = cellSize;

  this.clicks = 0;
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  const scaleFactor = 3;
  canvas.width = originalWidth * scaleFactor; // Увеличенная ширина
  canvas.height = originalHeight * scaleFactor; // Увеличенная высота
  canvas.style.width = originalWidth - 8 + 'px'; // Исходная ширина
  canvas.style.height = originalHeight - 8 + 'px'; // Исходная высота
  // Рисование на увеличенном холсте
  context.scale(scaleFactor, scaleFactor);

  switch (meme) {
    case meme1:
      memeTitle.textContent = memeTexts[0].title;
      memeText.textContent = memeTexts[0].text
      break;
    case meme2:
      memeTitle.textContent = memeTexts[1].title;
      memeText.textContent = memeTexts[1].text
      break;
    case meme3:
      memeTitle.textContent = memeTexts[2].title;
      memeText.textContent = memeTexts[2].text
      break;
    case meme4:
      memeTitle.textContent = memeTexts[3].title;
      memeText.textContent = memeTexts[3].text
      break;
    case meme5:
      memeTitle.textContent = memeTexts[4].title;
      memeText.textContent = memeTexts[4].text
      break;
    case meme6:
      memeTitle.textContent = memeTexts[5].title;
      memeText.textContent = memeTexts[5].text
      break;
    case meme7:
      memeTitle.textContent = memeTexts[6].title;
      memeText.textContent = memeTexts[6].text
      break;
    case meme8:
      memeTitle.textContent = memeTexts[7].title;
      memeText.textContent = memeTexts[7].text
      break;
    case meme9:
      memeTitle.textContent = memeTexts[8].title;
      memeText.textContent = memeTexts[8].text
      break;
    case meme10:
      memeTitle.textContent = memeTexts[9].title;
      memeText.textContent = memeTexts[9].text
      break;
    default:
      break;
  }
}

Game.prototype.getClicks = function () {
  return this.clicks;
};

Game.prototype.cellView = function (x, y) {
  this.context.fillStyle = this.color;
  this.context.fillRect(
    x + 1,
    y + 1,
    this.cellSize - 2,
    this.cellSize - 2
  );
};

Game.prototype.numView = function () {
  this.context.font = "bold " + (this.cellSize / 2) + "px Sans";
  this.context.textAlign = "center";
  this.context.textBaseline = "middle";
  this.context.fillStyle = "#350b4b";
};

Game.prototype.draw = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.state[i][j]["number"] > 0) {
        this.cellView(
          j * this.cellSize,
          i * this.cellSize
        );
        this.context.drawImage(
          this.state[i][j]['image'],
          j * this.cellSize,
          i * this.cellSize,
          this.cellSize - 2,
          this.cellSize - 2
        );

      }
    }
  }
};

Game.prototype.getNullCell = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.state[j][i]["number"] === 0) {
        return { x: i, y: j };
      }
    }
  }
};

Game.prototype.move = function (x, y) {
  let nullCell = this.getNullCell();
  let canMoveVertical = (x - 1 == nullCell.x || x + 1 == nullCell.x) && y == nullCell.y;
  let canMoveHorizontal = (y - 1 == nullCell.y || y + 1 == nullCell.y) && x == nullCell.x;

  if (canMoveVertical || canMoveHorizontal) {
    this.state[nullCell.y][nullCell.x]["number"] = this.state[y][x]["number"];
    this.state[nullCell.y][nullCell.x]["image"] = this.state[y][x]["image"];
    this.state[y][x]["number"] = 0;
    // this.state[y][x]["image"] = this.state[3][3]["image"];
    this.state[y][x]["image"] = document.querySelector('.number-0');
    this.clicks++;
    topBarTouches.textContent = this.clicks;
  }
};

Game.prototype.victory = function () {
  let combination = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  let res = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (combination[i][j] != this.state[i][j]["number"]) {
        res = false;
        break;
      }
    }
  }
  return res;
};

Game.prototype.mix = function (count) {
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
  topBarTouches.textContent = 0;
};
document.getElementById("tag-canvas").addEventListener('click', () => {
  tagPage.scrollTo({
    top: 0, // установим скроллл  на величину 1000px
    behavior: "smooth" // используем плавный скролл
  });
});
function startGame(meme) {
  let canvas = document.getElementById("tag-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth;

  let context = canvas.getContext("2d");
  context.fillStyle = "#350b4b";
  context.fillRect(0, 0, canvas.width, canvas.height);

  let cellSize = canvas.width / 4;

  let game = new Game(canvas, context, cellSize, meme);
  game.mix(300);
  game.draw();

  canvas.onclick = function (e) {
    let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    let y = (e.pageY - canvas.offsetTop) / cellSize | 0;
    onEvent(x, y);
  };

  canvas.ontouchend = function (e) {
    let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
    let y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;

    onEvent(x, y);
  };

  function onEvent(x, y) {
    game.move(x, y);
    context.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    if (game.victory()) {
      tagOverlayTouches.textContent = game.getClicks();
      switch (meme) {
        case meme1:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg1.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 1/10';
          unlockedLevel(secondPageLevels[1]);
          passedLevel(secondPageLevels[0], game.getClicks());
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          localStorage.setItem('level-passed-1', game.getClicks());
          break;
        case meme2:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg2.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 2/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[2]);
          passedLevel(secondPageLevels[1], game.getClicks());
          localStorage.setItem('level-passed-2', game.getClicks());
          break;
        case meme3:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg3.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 3/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[3]);
          passedLevel(secondPageLevels[2], game.getClicks());
          localStorage.setItem('level-passed-3', game.getClicks());
          break;
        case meme4:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg4.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 4/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[4]);
          passedLevel(secondPageLevels[3], game.getClicks());
          localStorage.setItem('level-passed-4', game.getClicks());
          break;
        case meme5:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg5.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 5/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[5]);
          passedLevel(secondPageLevels[4], game.getClicks());
          localStorage.setItem('level-passed-5', game.getClicks());
          break;
        case meme6:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg6.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 6/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[6]);
          passedLevel(secondPageLevels[5], game.getClicks());
          localStorage.setItem('level-passed-6', game.getClicks());
          break;
        case meme7:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg7.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 7/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[7]);
          passedLevel(secondPageLevels[6], game.getClicks());
          localStorage.setItem('level-passed-7', game.getClicks());
          break;
        case meme8:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg8.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 8/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[8]);
          passedLevel(secondPageLevels[7], game.getClicks());
          localStorage.setItem('level-passed-8', game.getClicks());
          break;
        case meme9:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/second-page-memeImg9.png';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Собрано 9/10';
          tagOverlayRestart.style.display = 'block';
          tagOverlayContinue.textContent = 'Продолжить';
          unlockedLevel(secondPageLevels[9]);
          passedLevel(secondPageLevels[8], game.getClicks());
          localStorage.setItem('level-passed-9', game.getClicks());
          break;
        case meme10:
          tagOverlay.querySelector('.tag__overlay-img').src = './images/final-round-img.svg';
          tagOverlay.querySelector('.tag__overlay-text').textContent = 'Все мемы собраны';
          passedLevel(secondPageLevels[9], game.getClicks());
          localStorage.setItem('level-passed-10', game.getClicks());
          tagOverlayRestart.style.display = 'none';
          tagOverlayContinue.textContent = 'Все мемы';
          break;
        default:
          break;
      }
      setTimeout(() => {
        tagOverlay.classList.add('tag__overlay_active');
        game.mix(300);
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw(context, cellSize);
      }, 300)
    }
  }
};

secondPageLevelButtons.forEach((elem) => {
  elem.addEventListener('click', () => {
    if (!elem.className.includes('second-page__level_disable')) {
      secondPage.classList.remove('second-page_active');
      tagPage.classList.add('tag_active');
      switch (elem.dataset.meme) {
        case "meme1":
          startGame(meme1);
          break;
        case "meme2":
          startGame(meme2);
        break;
        case "meme3":
          startGame(meme3);
          break;
        case "meme4":
          startGame(meme4);
        break;
        case "meme5":
          startGame(meme5);
          break;
        case "meme6":
          startGame(meme6);
        break;
        case "meme7":
          startGame(meme7);
          break;
        case "meme8":
          startGame(meme8);
        break;
        case "meme9":
          startGame(meme9);
          break;
        case "meme10":
          startGame(meme10);
        break;
        default:
          break;
      }
    }
  })
});