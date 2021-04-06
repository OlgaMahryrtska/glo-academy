//1-е усложненное задание
let arr_Days = [];
arr_Days["ru"] = [
  " Понедельник",
  " Вторник",
  " Среда",
  " Четверг",
  " Пятница",
  " Суббота",
  " Воскресенье",
];
arr_Days["en"] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let lang = "ru";
// console.log(arr_Days[lang]);

let ruDays = [
  " Понедельник",
  " Вторник",
  " Среда",
  " Четверг",
  " Пятница",
  " Суббота",
  " Воскресенье",
];
enDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
//тернарный оператор
let result = lang == "ru" ? ruDays : enDays;
// console.log(result);

//if else
if (lang == "ru") {
  console.log(ruDays);
} else {
  console.log(enDays);
}
// switch
switch (lang) {
  case "en":
    console.log(enDays);
    break;
  case "ru":
    console.log(ruDays);
}
//2-е уложненное задание
let namePerson = "Артем";

let position =
  namePerson == "Артем"
    ? " директор "
    : namePerson == "Максим"
    ? "преподаватель"
    : " студент";
console.log(position);
