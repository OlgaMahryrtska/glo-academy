let income = 400,
  deposit = 800,
  mission = 5000,
  period = "5";
let money, oneExpense;
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую",
  "Квартплата, проездной, кредит"
);
// let credit = confirm("Есть ли у вас депозит в банке?");
// ");
// let amount1 = parseInt(prompt("Во сколько это обойдется?"));
//
// let amount2 = parseInt(prompt("Во сколько это обойдется?"));

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let expenses = [];
let start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();
let showTypeOf = (someParam) => {
  console.log(typeof someParam);
};
let getExpensesMonth = () => {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");
    do {
      oneExpense = prompt(" Во сколько это обойдется?");
      console.log(" Введите число");
    } while (!isNumber(oneExpense));

    sum += +oneExpense;
  }

  console.log(" расходы  " + sum);
  console.log(expenses);
  return sum;
};
let expensesAmount = getExpensesMonth();
console.log(" Расходы за месяц " + expensesAmount);
let getAccumulatedMonth = () => {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
//бюджет на 1 день
let budgetDay = () => {
  return accumulatedMonth / 30;
};

// достижение цели
let getTargetMonth = () => {
  let purpose = mission / accumulatedMonth;
  if (purpose < 0) {
    return " Цель не будет достигнута";
  } else {
    return " Ваша цель будет достигнута через  " + purpose + " месяцев";
  }
};

console.log(" Ваши накопления за месяц  " + accumulatedMonth);
console.log(" Ваш ежедневный доход  " + budgetDay(accumulatedMonth));
console.log(getTargetMonth());

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
