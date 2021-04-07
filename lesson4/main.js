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
let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = parseInt(prompt("Во сколько это обойдется?"));
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = parseInt(prompt("Во сколько это обойдется?"));

let showTypeOf = (someParam) => {
  console.log(typeof someParam);
};
let getExpensesMonth = (a, b) => {
  let sumExpenses = a + b;
  showTypeOf(sumExpenses);
  return sumExpenses;
};

let getAccumulatedMonth = (param1, param2) => {
  let savings = param1 - param2;
  showTypeOf(savings);
  return savings;
};
//бюджет на 1 день
let budgetDay = (savings, daysNum) => {
  return savings / daysNum;
};
// достижение цели
let getTargetMonth = (savings, purpose) => {
  return purpose / savings;
};

let getStatusIncome = () => {
  if (budgetDay < 300) {
    return " Низкий уровень дохода!";
  } else if (budgetDay <= 800) {
    return " Средний уровень дохода";
  } else {
    return " Высокий уровень дохода!";
  }
};
console.log(getStatusIncome());
let accumulatedMonth = getAccumulatedMonth(
  money,
  getExpensesMonth(amount1, amount2)
);
console.log(getExpensesMonth(amount1, amount2));
console.log(" Ваши накопления за месяц  " + accumulatedMonth);
console.log(" Ваш ежедневный доход  " + budgetDay(accumulatedMonth, 31));
console.log(
  " Ваша цель будет достигнута через  " +
    getTargetMonth(accumulatedMonth, mission) +
    " месяцев"
);
