const tetris = document.querySelector("#tetris");
let tetrisData = [];

function 칸만들기 (){
    const fragment = document.createDocumentFragment();
    for(let i=0; i < 20; i++){
        let tr = document.createElement('tr');
        fragment.appendChild(tr);
        for(let i=0; i < 20; i++){
            let td = document.createElement('td');
            tr.appendChild(td);
        }    
    }
    tetris.appendChild(fragment);
}

칸만들기();

window.addEventListener("keydown",function(e){
    switch(e.code){
        case 'Space': //한번에 내리기
            break;
        case 'ArrowDown': //아래쪽으로
            break;
        default:
            break;
    }
})

window.addEventListener("keyup",function(e){
    switch(e.code){
        case 'ArrowLeft': //왼쪽으로
            break;
        case 'ArrowRight': //오른쪽으로
            break;
        case 'ArrowUp': //방향전환
            break;
        default:
            break;
    }
})