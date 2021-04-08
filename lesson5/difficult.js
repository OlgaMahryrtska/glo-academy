let strArr = ["12", "46", "18", "24", "26", "33", "40"];
for (i = 0; i < strArr.length; i++) {
  if (strArr[i].startsWith("2")) {
    console.log(strArr[i]);
  } else if (strArr[i].startsWith("4")) {
    console.log(strArr[i]);
  }
}
let num = 100;
for (let n = 2; n < num; n++) {
  for (let j = 2; j < n; j++) {
    if (n % j == 0) {
      continue;
    }
    console.log(n);
  }
}
