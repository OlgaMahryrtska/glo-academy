// 1) Создать переменную num со значением 266219 (тип данных число)
let num = 266219;
sNum = num
  .toString()
  .split("")
  .map((el) => parseInt(el));
// 2) Вывести в консоль произведение (умножение) цифр этого числа
let res = 1;
for (var i in sNum) {
  res *= sNum[i];
}
console.log(res);
// 3) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
let exp = res ** 3;
console.log(exp);
// 4) Вывести в консоль первые 2 цифры полученного числа
newStr = exp.toString().split("");
let firstTwo = newStr.splice(0, 2).map((el) => parseInt(el));
console.log(firstTwo);
