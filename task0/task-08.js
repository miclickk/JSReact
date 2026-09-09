export function task08(){
  let message = 'global';
  function showMessages(){
    let message = 'function';
    if(true){
      let message = 'block';
      var fromBlock = 'var';
      return { block:message, varOutsideBlock:fromBlock };
    }
    return message;
  }
  return { global:message, functionAndBlock:showMessages(), answers:['global: everywhere', 'function: inside function', 'block: inside {}', 'var is function scope, let and const are block scope'] };
}
