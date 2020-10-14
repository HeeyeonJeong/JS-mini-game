const screen = document.querySelector("#screen");
const scoreBox = document.querySelector("#scoreBox");
const score = document.querySelector("#scoreBox span");

let 시작시간;
let 끝시간;
let 기록 = [];
let 타임아웃;
let 중단플래그 = false;

screen.addEventListener("click",function(){
    if(screen.classList.contains("waiting")){
        //대기상태
        screen.classList.remove("waiting");
        screen.classList.add("ready");
        screen.textContent = "Green 나오면 Click!"
        타임아웃 = setTimeout(() => {
            시작시간 = new Date();
            screen.click();
        }, Math.floor(Math.random()*1000)+1000); //2000~3000사이의 수
    }else if(screen.classList.contains("ready")){
        //준비
        if(!시작시간){ //부정클릭
            screen.classList.remove("ready");
            screen.classList.add("waiting");
            screen.textContent = "다시 click 후 시도하세요!"
            clearTimeout(타임아웃);
        }else{
            screen.classList.remove("ready");
            screen.classList.add("now");
            screen.textContent = "Click!"    
        }
    }else if(screen.classList.contains("now")){
        //시작
        끝시간 = new Date();
        let 반응속도 = (끝시간-시작시간);
        기록.push(반응속도);
        if(기록.length === 3){
            screen.classList.remove("now");
            screen.classList.add("waiting");
            myScore(기록);
            screen.textContent = "게임 재시작! click!";
        }else{
            시작시간 = null;
            끝시간 = null;
            screen.classList.remove("now");
            screen.classList.add("waiting");
            screen.textContent = "Click해서 시작하기";
        }
    }
})

function myScore(기록) {
    scoreBox.classList.add("show");
    const 기록합계 = 기록.reduce(function(prev, curr){
        return prev + curr;
    }, 0);
    const 기록평균 = Math.floor(기록합계/기록.length);
    score.innerHTML = `${기록평균}ms`
}