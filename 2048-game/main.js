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
    let 랜덤칸 = 빈칸배열[Math.floor(Math.random()*빈칸배열.length)];
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

let 드래그시작 = false;
let 드래그중 = false;
let 시작좌표;
let 끝좌표;

window.addEventListener("mousedown", function(event){
    드래그시작 = true;
    시작좌표 = [event.clientX, event.clientY];
})

window.addEventListener("mouseup", function(event){
    드래그시작 = false;

    //드래그 방향 찾기
    끝좌표 = [event.clientX, event.clientY];
    let 방향;
    if(드래그중){
        let x차이 = [끝좌표[0] - 시작좌표[0]];
        let y차이 = [끝좌표[1] - 시작좌표[1]];
        if(x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
            방향 = "오른쪽";
        }else if(x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
            방향 = "왼쪽";
        }else if(y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
            방향 = "위쪽";
        }else if(y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
            방향 = "아래쪽";
        }
    }

    //드래그 방향에 따른 숫자 이동, 숫자 합치기
    let 새데이터;
    switch (방향){
        case "왼쪽":
            새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터,j){
                    if(행데이터){
                        if(새데이터[i][새데이터[i].length -1] && 새데이터[i][새데이터[i].length -1] === 행데이터){
                            새데이터[i][새데이터[i].length -1] *=2;
                        }else{
                            새데이터[i].push(행데이터);
                        }
                    }
                });
            });
            [1,2,3,4].forEach(function(열데이터, i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[i][j] = 새데이터[i][j] || 0;
                });
            });    
            break;
        case "오른쪽":
            새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터,j){
                    if(행데이터){
                        if(새데이터[i][0] && 새데이터[i][0] === 행데이터){
                            새데이터[i][0] *=2;
                        }else{
                            새데이터[i].unshift(행데이터);
                        }
                    }
                });
            });
            [1,2,3,4].forEach(function(열데이터, i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[i][3-j] = 새데이터[i][j] || 0;
                });
            });    
            break;
        case "위쪽":
            새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터,j){
                    if(행데이터){
                        if(새데이터[j][새데이터[j].length -1] && 새데이터[j][새데이터[j].length -1] === 행데이터){
                            새데이터[j][새데이터[j].length -1] *=2;
                        }else{
                            새데이터[j].push(행데이터);
                        }                        
                    }
                });
            });
            [1,2,3,4].forEach(function(행데이터, i){
                [1,2,3,4].forEach(function(열데이터, j){
                    데이터[j][i] = 새데이터[i][j] || 0;
                });
            });    
            break;
        case "아래쪽":
            새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터,j){
                    if(행데이터){
                        if(새데이터[j][0] && 새데이터[j][0] === 행데이터){
                            새데이터[j][0] *=2;
                        }else{
                            새데이터[j].unshift(행데이터);
                        }
                    }
                });
            });
            [1,2,3,4].forEach(function(행데이터, i){
                [1,2,3,4].forEach(function(열데이터, j){
                    데이터[3-j][i] = 새데이터[i][j] || 0;
                });
            });    
            break;
    }
    랜덤생성();
});

window.addEventListener("mousemove", function(event){
    if(드래그시작){
        드래그중 = true;
    }
})