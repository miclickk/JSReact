export function task02(){
  let numbers = [3, 7, 2, 10, 5];
  let doubled = numbers.map(function(number){ return number * 2; });
  let over5 = numbers.filter(function(number){ return number > 5; });
  let firstOver5 = numbers.find(function(number){ return number > 5; });
  let sum = numbers.reduce(function(total, number){ return total + number; }, 0);
  let has10 = numbers.includes(10);
  return { numbers, doubled, over5, firstOver5, sum, has10 };
}
