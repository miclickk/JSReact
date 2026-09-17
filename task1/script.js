
function createTask(name) {
  let count = 0;

  return {
    run: function () {
      count = count + 1;
      
      return new Promise(function (resolve, reject) {
        let time = Math.floor(Math.random() * 1500) + 500;

        setTimeout(function () {
          if (Math.random() > 0.3) {
            resolve(name + " Completed (" + time + "ms)");
          } else {
            reject(name + " Failed (" + time + "ms)");
          }
        }, time);
      });
    },
    getCount: function () {
      return count;
    },
    reset: function () {
      count = 0;
    }
  };
}
let task1 = createTask("Load Users");
let task2 = createTask("Load Posts");
let task3 = createTask("Load Comments");
function printLog(text) {
  let logs = document.getElementById("logs");
  logs.textContent = logs.textContent + text + "\n";
}
async function runTask(taskNumber) {
  let currentTask;
  let statusSpan;
  let countSpan;

  if (taskNumber === 1) {
    currentTask = task1;
    statusSpan = document.getElementById("status-1");
    countSpan = document.getElementById("count-1");
  } else if (taskNumber === 2) {
    currentTask = task2;
    statusSpan = document.getElementById("status-2");
    countSpan = document.getElementById("count-2");
  } else {
    currentTask = task3;
    statusSpan = document.getElementById("status-3");
    countSpan = document.getElementById("count-3");
  }
  statusSpan.textContent = "Loading...";
  try {
    let result = await currentTask.run();
    statusSpan.textContent = result1;
    printLog(result);
  } catch (error) {
    statusSpan.textContent = error;
    printLog(error);
  }
  countSpan.textContent = currentTask.getCount();
}
function resetTask(taskNumber) {
  if (taskNumber === 1) {
    task1.reset();
    document.getElementById("count-1").textContent = "0";
    document.getElementById("status-1").textContent = "Reset";
  } else if (taskNumber === 2) {
    task2.reset();
    document.getElementById("count-2").textContent = "0";
    document.getElementById("status-2").textContent = "Reset";
  } else {
    task3.reset();
    document.getElementById("count-3").textContent = "0";
    document.getElementById("status-3").textContent = "Reset";
  }
}
async function runAllTasks() {
  let statusAll = document.getElementById("status-message");
  statusAll.textContent = "Выполняются все задачи...";
  let p1 = task1.run();
  let p2 = task2.run();
  let p3 = task3.run();
  let results = await Promise.allSettled([p1, p2, p3]);
  for (let i = 0; i < results.length; i++) {
    let res = results[i];
    if (res.status === "fulfilled") {
      printLog(res.value);
    } else {
      printLog(res.reason);
    }
  }
  document.getElementById("count-1").textContent = task1.getCount();
  document.getElementById("count-2").textContent = task2.getCount();
  document.getElementById("count-3").textContent = task3.getCount();
  statusAll.textContent = "All tasks finished";
}

async function compareTasks() {
  printLog("Compare Tasks:");
  let start1 = Date.now();
  await task1.run().catch(function(e) { return e; });
  await task2.run().catch(function(e) { return e; });
  await task3.run().catch(function(e) { return e; });
  let timeSequential = Date.now() - start1;
  printLog("Sequential: " + timeSequential + " ms");
  let start2 = Date.now();
  await Promise.allSettled([task1.run(), task2.run(), task3.run()]);
  let timeConcurrent = Date.now() - start2;
  printLog("Parallel: " + timeConcurrent + " ms");
}
function runEventLoopDemo() {
  printLog("Event loop demo");
  printLog("1: sync start");
  setTimeout(function () {printLog("6: setTimeout 0ms");}, 0);
  setTimeout(function () {printLog("7: setTimeout 20ms");}, 20);
  Promise.resolve().then(function () {
    printLog("4: Promise 1");
  });
  Promise.resolve().then(function () {
    printLog("5: Promise 2");
  });
  async function myAsyncFunc() {
    printLog("2: async");
    await Promise.resolve();
    printLog("3: await");
  }
  myAsyncFunc();
}