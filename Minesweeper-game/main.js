document.querySelector("#exec").addEventListener("click",function () {
    const hor = parseInt(document.querySelector("#hor").value);
    const ver = parseInt(document.querySelector("#ver").value);
    const mine = parseInt(document.querySelector("#mine").value);
    console.log(hor,ver,mine);

    //지뢰 테이블 만들기
    let dataSet = [];
    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = '';
    for(i = 0; i < hor; i++){
        let arr = [];
        let tr = document.createElement('tr');
        dataSet.push(arr);
        for(j = 0; j < ver; j++){
            arr.push(1);
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataSet);
})