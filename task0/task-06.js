export function task06(){
  function isEven(number){ return number % 2 === 0; }
  function getFullName(firstName, lastName){
    return firstName + ' ' + lastName;
  }
  function calculatePrice(price, quantity){
    return price * quantity;
  }
  function calculateDiscount(price, percent){
    return price - price * percent / 100;
  }
  let getMax = (a, b) => a > b ? a : b;
  return {
    isEven: isEven(4),
    fullName: getFullName('Zhasmin', 'Uvali'),
    price: calculatePrice(10, 3),
    discount: calculateDiscount(100, 20),
    max: getMax(3, 7)
  };
}
