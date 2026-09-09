export function task03(){
  let students = [
    {name:'Anna', id:1, grade:85},
    {name:'John', id:2, grade:62},
    {name:'Sara', id:3, grade:91},
    {name:'Mike', id:4, grade:55}
  ];
  let passed = students.filter(function(student){
    return student.grade >= 70;
  });
  let names = students.map(function(student){ return student.name; });
  let id3 = students.find(function(student){ return student.id === 3; });
  let top = students.reduce(function(best, student){
    return best.grade > student.grade ? best : student;
  });
  let total = students.reduce(function(sum, student){
    return sum + student.grade;
  }, 0);
  let withPassed = students.map(function(student){
    return {...student, passed:student.grade >= 70};
  });
  return { passed, names, id3, top, average:total / students.length, withPassed };
}
