import {task01} from './task-01.js';
import {task02} from './task-02.js';
import {task03} from './task-03.js';
import {task04} from './task-04.js';
import {task05} from './task-05.js';
import {task06} from './task-06.js';
import {task07} from './task-07.js';
import {task08} from './task-08.js';
import {task09} from './task-09.js';
import {task10} from './task-10.js';
import {task11} from './task-11.js';
import {finalTask} from './task-final.js';

let results = {
  task01: task01(),
  task02: task02(),
  task03: task03(),
  task04: task04(),
  task05: task05(),
  task06: task06(),
  task07: task07(),
  task08: task08(),
  task09: task09(),
  task10: task10(),
  task11: task11(),
  finalTask: finalTask()
};

console.log(results);

document.getElementById('out').textContent =
  JSON.stringify(results, null, 2);