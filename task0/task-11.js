export function task11(){
  let user1 = { name:'Anna', address:{city:'Almaty'} };
  let user2 = { name:'John' };
  let city1 = user1.address?.city ?? 'City not specified';
  let city2 = user2.address?.city ?? 'City not specified';
  return {
    city1,
    city2,
    or: [0 || 'text', '' || 'text', false || 'text', null || 'text', undefined || 'text'],
    nullish: [0 ?? 'text', '' ?? 'text', false ?? 'text', null ?? 'text', undefined ?? 'text'],
    answer: '|| changes all falsy values. ?? changes only null and undefined.'
  };
}
