// let age = 10;

// age++;

// const weather = "Снег";

// /// if statements ///

// //          true
// if (weather === "Снег") {
//   console.log("Остаемся дома");
// } else {
//   console.log("Идем гулять");
// }

// const temperature = -10;

// //      false
// if (temperature < 0) {
//   console.log("На улице холодно");
// } else if (temperature > 0 && temperature <= 20) {
//   console.log("Вроде бы тепло");
// } else {
//   console.log("Слишком жарко");
// }

// if ("") {
//   console.log(true);
// }

// const a = +prompt("Введите первое число", 0);
// const b = +prompt("Введите второе число", 0);
// let max;

// if (isNaN(a) || isNaN(b)) {
//   max = a > b ? a : b;
// } else {
//   max = "Test";
// }
// alert(max);

const weather = "Дождь";

// if (weather === "Дождь") {
//   console.log("Остаемся дома");
// } else if (weather === "Солнечно") {
//   console.log("Идем гулять");
// } else if (weather === "Облачно") {
//   console.log("Идем гулять , но берем с собой зонт");
// } else {
//   console.log("Что-то странное с погодой");
// }

switch (weather) {
  case "Дождь":
    console.log("Остаемся дома");
    break;
  case "Солнечно":
    console.log("Идем гулять");
    break;
  case "Облачно":
    console.log("Идем гулять , но берем с собой зонт");
    break;
  default:
    console.log("Что-то странное с погодой");
}

const ADMIN = "admin";
const MODERATOR = "moderator";

const role = ADMIN;

switch (role) {
  case ADMIN:
  case MODERATOR:
    console.log("Есть права");
    break;
  default:
    console.log("Тебе сюда нельзя!");
}
