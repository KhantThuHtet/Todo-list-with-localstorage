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
showTotalTasks();
let clearAllTag = document.querySelector(".clear-all");

let todoListsContainer = document.getElementsByClassName('todo-lists')[0];

let dataFromLocalJson = localStorage.getItem('todos');
let dataFromLocal = JSON.parse(dataFromLocalJson);
console.log(dataFromLocal);
if (dataFromLocal) {
  dataFromLocal.forEach(data=>{
    todoListsContainer.innerHTML += `
    <div class="list-item">
      <label class="check-item">
        <input type="checkbox">
        <span class='input-text'>${data.text}</span>
        <span class="checkmark"></span>
      </label>
      <div class="list-time">${data.hour} : ${data.minute} ${data.amPm}</div>
    </div>
  `;
  });
}



function addNewList(newListValue){
  let i = 1;
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

  let checkInputs = document.querySelectorAll('.check-item input');
  

  
  checkInputs.forEach(checkInput =>{
    checkInput.addEventListener("change", () => {
      let checkText = checkInput.parentNode.querySelector('span');
      checkText.classList.toggle("delete-text");

      if (checkText.classList.contains('delete-text')) {
        checkInput.setAttribute('checked', 'true');
      }

      let delTags = document.querySelectorAll(".delete-text");
      console.log(delTags.length);
      if (delTags.length >= 2) {
        clearAllTag.style.display = "block";
        setTimeout(() => {
          clearAllTag.style.opacity = '1';
        }, 100);
      } else {
        console.log('ab');
        clearAllTag.style.display = 'none';
      }

    });
  })

  
  
}

clearAllTag.addEventListener('click', ()=>{
  todoListsContainer.innerHTML = '';
  clearAllTag.classList.add("animate__fadeOutUp");
  setTimeout(() => {
    clearAllTag.style.display = 'none';
  }, 100);
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