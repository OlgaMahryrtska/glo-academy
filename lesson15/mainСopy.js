"use strict";
let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
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
  incomeItem = document.querySelectorAll(".income-items"),
  data = document.querySelector(".data"),
  textInputs = data.getElementsByTagName("input");
console.log(textInputs);
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
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].disabled = true;
    }
    incomePlus.disabled = true;
    expensesPlus.disabled = true;
    cancel.style.display = "block";
    start.style.display = "none";
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
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
        console.log(typeof cashIncome);
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
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
  reset: function () {
    let inputTextData = document.querySelectorAll(".data input[type = text]"),
      resultInputAll = document.querySelectorAll(".result input[type=text]");
    inputTextData.forEach(function (elem) {
      elem.value = "";
      elem.removeAttribute("disabled");
      periodSelect.value = "0";
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function (elem) {
      elem.value = "";
    });
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = "block";
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = "block";
    }
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.deposit = false;
    this.percentDeposit = 0;
    this.addExpenses = [];

    cancel.style.display = "none";
    start.style.display = "block";
    incomePlus.removeAttribute("disabled");
    expensesPlus.removeAttribute("disabled");
    depositCheck.checked = false;
  },
};

start.addEventListener("click", appData.start.bind(appData));

salaryAmount.addEventListener("input", appData.disableBtn);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
cancel.addEventListener("click", appData.reset.bind(appData));

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
