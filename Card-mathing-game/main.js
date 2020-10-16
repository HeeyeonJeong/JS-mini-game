let 가로 = 3;
let 세로 = 4;

function 카드세팅(가로,세로){
    for(let i=0; i <가로*세로; i++){
        const card = document.createElement("div");
        card.className = "card"
        const cardInner = document.createElement("div");
        cardInner.className = "card-inner"
        const cardFront = document.createElement("div");
        cardFront.className = "card-front"
        const cardBack = document.createElement("div");
        cardBack.className = "card-back"
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        document.body.appendChild(card);
        (function(c){
            c.addEventListener("click",function(){
                c.classList.toggle("flipped");
            });        
        })(card);
    }
};
카드세팅(가로,세로);