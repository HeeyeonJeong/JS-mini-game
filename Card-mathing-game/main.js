let 가로 = 4;
let 세로 = 3;
let 색상 = ["red","yellow","green","orange","blue","pink","red","yellow","green","orange","blue","pink"];
let 랜덤색상 = [];
let 클릭플래그 = true; 

//색상 랜덤 넣기
for(let i=0; 색상.length > 0; i++){
    랜덤색상 = 랜덤색상.concat(색상.splice(Math.floor(Math.random()*색상.length),1));
};

//카드 세팅 하기
function 카드세팅(가로,세로){
    for(let i=0; i <가로*세로; i++){
        //카드 만들기
        클릭플래그 = false;
        const card = document.createElement("div");
        card.className = "card";
        const cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        cardBack.style.backgroundColor = 랜덤색상[i];
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        //카드 뒤집기
        (function(c){
            c.addEventListener("click",function(){
                if(클릭플래그){
                    c.classList.toggle("flipped");
                }
            });        
        })(card);
        document.body.appendChild(card);
    }
    //카드 하나씩 뒤집기
    document.querySelectorAll(".card").forEach(function(card, index){
        setTimeout(() => {
            card.classList.add("flipped");
        }, 1000 + 100*index);
    })
    //전부 뒤집기
    setTimeout(()=>{
        document.querySelectorAll(".card").forEach(function(card){
            card.classList.remove("flipped");
        });
        클릭플래그 = true;
    },3000);
};
카드세팅(가로,세로);