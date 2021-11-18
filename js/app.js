let overlayTag = document.getElementsByClassName("overlay")[0];
let textBoxTag = document.getElementsByClassName("text-box")[0];
let addBtn = document.getElementsByClassName("add-btn")[0];
let dayArr = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dateTimeTag = document.getElementsByClassName("date-time")[0];
let daysTag = dateTimeTag.querySelector('.days');
let monthTag = dateTimeTag.querySelector('.month');
showDateTime();

let totalTasksTag = document.getElementsByClassName("total-tasks")[0];
let totalListTag = document.getElementsByClassName("todo-lists")[0];

window.addEventListener('load', showTotalTasks);

let clearAllTag = document.querySelector(".clear-all");

let todoListsContainer = document.getElementsByClassName('todo-lists')[0];

let dataFromLocalJson = localStorage.getItem('todos');
let dataFromLocal = JSON.parse(dataFromLocalJson);


if (dataFromLocal) {
  dataFromLocal.forEach(data=>{
    todoListsContainer.innerHTML += `
    <div class="list-item">
      <label class="check-item ${data.isDone ? "doneTask" : ""}">
        <input type="checkbox" ${data.isDone ? "checked" : ""}>
        <span class='input-text'>${data.text}</span>
        <span class="checkmark"></span>
      </label>
      <div class="list-time">${data.hour} : ${data.minute} ${data.amPm}</div>
    </div>
  `;
    
  

  let inputTags = document.querySelectorAll('input');
    inputTags.forEach(input=>{
      let inputTexts = input.parentNode.querySelector("span");
      if (input.checked) {
        inputTexts.style.textDecoration = "line-through";
      } else {
        inputTexts.style.textDecoration = 'none';
      }
    });
  });
}

let doneTasks = document.querySelectorAll(".doneTask");
if (doneTasks.length >= 2) {
  clearAllTag.style.display = "block";
  clearAllTag.style.opacity = "0";
  
  setTimeout(() => {
    clearAllTag.style.opacity = "1";
  }, 100);
}

function addNewList(newListValue){
  let dateTime = new Date();
  let hours = dateTime.getHours() % 12;
  let minutes = dateTime.getMinutes();
  let hoursText = hours < 10 ? "0" + hours : hours;
  let minutesText = minutes < 10 ? "0" + minutes : minutes;
  let amPm = dateTime.getHours() < 12 ? 'AM' : 'PM';
  todoListsContainer.innerHTML += `
    <div class="list-item">
      <label class="check-item">
        <input type="checkbox">
        <span class='input-text'>${newListValue}</span>
        <span class="checkmark"></span>
      </label>
      <div class="list-time">${hoursText} : ${minutesText} ${amPm}</div>
    </div>
  `;

  let info = {
    text: newListValue,
    hour: hoursText,
    minute: minutesText,
    amPm: amPm,
    isDone: false
  };
  let localList = [];

  if (localStorage.length) {
    let localListJson = localStorage.getItem('todos');
    localList = JSON.parse(localListJson);
    localList[localList.length] = info;
    localStorage.setItem("todos", JSON.stringify(localList));
  } else {
    localList[localList.length] = info;
    localStorage.setItem("todos", JSON.stringify(localList));
  }

  checkList();
  showTotalTasks();
  
}

function checkList(){
  let checkInputs = document.querySelectorAll(".check-item input");
  checkInputs.forEach((checkInput) => {
    let checkText = checkInput.parentNode.querySelector("span");
    checkInput.addEventListener("change", () => {

      let localDatasWithJson = localStorage.getItem('todos');
      let localDatas = JSON.parse(localDatasWithJson);
      
      let filteredText = localDatas.filter(el=>{
        return el.text == checkText.textContent;
      });
      let isOpen = filteredText[0].isDone;
      filteredText[0].isDone = isOpen == false ? true : false;
      let updateIndex = localDatas.findIndex((el) => el == filteredText[0]);
      localDatas[updateIndex] = filteredText[0];


      localStorage.setItem("todos", JSON.stringify(localDatas));

      // checkInput.parentNode.classList.add('doneTask');

      if (checkInput.checked) {
        checkText.style.textDecoration = "line-through";
      } else {
        checkText.style.textDecoration = 'none';
      }

      
      if (checkInput.parentNode.classList.contains("doneTask")) {
        checkInput.parentNode.classList.remove("doneTask");
        completeTaskList();
      } else {
        checkInput.parentNode.classList.add("doneTask");
        completeTaskList();
      }

    });
  });
}
checkList();

function completeTaskList(){
  let compelteTask = document.querySelectorAll(".doneTask");
  if (compelteTask.length >= 2) {
    clearAllTag.style.display = "block";
    clearAllTag.style.opacity = "0";

    setTimeout(() => {
      clearAllTag.style.opacity = "1";
    }, 100);
  } else {
    clearAllTag.style.display = 'none';
  }
}

clearAllTag.addEventListener('click', ()=>{
  todoListsContainer.innerHTML = '';
  clearAllTag.classList.add("animate__fadeOutUp");
  setTimeout(() => {
    clearAllTag.style.display = 'none';
  }, 100);
  showTotalTasks();
});

addBtn.addEventListener('click', ()=>{
    showOverLayTag();
    showTextBox();
    let cancelBtn = document.getElementById("cancel-btn");
    let listTextarea = document.getElementById("list-textarea");
    cancelBtn.addEventListener('click', closeTextBox);
    listTextarea.value = '';
});

let addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", () => {
  let listTextarea = document.getElementById("list-textarea");
  if (!(listTextarea.value.length == 0)) {
    addNewList(listTextarea.value);
    listTextarea.value = "";
    closeTextBox();
  };
  
});


function showOverLayTag(){
    overlayTag.style.display = "block";
    setTimeout(() => {
      overlayTag.style.opacity = "0.9";
    }, 100);
}

function showTextBox(){
    textBoxTag.style.display = "block";
    
}

function closeTextBox(){
    overlayTag.style.opacity = '0.1';
    setTimeout(() => {
      overlayTag.style.display = "none";
    }, 400);

    if (textBoxTag.classList.contains("animate__flipInX")) {
      textBoxTag.classList.add("animate__flipOutX");
    }
    setTimeout(() => {
        textBoxTag.classList.remove("animate__flipOutX");
        textBoxTag.style.display = "none";
    }, 500);
}

function showDateTime(){
    const realTime = ()=>{
        let date = new Date();
        let dayText = dayArr[date.getDay()];
        let monthText = monthArr[date.getMonth()];
        let dateText = date.getDate();
        switch (date.getDate() % 10) {
          case 1:
              dateText = dateText + "st";
            break;
          case 2:
              dateText = dateText + "nd";
            break;
          case 3:
              dateText = dateText + "rd";
            break;
          default:
              dateText = dateText + "th";
            break;
        }
        daysTag.innerHTML = `${dayText}, ${dateText}`;
        monthTag.innerHTML = `${monthText}`;
    };
    realTime();
    setInterval(realTime, 1000);
}

function showTotalTasks(){
    let totalArrayOfListTag = Array.from(totalListTag.childNodes);
    let totalTasksLists = totalArrayOfListTag.filter(
      (el) => el.nodeType == 1
    ).length;

    totalTasksTag.innerHTML = totalTasksLists;
}