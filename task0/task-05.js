export function task05(){
  let original = { name:'Alice', score:10 };
  let copy = original;
  copy.score = 20;
  let newCopy = {...original};
  newCopy.score = 30;
  let user = { name:'Alice', address:{city:'Almaty'} };
  let wrongCopy = {...user};
  wrongCopy.address.city = 'Astana';
  let rightCopy = {...user, address:{...user.address}};
  rightCopy.address.city = 'Shymkent';
  return { original, copy, newCopy, user, wrongCopy, rightCopy };
}
