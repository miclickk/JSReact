export function task07(){
  function add(a, b){ return a + b; }
  function multiply(a, b){ return a * b; }
  function calculate(a, b, operation){ return operation(a, b); }
  return {
    add: calculate(5, 3, add),
    multiply: calculate(5, 3, multiply),
    answers: ['yes', 'yes', 'add is a function, add() calls it']
  };
}
