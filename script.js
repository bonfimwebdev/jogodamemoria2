const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//Virar as cartas
function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//Checar se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//Impedir que as cartas desvirem caso sejam iguais
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//Desvirar as cartas caso sejam diferentes
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//Limpar tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Embaralhar as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 24);
        card.style.order = randomPosition;
    })
})(); 
/*Immediatly Invoked Function é a função que é chamada logo
depois de ser implementada. Para isso, deve encapsular a função
dentro de parênteses e depois chamá-la (com par de parenteses
ao final dela)*/


cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

