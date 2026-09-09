export function task10(){
  let numbers = [10, 20, 30, 40];
  let [first, second] = numbers;
  let user = { id:1, name:'Anna', age:21 };
  let {name, age} = user;
  let with50 = [...numbers, 50];
  let age22 = {...user, age:22};
  let withEmail = {...user, email:'anna@mail.com'};
  let combined = [...numbers, 50, 60];
  function sum(...numbers){ return numbers.reduce(function(total, number){ return total + number; }, 0); }
  return {
    first,
    second,
    name,
    age,
    with50,
    age22,
    withEmail,
    combined,
    sums: [sum(1, 2), sum(1, 2, 3, 4)],
    answer: 'Spread expands values. Rest puts values into an array.'
  };
}
