let 후보군 = Array(45)
  .fill()
  .map(function (item, index) {
    return index + 1;
  });

let 셔플 = [];
while (후보군.length > 0) {
  let 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
  셔플.push(이동값);
}

let 보너스 = 셔플[셔플.length - 1]; //셔플의 마지막 숫자를 보너스숫자로
let 당첨숫자 = 셔플.slice(0, 6); //숫자 6개 뽑기

console.log(
  "당첨숫자",
  당첨숫자.sort(function (p, c) {
    return p - c;
  }),
  "보너스",
  보너스
);
