# 💫 2048

### 1. 4\*4 테이블 만들기

```javascript
const 테이블 = document.querySelector("#table");
const 데이터 = [];

function 초기화() {
  const fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function (열) {
    let 열데이터 = [];
    데이터.push(열데이터);
    const tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function (행) {
      열데이터.push(0);
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  테이블.appendChild(fragment);
}

초기화();

//0: (4) [0, 0, 0, 0]
//1: (4) [0, 0, 0, 0]
//2: (4) [0, 0, 0, 0]
//3: (4) [0, 0, 0, 0]
```

- `frag`메모리에 `tr`을 넣고 한번에 `table`로 `appenChild`해주기<br/>
  <br/>

```
document.createDocumentFragment( )
```

> 가상의 `document`를 만듭니다. 왜 이게 중요하냐면 자바스크립트로 `document`의 태그를 조작하는 것은 매우 성능이 떨어집니다. 특히 여러 태그를 반복문을 통해 동시에 추가할 때는요. 이럴 때 미리 가상의 `document`를 만들어서 여기에 추가를 한 후, 한 번에 `document`에 추가합니다. 이러면 진짜 `document`는 한 번만 조작하면 돼서 성능에 부담이 덜합니다. (출처 : zerocho)

<br/>

### 2. 그리기 함수 - 데이터를 화면과 일치 시키기

```javascript
function 그리기() {
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (행데이터 > 0) {
        테이블.children[i].children[j].textContent = 행데이터;
      } else {
        테이블.children[i].children[j].textContent = "";
      }
    });
  });
}

그리기();
```

<br/>

### 3. 랜덤생성 - 4\*4 중 한칸을 뽑아 랜덤으로 숫자 넣기

```javascript
function 랜덤생성() {
  let 빈칸배열 = [];
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (!행데이터) {
        빈칸배열.push([i, j]);
      }
    });
  });
  console.log(빈칸배열);
  let 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
  console.log(랜덤칸);
  데이터[랜덤칸[0]][랜덤칸[1]] = 2;
  그리기();
}
```

<br/>

### 4. 플래그 변수 사용해서 `mousemove` 무조건적 실행 막기

```javascript
let 드래그시작 = false;
window.addEventListener("mousedown", function (event) {
  드래그시작 = true;
  console.log(event);
});

window.addEventListener("mouseup", function (event) {
  드래그시작 = false;
  console.log(event);
});

window.addEventListener("mousemove", function (event) {
  if (드래그시작) {
    console.log(event);
  }
});
```

- `true`시에만 `mousemove` `event` 실행됨<br/>
  <br/>

### 4-1) 마우스 좌표로 방향 판단하기

```javascript
let 드래그시작 = false;
let 드래그중 = false;
let 시작좌표;
let 끝좌표;

window.addEventListener("mousedown", function (event) {
  드래그시작 = true;
  시작좌표 = [event.clientX, event.clientY];
});

window.addEventListener("mouseup", function (event) {
  드래그시작 = false;
  끝좌표 = [event.clientX, event.clientY];
  if (드래그중) {
    let 방향;
    let x차이 = [끝좌표[0] - 시작좌표[0]];
    let y차이 = [끝좌표[1] - 시작좌표[1]];
    if (x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = "오른쪽";
    } else if (x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = "왼쪽";
    } else if (y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = "위쪽";
    } else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = "아래쪽";
    }
    console.log(방향);
  }
});

window.addEventListener("mousemove", function (event) {
  if (드래그시작) {
    드래그중 = true;
  }
});
```

- 드래그중 변수 `true`시 에만 `mousemove` 좌표로 방향을 판단할 수 있도록 변수를 만듦. + `mouseup`시 방향 판단<br/>
  <br/>

```
Math.abs( ) : 절댓값
screenX : 모니터 기준 좌표
pageX : 페이지(스크롤 포함)
clientX : 브라우저 화면 기준
offsetX : 이벤트 타겟 기준
```

<br/>

### 5. `mouseup`시 - 드래그 방향에 따른 숫자 이동, 숫자 합치기

```javascript
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
```

- 네 방향을 판단하여 `switch문`을 돌면서 해당 방향에 맞는 case가 걸리게 된다.
- 랜덤으로 들어오는 숫자가 새데이터 배열에 들어오게 되고, `forEach문`을 돌면서 새데이터의 전 index요소가 행데이터와 같다면 숫자가 두배로 합쳐진다.
