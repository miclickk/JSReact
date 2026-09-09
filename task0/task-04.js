export function task04(){
  let user = {
    id: 1,
    name: 'Askar',
    age: 21,
    address: {city:'Almaty', street:'Serkebayev'}
  };
  let name = user.name;
  let city = user.address.city;
  user.age = 19;
  user.email = 'askar@mail.ru';
  delete user.address.street;
  let {age} = user;
  let {city: userCity} = user.address;
  let {name: userName} = user;
  return { name, city, user, age, userCity, userName };
}
