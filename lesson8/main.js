"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

let start = function () {
  do {
    money = +prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 5,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let cashIncome;
    let itemIncome;
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      do {
        itemIncome = prompt(" Какой у вас дополнительный заработок?", "Таксую");
      } while (isNumber(itemIncome));

      do {
        cashIncome = prompt(
          " Сколько в месяц вы на этом зарабатываете?",
          10000
        );
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Квартплата, проездной, кредит"
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(",").toString();

    appData.addExpenses = appData.addExpenses
      .split(" ")
      .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(" ");

    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let sum = 0;
    let answer1 = "";
    for (let i = 0; i < 2; i++) {
      do {
        answer1 = prompt("Введите обязательную статью расходов?");
      } while (isNumber(answer1));

      do {
        sum = +prompt(" Во сколько это обойдется?").trim();
        console.log(" Введите число");
      } while (!isNumber(sum));

      appData.expenses[answer1] = sum;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // достижение цели
  getTargetMonth: function () {
    let targetPeriod = appData.mission / appData.budgetMonth;

    return targetPeriod;
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      return " Высокий уровень дохода!";
    } else if (
      (appData.budgetDay > 600 || appData.budgetDay == 600) &&
      appData.budgetDay < 1200
    ) {
      return " Средний уровень дохода";
    } else if (appData.budgetDay == 0 || appData.budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt(" Какой годовой процент?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};
appData.asking();
appData.getExpensesMonth();
// console.log(appData.addExpenses);
console.log("расходы за месяц " + appData.expensesMonth);
appData.getBudget();

if (appData.getTargetMonth() < 0) {
  console.log(" Цель не будет достигнута");
} else {
  console.log(
    " Ваша цель будет достигнута через  " +
      Math.ceil(appData.getTargetMonth()) +
      " месяцев"
  );
}

console.log(appData.getStatusIncome());
console.log(appData.addExpenses);

for (let item in appData) {
  console.log(
    " Наша программа включает в себя данные: " + item + " - " + appData[item]
  );
}
appData.getInfoDeposit();
