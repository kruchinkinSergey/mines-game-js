const cards = document.querySelectorAll(".card");
const betInput = document.querySelector(".bet__input");
const bombBtnArr = document.querySelectorAll(".bomb__btn");
const bombCalcNum = document.querySelector(".bomb__calc-num");
const bombCalcBtnPlus = document.querySelector(".bomb__calc-btn--plus");
const bombCalcBtnMinus = document.querySelector(".bomb__calc-btn--minus");
const betBtn = document.querySelector(".bet__btn");
const gameContainerEl = document.querySelector(".game__container");
const bombContainerEl = document.querySelector(".bomb__container");
const overlay = document.querySelector(".overlay");
const overlayRatio = document.querySelector(".overlay__ratio");
const overlayReward = document.querySelector(".overlay__reward");
const overlayBtnContainer = document.querySelector(".overlay__btn-container");

let pressedCard = 0;
let disableDeck = false;
let lastCard = '';
let ratioItem;
let allBombs = 3;
let cntRatioItemActive = -1;
let isGetReward = false
bombCalcNum.innerHTML = 3

// вызываем функцию для ячеек с коэффициентами
createRationsandCounts(22)

// вычисляем кол-во бомб 
bombBtnArr.forEach(bombBtn =>{
    bombBtn.addEventListener("click", () => {
        bombCalcNum.innerHTML = +bombBtn.value
        createRationsandCounts(25 - bombCalcNum.innerHTML)
    });

})

// кнопка для увлечения бомбы на 1
bombCalcBtnPlus.addEventListener('click', () => {

    if (bombCalcNum.innerHTML < 24) {
        bombCalcNum.innerHTML++
        createRationsandCounts(25 - bombCalcNum.innerHTML)
    }

})

// кнопка для уменьшения бомбы на 1
bombCalcBtnMinus.addEventListener('click', () => {
    
    if (bombCalcNum.innerHTML > 2) {
        bombCalcNum.innerHTML--
        createRationsandCounts(25 - bombCalcNum.innerHTML)
    }

})

//создаём ячейки с коэффициентами и счетчики бомб
function createRationsandCounts(cntCoins) {
    const coinCnt = document.querySelector('.count__coins-num');
    const bombCnt = document.querySelector('.count__bombs-num');
    const ratioEl = document.querySelector(".ratio");

    if (isGetReward) {
        coinCnt.textContent = 25 - allBombs - cntCoins;
        return
    }

    coinCnt.textContent = cntCoins;
    bombCnt.textContent = 25 - cntCoins;
    allBombs =  bombCnt.textContent
    console.log('allBombs: ', allBombs)

    ratioEl.innerHTML = '';
    for (let i = 0; i < cntCoins; i++) {
        ratioItem = document.createElement('div');
        ratioItem.classList.add('ratio__item');
        ratioItem.textContent = getRatioFromArr(allBombs, i)
        ratioEl.appendChild(ratioItem);
    }
}

