const tetris = document.querySelector("#tetris");
let tetrisData = [];

let blockArr = [
    //색, 움직임 가능 여부, 블럭모양
    ['red', true, [
        [1,1],
        [1,1],
    ]],
    ['blue', true, [
        [0,2,0],
        [2,2,2],
    ]],
    ['orange', true, [
        [3,3,0],
        [0,3,3],
    ]],
    ['skyblue', true, [
        [0,4,4],
        [4,4,0],
    ]],
    ['yellowgreen', true, [
        [5,5,5],
        [5,0,0],
    ]],
    ['pink', true, [
        [6,6,6],
        [0,0,6],
    ]],
    ['yellow', true, [
        [7,7,7,7],
    ]],
]

let blockDict = {
    //색, 움직임 가능 여부, 블럭모양
    0:['white', false, []],
    1:['red', true, [
        [1,1],
        [1,1],
    ]],
    2:['blue', true, [
        [0,1,0],
        [1,1,1],
    ]],
    3:['orange', true, [
        [1,1,0],
        [0,1,1],
    ]],
    4:['skyblue', true, [
        [0,1,1],
        [1,1,0],
    ]],
    5:['yellowgreen', true, [
        [1,1,1],
        [1,0,0],
    ]],
    6:['pink', true, [
        [1,1,1],
        [0,0,1],
    ]],
    7:['yellow', true, [
        [1,1,1,1],
    ]],
    10:['red', false, []],
    20:['blue', false, []],
    30:['orange', false, []],
    40:['skyblue', false, []],
    50:['yellowgreen', false, []],
    60:['pink', false, []],
    70:['yellow', false, []],
}

// blockDict, array 둘 다 만들어 본 상태, 맞는 코드 찾고 하나 삭제 예정

//칸만들기, 데이터생성
function 칸만들기 (){
    const fragment = document.createDocumentFragment();
    for(let i=0; i < 20; i++){
        let tr = document.createElement('tr');
        let arr=[];
        tetrisData.push(arr);
        fragment.appendChild(tr);
        for(let i=0; i < 10; i++){
            let td = document.createElement('td');
            arr.push(0);
            tr.appendChild(td);
        }    
    }
    console.log(tetrisData);
    tetris.appendChild(fragment);
}

칸만들기();
블록생성();

// 랜덤블록생성
function 블록생성(){
    let 블록 = blockArr[Math.floor(Math.random()*blockArr.length)][2]
    console.log(블록);
    블록.forEach(function(tr, i){
        tr.forEach(function(td, j){
            tetrisData[i][j+3] =td
        })
    })
    화면그리기(블록);
}

// 화면그리기
function 화면그리기(블록){
    tetrisData.forEach(function(tr, i){
        tr.forEach(function(td, j){
            tetris.children[i].children[j].className = blockDict[td][0];
        })
    })
}

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