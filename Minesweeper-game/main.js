const tbody = document.querySelector("#table tbody");

document.querySelector("#exec").addEventListener("click",function () {
    let dataSet = [];
    const hor = parseInt(document.querySelector("#hor").value);
    const ver = parseInt(document.querySelector("#ver").value);
    const mine = parseInt(document.querySelector("#mine").value);

    //지뢰 위치 랜덤 뽑기
    let 후보 = Array(hor*ver)
    .fill()
    .map(function (item, index) {
        return index;
    });

    let 셔플 = [];
    while (후보.length > hor*ver-mine) {
    let 이동값 = 후보.splice(Math.floor(Math.random() * 후보.length), 1)[0];
    셔플.push(이동값);
    }

    //지뢰 테이블 만들기
    tbody.innerHTML = '';
    for(i = 0; i < hor; i++){
        let arr = [];
        const tr = document.createElement('tr');
        dataSet.push(arr);
        for(j = 0; j < ver; j++){
            arr.push(0);
            const td = document.createElement('td');
            //우클릭시,
            td.addEventListener("contextmenu",function (e) {
                e.preventDefault();
                //몇번째 줄, 칸인지 확인하기, 깃발 꽂기
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 줄 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                let 칸 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                //우클릭시, 두번 - 물음표, 세번 - 원상복구
                if(e.currentTarget.textContent === "" || e.currentTarget.textContent === "X"){
                    e.currentTarget.textContent = "!";
                }else if(e.currentTarget.textContent === "!"){
                    e.currentTarget.textContent = "?";
                }else if(e.currentTarget.textContent = "?"){
                    if(dataSet[칸][줄] === "X"){
                        e.currentTarget.textContent = "X";
                    }else if(dataSet[칸][줄] === 1) {
                        e.currentTarget.textContent = "";
                    } 
                }
            })
            //클릭시, 터지거나 or 지뢰개수
            td.addEventListener("click",function(e){
                e.currentTarget.classList.add("open");
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 줄 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                let 칸 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if(dataSet[칸][줄] === "X"){
                    e.currentTarget.textContent = "펑";
                }else{
                    dataSet[칸][줄] = 1;
                    let 주변 = [dataSet[칸][줄-1], dataSet[칸][줄+1]];
                    if(dataSet[칸-1]){
                        주변 = 주변.concat([dataSet[칸-1][줄-1], dataSet[칸-1][줄], dataSet[칸-1][줄+1]]);
                    }
                    if(dataSet[칸+1]){
                        주변 = 주변.concat([dataSet[칸+1][줄-1], dataSet[칸+1][줄], dataSet[칸+1][줄+1]]);
                    }
                    let 주변지뢰개수 = 주변.filter(value => value === "X").length
                    e.currentTarget.textContent = 주변지뢰개수
                    //0 클릭시, 주변 8칸 open
                    if(주변지뢰개수 === 0){
                        let 주변칸 = [tbody.children[칸].children[줄-1],tbody.children[칸].children[줄+1]];
                        if(tbody.children[칸-1]){
                            주변칸 = 주변칸.concat([tbody.children[칸-1].children[줄-1],
                                tbody.children[칸-1].children[줄],
                                tbody.children[칸-1].children[줄+1]])
                        }
                        if(tbody.children[칸+1]){
                            주변칸 = 주변칸.concat([tbody.children[칸+1].children[줄-1],
                                tbody.children[칸+1].children[줄],
                                tbody.children[칸+1].children[줄+1]])
                        }
                        주변칸.filter(function(v){
                            return !!v;
                        }).forEach(function (옆칸) {
                            let 부모tr = 옆칸.parentNode;
                            let 부모tbody = 옆칸.parentNode.parentNode;
                            let 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            let 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);   
                            if(dataSet[옆칸줄][옆칸칸] !==1){
                                옆칸.click();
                            }         
                        });
                        }
                    }
                })
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //테이블에 지뢰 심기
    for(k=0; k< 셔플.length; k++){
        let 세로 = Math.floor(셔플[k] / ver);
        let 가로 = 셔플[k] % hor;
        tbody.children[세로].children[가로].innerHTML = 'X'
        dataSet[세로][가로] = 'X'
    }
})