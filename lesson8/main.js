"use sctrict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
  oneExpense,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
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
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome = prompt(
        " Какой у вас дополнительный заработок?",
        "Таксую"
      );
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
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      answer1 = prompt("Введите обязательную статью расходов?");
      do {
        oneExpense = prompt(" Во сколько это обойдется?");
        console.log(" Введите число");
      } while (!isNumber(oneExpense));

      // appData.expensesMonth += +oneExpense;
      appData.expenses[answer1] = oneExpense;
    }
  },
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log(" Ваш бюджет на месяц " + appData.budgetMonth);
    console.log(" Ваш ежедневный бюджет " + appData.budgetDay);
  },
  // достижение цели
  getTargetMonth: () => {
    return (mission = appData.mission / appData.budgetMonth);
  },
  getStatusIncome: () => {
    if (appData.budgetDay < 300) {
      return " Низкий уровень дохода!";
    } else if (appData.budgetDay <= 800) {
      return " Средний уровень дохода";
    } else {
      return " Высокий уровень дохода!";
    }
  },
  getInfoDeposit: () => {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt(" Какой годовой процент?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: () => {
    return appData.budgetMonth * appData.period;
  },
};
appData.asking();
appData.getExpensesMonth();
console.log(appData.expenses);
console.log("расходы за месяц " + appData.expensesMonth);

console.log(appData.getBudget());
console.log(appData.getTargetMonth());
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

for (item in appData) {
  console.log(
    " Наша программа включает в себя данные: " + item + " - " + appData[item]
  );
}
appData.getInfoDeposit();
