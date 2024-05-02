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
        2: [1.03, 1.11, 1.21, 1.33, 1.44, 1.64, 1.83, 2.00, 2.35, 2.68, 3.10, 3.62, 4.29, 5.15, 6.30, 7.89, 10.15, 13.54, 18.97, 28.20, 47.20, 94.97, 284.00],
        3: [1.05, 1.21, 1.39, 1.61, 1.89, 2.22, 2.65, 3.18, 3.87, 4.77, 5.97, 7.61, 9.90, 13.21, 18.18, 26.00, 38.99, 62.4, 109.22, 218.2, 546, 1000],
        4: [1.11, 1.33, 1.61, 2.01, 2.45, 3.03, 3.90, 5.02, 6.30, 8.50, 12.00, 16.78, 24.23, 36.39, 57.2, 95.35, 171.65, 343.33, 801.14, 1021.0, 2000],
        5: [1.16, 1.21, 1.89, 2.45, 3.23, 4.31, 5.86, 8.13, 11.53, 16.78, 25.19, 39.19, 63.70, 109.22, 200.26, 400.55, 901.28, 2400.00, 4053.00, 8032.00],
        6: [1.22, 1.64, 2.22, 2.81, 4.31, 5.9, 9.03, 13.56, 20.98, 33.59, 56.00, 98.01, 182.05, 364.14, 801.14, 1053, 2000, 5053, 6063],
        7: [1.29, 1.83, 2.65, 3.91, 5.86, 9.03, 14.32, 23.45, 39.89, 70.94, 133.03, 266.09, 576.3, 1038.0, 2064.3, 4033.0, 5032.00, 8042.00],
        8: [1.37, 1.89, 3.18, 5.02, 8.13, 13.56, 23.45, 39.89, 70.94, 133.03, 289.09, 785.00, 2060.06, 3064.3, 8033.0, 10042.00, 15032.00],
        9: [1.45, 2.35, 3.60, 6.60, 11.56, 15.01, 25.67, 39.92, 75.43, 145.03, 305.09, 885.00, 2150.06, 3243.3, 8033.0, 15042.00],
        10: [1.55, 2.68, 4.50, 7.68, 13.23, 31.01, 56.67, 94.92, 387.32, 589.03, 1876.09, 4832.00, 9435.06, 17032.3, 20543.0],
        11: [1.67, 3.10, 5.09, 12.45, 25.18, 56.89, 133.78, 342.09, 969.45, 2456.04, 4367.09, 6734.00, 8945.06, 21032.3],
        12: [1.81, 3.62, 7.61, 16.45, 39.22, 98.04, 197.78, 442.09, 1069.45, 2756.04, 9667.09, 10734.00, 23945.06],
        13: [1.95, 4.29, 9.90, 24.25, 63.70, 182.03, 597.78, 2042.09, 8738.45, 16756.04, 22667.09, 30734.00],
        14: [2.13, 5.15, 13.21, 36.39, 109.22, 364.14, 1038.65, 6022.59, 8738.45, 26756.04, 32667.09],
        15: [2.35, 6.30, 18.21, 57.39, 197.22, 534.41, 3038.65, 8022.59, 18738.45, 36756.04],
        16: [2.61, 7.89, 25.97, 95.35, 376.22, 2534.41, 13038.65, 28022.59, 41738.45],
        17: [2.94, 10.89, 39.00, 171.35, 901.22, 6534.41, 23038.65, 44022.59],
        18: [2.36, 13.54, 62.40, 343.36, 2403.06, 16534.41, 44038.65],
        19: [3.93, 18.00, 103.56, 856.23, 22403.06, 46534.41],
        20: [4.72, 28.20, 214.67, 2856.23, 50834.06],
        21: [5.91, 47.20, 514.67, 12856.23],
        22: [7.89, 92.00, 2018.67],
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
    // проверяем, что всё вписано и можно начать игру
    if (betInput.value !== '' && isGetReward === false) {
        gameContainerEl.classList.add('game__active')
        bombContainerEl.classList.add('untouchable')
        betInput.classList.add('untouchable')
        betBtn.innerHTML = `Выберите ячейку`
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
        overlay.style.width = '100%'
        overlayRatio.textContent = `x${ratioItemArr[cntRatioItemForOverlay].textContent}`
        cntRatioItemForOverlay = -1
        overlayReward.textContent = `Вы выиграли ${reward}!`
        betBtn.innerHTML = `Сделать ход`
        gameContainerEl.classList.remove('game__active')
        bombContainerEl.classList.remove('untouchable');
        betInput.classList.remove('untouchable');
        setTimeout(() => {
            overlay.style.width = '0'
        }, 2000)
        isGetReward = false
    }

})

// переворачиваем карточку
function flipCard(e){
   let clickedCard = e.target;
   pressedCard++
   cntRatioItemActive++

   if(clickedCard !== lastCard && !disableDeck){
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

    }
    
}

// вероятности выпадения монетки в зависимости от кол-ва бомб 
function generateNumber(cntBombs) {
    let randomNum = Math.random();
    const probability = {
        2: 0.5,
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

// двигает карточкии коэффициентов в зависимости от текущего коэффициента
function moveRatioItem(indexRatioItem) {
    const ratioItemArr = document.querySelectorAll('.ratio__item');
    const activeElementRect = ratioItemArr[indexRatioItem].getBoundingClientRect();

    if (activeElementRect.right > 1288) {
        smoothScrollBy(100, 500)
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
