export function task01(){
  let name = 'Anna';
  let age = 21;
  let active = true;
  let courses = ['JS', 'React'];
  let address = { city: 'Almaty' };
  let empty = null;
  let missing;
  let types = [
    typeof name,
    typeof age,
    typeof active,
    typeof courses,
    typeof address,
    typeof empty,
    typeof missing
  ];
  return { name, age, active, courses, address, empty, missing, types,
    sentence: `${name} is ${age}`,
    answers: ['let can change, const cannot', 'typeof null is object',
      'string, number, boolean, undefined, null, symbol, bigint'] };
}
