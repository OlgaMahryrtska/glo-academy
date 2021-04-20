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

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
AppData.prototype.disableBtn = function () {
  start.disabled = false;
  if (salaryAmount.value === "") {
    alert(' Ошибка! Поле: "Месячный доход" должно быть заполнено');
    start.disabled = true;
  } else {
    start.disabled = false;
  }
};
AppData.prototype.start = function () {
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
};
AppData.prototype.disableBtn = function () {
  start.disabled = false;
  if (salaryAmount.value === "") {
    alert(' Ошибка! Поле: "Месячный доход" должно быть заполнено');
    start.disabled = true;
  } else {
    start.disabled = false;
  }
};
AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additonalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener("change", function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = cashIncome;
      console.log(typeof cashIncome);
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
// достижение цели
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
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
};
AppData.prototype.getInfoDeposit = function () {
  this.deposit = confirm("Есть ли у вас депозит в банке?");
  if (this.deposit) {
    do {
      this.percentDeposit = prompt(" Какой годовой процент?", "10");
    } while (!isNumber(this.percentDeposit));
    do {
      appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.inputPeriod = function () {
  let periodAmount = document.querySelector(".period-amount");
  periodAmount.innerHTML = periodSelect.value;
};
AppData.prototype.reset = function () {
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
};
AppData.prototype.eventListeners = function () {
  start.addEventListener("click", this.start.bind(appData));

  salaryAmount.addEventListener("input", this.disableBtn);
  expensesPlus.addEventListener("click", this.addExpensesBlock);
  incomePlus.addEventListener("click", this.addIncomeBlock);
  cancel.addEventListener("click", this.reset.bind(appData));

  periodSelect.addEventListener("input", this.inputPeriod);

  if (appData.getTargetMonth() < 0) {
    console.log(" Цель не будет достигнута");
  } else {
    console.log(
      " Ваша цель будет достигнута через  " +
        Math.ceil(this.getTargetMonth()) +
        " месяцев"
    );
  }

  for (let item in appData) {
    console.log(
      " Наша программа включает в себя данные: " + item + " - " + this[item]
    );
  }
  this.getInfoDeposit();
};
const appData = new AppData();
appData.eventListeners();
console.dir(AppData);
