let userInput = prompt(" Напишите что-нибудь");
getResult = (data) => {
  if (typeof data === "string") {
    console.log((newData = data.trim()));
    console.log(newData.length);
    if (newData.length > 30) {
      shortData = newData.slice(0, 30);
      console.log(shortData.length);
      return shortData + "...";
    }
  } else {
    console.log(" Это не строка!");
  }
};
console.log(getResult(userInput));
