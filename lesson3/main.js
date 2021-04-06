let income = 400,
  deposit = 800,
  mission = 5000,
  period = "5";
let money = prompt("Ваш месячный доход?");
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую",
  "Квартплата, проездной, кредит"
);
let credit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?"),
  amount1 = prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amount2 = prompt("Во сколько это обойдется?");
let budgetMonth = parseInt(money - amount1 - amount2);
alert("ваш ежемесячный бюджет  " + budgetMonth);
let missionPeriod = mission / budgetMonth;
alert(
  "Твоя цель будет достигнта через  " + Math.round(missionPeriod) + " месяца"
);

let budgetDay = money / 30;
alert(" Ваш ежедневный доход  " + Math.floor(budgetDay) + "условные единицы");

if (budgetDay > 1200 || budgetDay == 1200) {
  alert(" У вас высокий уровень дохода!");
}
if (budgetDay > 600 && budgetDay < 1200) {
  alert(" У вас средний уровень дохода!");
}
if (
  (budgetDay < 600 || budgetDay == 600) &&
  (budgetDay > 0 || budgetDay == 0)
) {
  alert(" К сожалению у вас уровень дохода ниже среднего!");
}
if (budgetDay < 0) {
  alert(" Что-то пошло не так!");
}
