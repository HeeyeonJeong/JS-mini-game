const screen = document.querySelector("#screen");

let 시작시간;
let 끝시간;

screen.addEventListener("click",function(){
    if(screen.classList.contains("waiting")){
        screen.classList.remove("waiting");
        screen.classList.add("ready");
        screen.textContent = "Green 나오면 Click!"
        setTimeout(() => {
           screen.click();
           시작시간 = new Date();
        }, Math.floor(Math.random()*1000)+2000); //2000~3000사이의 수
    }else if(screen.classList.contains("ready")){
        screen.classList.remove("ready");
        screen.classList.add("now");
        screen.textContent = "Click!"
    }else if(screen.classList.contains("now")){
        끝시간 = new Date();
        let 반응속도 = (끝시간-시작시간);
        console.log(`반응속도 ${반응속도}ms`)
        screen.classList.remove("now");
        screen.classList.add("waiting");
        screen.textContent = "Click해서 시작하기"
    }
})