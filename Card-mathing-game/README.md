# 🃏 카드 짝 맞추기 게임

### 1. 카드 뒤집기 구현

#### 1-1) 뒤집기 효과를 낼 수 있는 css는 구글링해서 적용

- [Card Flip Effect](http://uxuiz.cafe24.com/wp/archives/1212)

#### 1-2) 반복문으로 가로\*세로 만큼 카드를 세팅하고, 카드 클릭시 뒤집는 기능 구현

```javascript
let 가로 = 3;
let 세로 = 4;

function 카드세팅(가로, 세로) {
  for (let i = 0; i < 가로 * 세로; i++) {
    const card = document.createElement("div");
    card.className = "card";
    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    const cardFront = document.createElement("div");
    cardFront.className = "card-front";
    const cardBack = document.createElement("div");
    cardBack.className = "card-back";
    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    document.body.appendChild(card);
    (function (c) {
      c.addEventListener("click", function () {
        c.classList.toggle("flipped");
      });
    })(card);
  }
}
카드세팅(가로, 세로);
```

- 클로저 문제가 생김 → 즉시실행함수로 해결.

### 2. 카드 색상 랜덤

```javascript
let 색상 = [
  "red",
  "yellow",
  "green",
  "orange",
  "blue",
  "pink",
  "red",
  "yellow",
  "green",
  "orange",
  "blue",
  "pink",
];
let 랜덤색상 = [];

//색상 랜덤 넣기
for (let i = 0; 색상.length > 0; i++) {
  랜덤색상 = 랜덤색상.concat(
    색상.splice(Math.floor(Math.random() * 색상.length), 1)
  );
}
```

- `Math.random`,`concat`

### 3. delay효과로 카드 한장씩 뒤집기 → 전부 뒤집기

```javascript
//카드 하나씩 뒤집기
document.querySelectorAll(".card").forEach(function (card, index) {
  setTimeout(() => {
    card.classList.add("flipped");
  }, 1000 + 100 * index);
});
```

- `forEach`로 요소마다 전부 flipped `class`넣기

```javascript
//전부 뒤집기
setTimeout(() => {
  document.querySelectorAll(".card").forEach(function (card) {
    card.classList.remove("flipped");
  });
  클릭플래그 = true;
}, 3000);
```

### 4. 플래그변수 사용

```javascript
(function (c) {
  c.addEventListener("click", function () {
    if (클릭플래그 && !완성카드.includes(c)) {
      c.classList.toggle("flipped");
      클릭카드.push(c);
      if (클릭카드.length === 2) {
        if (
          클릭카드[0].querySelector(".card-back").style.backgroundColor ===
          클릭카드[1].querySelector(".card-back").style.backgroundColor
        ) {
          완성카드.push(클릭카드[0], 클릭카드[1]);
          클릭카드 = [];
          if (완성카드.length === 12) {
            끝시간 = new Date();
            wrapper.classList.add("gameSet");
            const desc = document.createElement("p");
            document.body.appendChild(desc);
            desc.innerHTML = "(끝시간 - 시작시간)/1000";
          }
        } else {
          setTimeout(() => {
            클릭카드[0].classList.remove("flipped");
            클릭카드[1].classList.remove("flipped");
            클릭플래그 = true;
            클릭카드 = [];
          }, 500);
        }
      }
    }
  });
})(card);
```
