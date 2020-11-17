# 💣 지뢰찾기

### 1. 지뢰찾기 테이블 만들기

실행버튼 클릭시, `input`의 value를 받아서 사용자가 원하는 값만큼 테이블이 만들어진다.
`parseInt`를 활용하여 받아온 value 문자를 숫자로 바꿔준다.
<br/>

#### 1-1) 2중 반복문을 만들어서 테이블을 만든다.

```javascript
document.querySelector("#exec").addEventListener("click", function () {
  const hor = parseInt(document.querySelector("#hor").value);
  const ver = parseInt(document.querySelector("#ver").value);
  const mine = parseInt(document.querySelector("#mine").value);
  console.log(hor, ver, mine);

  let dataSet = [];
  const tbody = document.querySelector("#table tbody");
  for (i = 0; i < hor; i++) {
    let arr = [];
    dataSet.push(arr);
    for (j = 0; j < ver; j++) {
      arr.push(1);
    }
  }
  console.log(dataSet);
});
```

#### 1-2) `appendChild`를 이용해 `tbody`에 `html`을 넣는다.

```javascript
let dataSet = [];
const tbody = document.querySelector("#table tbody");
tbody.innerHTML = "";
for (i = 0; i < hor; i++) {
  let arr = [];
  let tr = document.createElement("tr");
  dataSet.push(arr);
  for (j = 0; j < ver; j++) {
    arr.push(1);
    let td = document.createElement("td");
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
console.log(dataSet);
```

 <br/>
 
### 2. 지뢰 위치 랜덤 뽑기
```javascript
    let 후보 = Array(hor*ver) //가로*세로 값 만큼의 후보군 뽑기
    .fill()
    .map(function (item, index) {
        return index;
    });
    console.log(후보);

    let 셔플 = [];
    while (후보.length > 80) {
    let 이동값 = 후보.splice(Math.floor(Math.random() * 후보.length), 1)[0];
    셔플.push(이동값);
    }
    console.log(셔플);

````

- 80은 예시로 시범 진행해 본 10*10 테이블에서 지뢰 20개를 제한으로 80을 작성해두었다. 지뢰는 20개가 필요한데, 굳이 반복문을 100번 돌릴 필요가 없기 때문.

### 3. 테이블에 지뢰 심기

```javascript
  for(k=0; k< 셔플.length; k++){
      let 세로 = Math.floor(셔플[k] / 10);
      let 가로 = 셔플[k] % 10;
      console.log(세로,가로);
      tbody.children[세로].children[가로].innerHTML = 'X'
      dataSet[세로][가로].innerHTML = 'X'
  }
````

- 랜덤으로 뽑은 지뢰의 위치를 각각 세로, 가로의 index 찾아서 지뢰를 심기
  <br/>

---

#### +) 수정한 코드

```javascript
while (후보.length > hor*ver-mine)
```

- 강의에서는 편의성을 위해서 지뢰가 20개라고 value를 고정하여 코드를 작성했다. 하지만 게임실행시에는 value값을 정해두지 않을테니 원하는 지뢰 갯수대로 테이블에 심어질 수 있도록 코드를 수정하였다.

```javascript
let 세로 = Math.floor(셔플[k] / ver);
let 가로 = 셔플[k] % hor;
```

- 위 수정 이유와 마찬가지로 지뢰갯수가 바뀌기 때문에, 10으로 숫자를 고정한다는 것은 사용자가 가로, 세로 값을 10으로만 작성해야 진행되는 코드이다. 때문에 사용자가 원하는 가로, 세로값 기준으로 지뢰를 심을 수 있도록 코드를 수정하였다.

---

### 4. 우클릭으로 깃발 꼽기

```javascript
td.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  //몇번째 줄, 칸인지 확인하기
  let 부모tr = e.currentTarget.parentNode;
  let 부모tbody = e.currentTarget.parentNode.parentNode;
  let 줄 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
  let 칸 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
  console.log(줄, 칸, e.currentTarget);
  e.currentTarget.textContent = "!";
  dataSet[칸][줄] = "!";
});
```

- `contextmenu` = 마우스 오른쪽 클릭시 나오는 메뉴, `e.preventDefault( )`로 우클릭방지
- `parentNode` 사용하여 부모요소 찾기
- data 와 화면 일치 시키기

### 5. 클릭시 지뢰 터지거나, 주변 지뢰 갯수 알려주기

```javascript
td.addEventListener("click", function (e) {
  let 부모tr = e.currentTarget.parentNode;
  let 부모tbody = e.currentTarget.parentNode.parentNode;
  let 줄 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
  let 칸 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
  if (dataSet[칸][줄] === "X") {
    e.currentTarget.textContent = "펑";
  } else {
    let 주변 = [dataSet[칸][줄 - 1], dataSet[칸][줄 + 1]];
    if (dataSet[칸 - 1]) {
      주변 = 주변.concat([
        dataSet[칸 - 1][줄 - 1],
        dataSet[칸 - 1][줄],
        dataSet[칸 - 1][줄 + 1],
      ]);
    }
    if (dataSet[칸 + 1]) {
      주변 = 주변.concat([
        dataSet[칸 + 1][줄 - 1],
        dataSet[칸 + 1][줄],
        dataSet[칸 + 1][줄 + 1],
      ]);
    }
    e.currentTarget.textContent = 주변.filter((value) => value === "X").length;
  }
});
```

<br/>

---

`concat()` 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.
`filter()` 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.

---

### 6. 0 클릭시, 주변 8칸 open

```javascript
if (주변지뢰개수 === 0) {
  let 주변칸 = [
    tbody.children[칸].children[줄 - 1],
    tbody.children[칸].children[줄 + 1],
  ];
  if (tbody.children[칸 - 1]) {
    주변칸 = 주변칸.concat([
      tbody.children[칸 - 1].children[줄 - 1],
      tbody.children[칸 - 1].children[줄],
      tbody.children[칸 - 1].children[줄 + 1],
    ]);
  }
  if (tbody.children[칸 + 1]) {
    주변칸 = 주변칸.concat([
      tbody.children[칸 + 1].children[줄 - 1],
      tbody.children[칸 + 1].children[줄],
      tbody.children[칸 + 1].children[줄 + 1],
    ]);
  }
  주변칸
    .filter(function (v) {
      return !!v;
    })
    .forEach(function (옆칸) {
      let 부모tr = 옆칸.parentNode;
      let 부모tbody = 옆칸.parentNode.parentNode;
      let 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
      let 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
      if (dataSet[옆칸줄][옆칸칸] !== 1) {
        옆칸.click();
      }
    });
}
```

### 7. 에러 잡아내기

#### 7-1) 지뢰가 터지면 게임이 끝난다

플래그 = 코드의 흐름을 좌우하는 변수로 사용함

- 플래그를 `false`로 정의해두고, `true`가 될시 return 되어 함수를 바로 종료한다.

```javascript
let 중단플래그 = false;

//클릭시 함수에 넣어줌
if (중단플래그) {
  return;
}

//지뢰 클릭시, 중단플래그 true
```

#### 7-2) 지뢰를 제외한 칸이 모두 열렸다면 게임 성공

```javascript
//열은칸 count, 지뢰 제외 전부 open시 승리
if (dataSet[칸][줄] === 1) {
  열은칸 += 1;
  console.log(열은칸);
  if (열은칸 === hor * ver - mine) {
    중단플래그 = true;
    result.textContent = "Victory!";
  }
}
```
