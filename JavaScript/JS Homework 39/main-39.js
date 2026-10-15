// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
  name: "Anonim",
  age: "Unkown",
  country: "Unknown",
};

console.log(person);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

const obj = {};

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

console.log(isEmpty(obj));

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
  title: "Заголовок",
  description: "Описание",
  isCompleted: true,
};

const modifications = {
  title: "Заголовок123",
  description: "Описание456",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const result = cloneAndModify(task, modifications);

for (let key in result) {
  console.log(key, result[key]);
}

console.log(task);
console.log(result);

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },
  method2() {
    console.log("Метод 2 вызван");
  },
  property: "Это не метод",
};

function callAllMethods(object) {
  for (let key in object) {
    if (typeof object[key] === "function") {
      object[key]();
    }
  }
}
callAllMethods(myObject);

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);
