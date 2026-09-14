// Задача 1.

let firstName = "Ivan";
let lastName = "Ivanov";
let isStudent = false;

console.log(firstName);
console.log(lastName);
console.log(isStudent);

// Задача 2.

const _age = 40;
const currentYear = 2026;
const birthYear = currentYear - _age;

console.log(_age);
console.log(currentYear);
console.log(birthYear);

// Задача 3.

const str = `Меня зовут ${firstName} ${lastName}, мне ${_age} лет. Я ученик курса : ${isStudent}`;

console.log(str);

// Задача 4.

let a = "123";
let b = +"456";
let c = Number("789");
let d = Boolean(0);
let e = Boolean(" ");
let result = a + b + c + d + e;

console.log(result);
