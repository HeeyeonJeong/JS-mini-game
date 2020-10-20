const 테이블 = document.querySelector("#table");
const 데이터 = [];

function 초기화(){
    const fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(function(열){
        let 열데이터 = [];
        데이터.push(열데이터);
        const tr = document.createElement("tr");
        [1,2,3,4].forEach(function(행){
            열데이터.push(0);
            const td = document.createElement("td");
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    테이블.appendChild(fragment);
}

function 랜덤생성(){
    let 빈칸배열 = [];
    데이터.forEach(function(열데이터, i){
        열데이터.forEach(function(행데이터, j){
            if(!행데이터){
                빈칸배열.push([i,j]);
            }
        });
    });
    console.log(빈칸배열);
    let 랜덤칸 = 빈칸배열[Math.floor(Math.random()*빈칸배열.length)];
    console.log(랜덤칸);
    데이터[랜덤칸[0]][랜덤칸[1]] = 2;
    그리기();
}


function 그리기(){
    데이터.forEach(function(열데이터, i){
        열데이터.forEach(function(행데이터, j){
            if(행데이터 > 0){
                테이블.children[i].children[j].textContent = 행데이터;
            }else{
                테이블.children[i].children[j].textContent = "";
            }
        });
    });
}

초기화();
랜덤생성();
