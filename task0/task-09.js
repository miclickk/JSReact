export function task09(){
  function createCounter(){
    let count = 0;
    return function(){
      count = count + 1;
      return count;
    };
  }
  function createAdder(value){ return function(number){ return value + number; }; }
  let counter = createCounter();
  let anotherCounter = createCounter();
  let addFive = createAdder(5);
  return {
    counter: [counter(), counter(), counter()],
    anotherCounter: anotherCounter(),
    addFive: [addFive(10), addFive(20)],
    answer: 'the inner function remembers the outer variable'
  };
}
