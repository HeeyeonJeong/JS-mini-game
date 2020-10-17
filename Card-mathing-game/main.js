const wrapper =document.querySelector("#wrapper");
const gameSet =document.querySelector("#wrapper").gameSet;

let 가로 = 4;
let 세로 = 3;
let 색상 = ["red","yellow","green","orange","blue","pink","red","yellow","green","orange","blue","pink"];
let 랜덤색상 = [];
let 클릭플래그 = true; 
let 클릭카드 = [];
let 완성카드 = [];
let 시작시간;
let 끝시간;

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
                if(클릭플래그 && !완성카드.includes(c)){
                    c.classList.toggle("flipped");
                    클릭카드.push(c);
                    if(클릭카드.length === 2){
                        if(클릭카드[0].querySelector(".card-back").style.backgroundColor === 클릭카드[1].querySelector(".card-back").style.backgroundColor){
                            완성카드.push(클릭카드[0],클릭카드[1]);
                            클릭카드 = [];
                            if(완성카드.length === 12){
                                끝시간 = new Date();
                                wrapper.classList.add("gameSet");
                                const desc = document.createElement("p");
                                document.body.appendChild(desc);
                                desc.innerHTML = `${(끝시간 - 시작시간)/1000}초!`
                            }
                        }else{
                            setTimeout(() => {
                                클릭카드[0].classList.remove("flipped");
                                클릭카드[1].classList.remove("flipped");
                                클릭플래그 = true;
                                클릭카드 = [];    
                            }, 500);
                        }
                    }
                }
            });        
        })(card);
        wrapper.appendChild(card);
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
        시작시간 = new Date();
    },3000);
};
카드세팅(가로,세로);