const CHARACTERISTICS = "cha";

const product = {
  name: "Ноутбук",
  price: 60000,
  [CHARACTERISTICS]: { brand: "Apple", processor: "M1" },
};

const discount = {
  percent: 10,
  day: 25,
};

const product2 = { ...product, ...discount };
product2.name = "Планшет";

console.log(product);
console.log(product2);

// for (const productKey in product) {
//   if (productKey === CHARACTERISTICS) {
//     for (const charKey in product[productKey]) {
//       console.log(`${charKey}:`, product[productKey][charKey]);
//     }
//   } else {
//     console.log(`${productKey}:`, product[productKey]);
//   }
// }