// вычисляем коэффициент в зависимости от кол-ва бомб
function getRatioFromArr(cntBomb, count) {
    const ratioArray = {
        2: [1.03, 1.11, 1.21, 1.33, 1.44, 1.64, 1.83, 2.00, 2.35, 2.68, 3.10, 3.62, 4.29, 5.15, 6.30, 7.89, 10.1, 13.5, 18.97, 28.20, 47.20, 94.97, 284.0],
        3: [1.05, 1.21, 1.39, 1.61, 1.89, 2.22, 2.65, 3.18, 3.87, 4.77, 5.97, 7.61, 9.90, 13.21, 18.18, 26.00, 38.99, 62.4, 109.2, 218.2, 546, 1000],
        4: [1.11, 1.33, 1.61, 2.01, 2.45, 3.03, 3.90, 5.02, 6.30, 8.50, 12.00, 16.78, 24.23, 36.39, 57.2, 95.35, 171.5, 343.3, 801.1, 1021, 2000],
        5: [1.16, 1.21, 1.89, 2.45, 3.23, 4.31, 5.86, 8.13, 11.53, 16.78, 25.19, 39.19, 63.70, 109.2, 200.2, 400.5, 901.2, 2400, 4053, 8032],
        6: [1.22, 1.64, 2.22, 2.81, 4.31, 5.9, 9.03, 13.5, 20.98, 33.59, 56.00, 98.01, 182.0, 364.1, 801.1, 1053, 2000, 5053, 6063],
        7: [1.29, 1.83, 2.65, 3.91, 5.86, 9.03, 14.32, 23.45, 39.89, 70.94, 133.0, 266.0, 576.3, 1038.0, 2064.3, 4033.0, 5032.00, 8042.00],
        8: [1.37, 1.89, 3.18, 5.02, 8.13, 13.56, 23.45, 39.89, 70.94, 133.3, 289.9, 785.0, 2060, 3064, 8033, 10042, 15032],
        9: [1.45, 2.35, 3.60, 6.60, 11.56, 15.01, 25.67, 39.92, 75.43, 145.3, 305.9, 885.0, 2150, 3243, 8033, 15042],
        10: [1.55, 2.68, 4.50, 7.68, 13.23, 31.01, 56.67, 94.92, 387.2, 589.0, 1876, 4832, 9435, 17032, 20543],
        11: [1.67, 3.10, 5.09, 12.45, 25.18, 56.89, 133.8, 342.9, 969.5, 2456, 4367, 6734, 8945, 21032],
        12: [1.81, 3.62, 7.61, 16.45, 39.22, 98.04, 197.8, 442.9, 1069, 2756.4, 9667, 10734, 23945],
        13: [1.95, 4.29, 9.90, 24.25, 63.70, 182.03, 597.8, 2042.9, 8738, 16756, 22667, 30734],
        14: [2.13, 5.15, 13.21, 36.39, 109.2, 364.4, 1038.6, 6022, 8738, 26756, 32667],
        15: [2.35, 6.30, 18.21, 57.39, 197.2, 534.4, 3038, 8022.9, 18738, 36756],
        16: [2.61, 7.89, 25.97, 95.35, 376.22, 2534.4, 13038, 28022, 41738],
        17: [2.94, 10.89, 39.00, 171.35, 901.22, 6534.4, 23038, 44022],
        18: [2.36, 13.54, 62.40, 343.36, 2403.6, 16534, 44038],
        19: [3.93, 18.00, 103.56, 856.23, 22403, 46534],
        20: [4.72, 28.20, 214.67, 2856.3, 50834],
        21: [5.91, 47.20, 514.67, 12856],
        22: [7.89, 92.00, 2018.6],
        23: [11.83, 285.00],
        24: [23.75]
    }
    return ratioArray[cntBomb][count]
}

// валидация input
betInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9.]/g, ''); 
    
    if (this.value.includes('.')) {
        const parts = this.value.split('.');
        if (parts[1].length > 2) {
            this.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
        }
    }
});


betBtn.addEventListener('click', () => {
    const betInputWarning = document.querySelector('.bet__input-warning')
    // проверяем, что инпут не пустой
    if (betInput.value === '') {
        betInputWarning.textContent = 'Сделайте ставку'
        betInputWarning.style.display = 'block'
        setTimeout(() => {
            betInputWarning.style.display = 'none'
        }, 5000)
    }
    // проверяем, что всё вписано и можно начать игру
    if (betInput.value !== '' && isGetReward === false) {
        gameContainerEl.classList.add('game__active')
        bombContainerEl.classList.add('untouchable')
        betInput.classList.add('untouchable')
        betBtn.innerHTML = `Выберите ячейку`
        console.log('click')
    } 
    // когда пользователь забирает награду
    if (isGetReward === true) {
        // выигрыш (значение, которое показывает кнопка при клике на монетку)
        reward = betBtn.innerHTML.replace(/[^0-9.]/g, "");
        shuffleCard()
        const ratioItemArr = document.querySelectorAll('.ratio__item');
        let cntRatioItemForOverlay = -1
        for (let item of ratioItemArr) {

            if (item.classList.contains('ratio__active')) {
                cntRatioItemForOverlay++
                item.classList.remove('ratio__active')
            }

        }
        cntRatioItemActive = -1
        overlay.style.display = 'block'
        overlayBtnContainer.addEventListener('click', () => {
            overlay.style.display = 'none'
            gameContainerEl.classList.remove('game__active')
        })
        overlayRatio.textContent = `x${ratioItemArr[cntRatioItemForOverlay].textContent}`
        cntRatioItemForOverlay = -1
        overlayReward.textContent = `Вы выиграли ${reward}!`
        betBtn.innerHTML = `Сделать ход`
        bombContainerEl.classList.remove('untouchable');
        betInput.classList.remove('untouchable');
        setTimeout(() => {
            overlay.style.display = 'none'
        }, 10000)
        isGetReward = false
    }

})

