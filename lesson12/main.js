"use strict";
let start = document.getElementById("start"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  periodSelect = document.querySelector(".period-select"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additonalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalExpenses = document.querySelector(".additional_expenses"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  incomeItem = document.querySelectorAll(".income-items");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    console.log("salaryAmount.value:  ", salaryAmount.value);
    this.getExpenses();
    this.getAddExpenses();
    this.getExpensesMonth();
    this.getAddIncome();
    this.getIncome();
    this.getIncomeMonth();
    this.getBudget();
    this.disableBtn();
    this.showResult();
  },
  disableBtn: function () {
    start.disabled = false;
    if (salaryAmount.value === "") {
      alert(' Ошибка! Поле: "Месячный доход" должно быть заполнено');
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additonalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener(
      "change",
      function () {
        incomePeriodValue.value = this.calcPeriod();
      }.bind(appData)
    );
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
        console.log(typeof cashIncome);
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  // достижение цели
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay > 1200) {
      return " Высокий уровень дохода!";
    } else if (
      (this.budgetDay > 600 || this.budgetDay == 600) &&
      this.budgetDay < 1200
    ) {
      return " Средний уровень дохода";
    } else if (this.budgetDay == 0 || this.budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },
  getInfoDeposit: function () {
    this.deposit = confirm("Есть ли у вас депозит в банке?");
    if (this.deposit) {
      do {
        this.percentDeposit = prompt(" Какой годовой процент?", "10");
      } while (!isNumber(this.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  inputPeriod: function () {
    let periodAmount = document.querySelector(".period-amount");
    periodAmount.innerHTML = periodSelect.value;
  },
};

start.addEventListener("click", appData.start.bind(appData));
salaryAmount.addEventListener("input", appData.disableBtn);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.inputPeriod);

if (appData.getTargetMonth() < 0) {
  console.log(" Цель не будет достигнута");
} else {
  console.log(
    " Ваша цель будет достигнута через  " +
      Math.ceil(appData.getTargetMonth()) +
      " месяцев"
  );
}

for (let item in appData) {
  console.log(
    " Наша программа включает в себя данные: " + item + " - " + appData[item]
  );
}
appData.getInfoDeposit();
