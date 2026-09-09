export function finalTask(){
  let students = [
    {id:1, name:'Askar', age:21, grades:[80, 90]},
    {id:2, name:'Zhasmin', age:20, grades:[50, 60]},
    {id:3, name:'Mikhail', age:22, grades:[95, 88]},
    {id:4, name:'Petr', age:19, grades:[70, 75]},
    {id:5, name:'Ilhan', age:23, grades:[65, 72]}
  ];
  function getAverage(grades){
    return grades.reduce(function(sum, grade){
      return sum + grade;
    }, 0) / grades.length;
  }
  function getStudentAverage(student){
    return getAverage(student.grades);
  }
  function getPassedStudents(students){
    return students.filter(function(student){
      return getStudentAverage(student) >= 70;
    });
  }
  function getStudentNames(students){
    return students.map(function(student){ return student.name; });
  }
  function findStudent(students, id){
    return students.find(function(student){ return student.id === id; });
  }
  function getTopStudent(students){
    return students.reduce(function(best, student){
      return getStudentAverage(best) > getStudentAverage(student) ? best : student;
    });
  }
  let summary = students.map(function(student){
    return {
      id: student.id,
      name: student.name,
      average: getStudentAverage(student),
      passed: getStudentAverage(student) >= 70
    };
  });
  return {
    passed: getPassedStudents(students),
    names: getStudentNames(students),
    id3: findStudent(students, 3),
    top: getTopStudent(students),
    summary
  };
}