// переворачиваем карточку
function flipCard(e){
   let clickedCard = e.target;
   pressedCard++
   cntRatioItemActive++

   if(clickedCard !== lastCard && !disableDeck){
        console.log(`clickedCard: ${clickedCard.children[1].children[0].src}, lastCard: ${lastCard}, disableDeck: ${disableDeck}`)
        clickedCard.classList.add("flip");
        lastCard = clickedCard
        let imgTag = clickedCard.querySelector("img");
        imgTag.src = `img/game-${generateNumber(allBombs)}.png`;

        if (imgTag.src.includes('coin')) {
            clickCoin(cntRatioItemActive, pressedCard)
        } 
        else if (imgTag.src.includes('bomb')) {
            clickBomb()
            disableDeck = true
        }

    } else {
        console.log(`clickedCard: ${clickedCard}, lastCard: ${lastCard}, disableDeck: ${disableDeck}`)
    }
    
}

// вероятности выпадения монетки в зависимости от кол-ва бомб 
function generateNumber(cntBombs) {
    let randomNum = Math.random();
    const probability = {
        2: 1.5,
        3: 0.4,
        4: 0.4,
        5: 0.4,
        6: 0.4,
        7: 0.4,
        8: 0.4,
        9: 0.4,
        10: 0.4,
        11: 0.4,
        12: 0.38,
        13: 0.35,
        14: 0.32,
        15: 0.3,
        16: 0.28,
        17: 0.25,
        18: 0.2,
        19: 0.17,
        20: 0.15,
        21: 0.12,
        22: 0.01,
        23: 0.04,
        24: 0.00,
    };
    
    if (randomNum < probability[cntBombs]) {
        return 'coin'
    } else {
        return 'bomb'
    }

}
document.addEventListener('click', function(event) {
    console.log(window.innerWidth)
    console.log('X координата: ' + event.clientX);
});

// двигает карточкии коэффициентов в зависимости от текущего коэффициента
function moveRatioItem(indexRatioItem) {
    const ratioItemArr = document.querySelectorAll('.ratio__item');
    const activeElementRect = ratioItemArr[indexRatioItem].getBoundingClientRect();

    if (activeElementRect.right > (window.innerWidth / 1.4)) {
        smoothScrollBy(130, 500)
    } 

}

// функция плавного скролла коэффициентов
function smoothScrollBy(diff, duration) {
    const ratioEl = document.querySelector(".ratio");

    const start = ratioEl.scrollLeft;
    const change = diff;
    let currentTime = 0;
    const increment = 20;

    function animateScroll() {
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        ratioEl.scrollLeft = val;
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    animateScroll();
}

// функция обеспечивает плавное изменение значения в течение определенного времени
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// если выпала монетка 
function clickCoin(cntRatioItem, pressedCard) {
    isGetReward = true
    const ratioItemArr = document.querySelectorAll('.ratio__item');
    ratioItemArr[cntRatioItem].classList.add('ratio__active');
    moveRatioItem(cntRatioItem)
    createRationsandCounts(pressedCard)
    number = betInput.value * ratioItemArr[cntRatioItem].textContent
    betBtn.innerHTML = `Заберите награду ${(Math.round(number * 100)/100).toFixed(2)}`
}

// если выпала бомба
function clickBomb() {
    const ratioItemArr = document.querySelectorAll('.ratio__item');
    for (let i = 0; i < cntRatioItemActive; i++) {
        ratioItemArr[i].classList.remove('ratio__active');
    }
    cntRatioItemActive = -1

    gameContainerEl.classList.remove('game__active')
    bombContainerEl.classList.remove('untouchable');
    betInput.classList.remove('untouchable');
    isGetReward = false
    smoothScrollBy(-1000, 100)
    createRationsandCounts(25 - allBombs)
    
    let arrImg = [];
   

    for (let i = 0; i < allBombs - 1; i++) {
        arrImg.push('bomb');
    }

    for (let i = 0; i < (25 - allBombs -  (pressedCard - 1)); i++) {
        arrImg.push('coin');
    }

    arrImg.sort(() => Math.random() - 0.5);;

    let index = 0
    cards.forEach((card) => {
        card.classList.add('shake');

        if (!card.classList.contains('flip')) {
            card.classList.add('flip');
            let imgTag = card.querySelector("img");
            imgTag.src = `img/game-${arrImg[index]}.png`;
            index++
        } 

    });
    
    betBtn.innerHTML = 'Сделать ход';

    setTimeout(() => {
        return shuffleCard()
    }, 1000)
}

// разворачивает карточки, убирает тряску
function shuffleCard(){
    pressedCard = 0
    disableDeck = false;
    cards.forEach((card) => {
        card.classList.remove("flip");
        card.classList.remove('shake');
        card.addEventListener("click", flipCard);
    })
}


shuffleCard();
cards.forEach(card =>{
    card.addEventListener("click", flipCard);
})
