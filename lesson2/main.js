let money = 6000,
  income = "freelance",
  addExpenses = "Internet, Rent, Food, Phone",
  deposit = true,
  mission = 100000,
  period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(` Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} евро`);

console.log(addExpenses.toLowerCase().split(" "));
let budgetDay = money / 30;
console.log(budgetDay);
