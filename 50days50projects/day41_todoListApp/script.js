const toggleMenuBtn = document.getElementById("toggleMenu");
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const addNewTaskBtn = document.getElementById("addTaskBtn");
const taskHeaderImg = document.querySelector(".task-header img");
const taskCategoriFilter = document.getElementById("task-categories-filter");
const taskListContainer = document.querySelector(".task-list-container");
const verifyBox = document.querySelector(".verify-box");
let date = new Date();

// remove loading effect
taskHeaderImg.addEventListener("load", (e) => {
  taskHeaderImg.parentElement.classList.remove("loading");
});

// local storage
const updateStorageData = [];
function updateDataToLocalStorage(taskName, tagName, complete = false) {
  let previousUpdate = false;
  if (updateStorageData.length > 0) {
    updateStorageData.forEach((storedData) => {
      if (storedData.tag === tagName) {
        storedData.name = taskName;
        storedData.tag = tagName;
        storedData.complete = complete;
        previousUpdate = true;
      }
    });
  }
  if (!previousUpdate) {
    updateStorageData.push({
      name: taskName,
      tag: tagName,
      complete: complete,
    });
  }
  localStorage.setItem("task", JSON.stringify(updateStorageData));
}

const getTaskToLocalStorate = JSON.parse(localStorage.getItem("task"));
if (getTaskToLocalStorate != null) {
  getTaskToLocalStorate.forEach((storedData) => {
    storedData.complete == true
      ? creteNewTask(storedData.name, storedData.tag, "completed")
      : creteNewTask(storedData.name, storedData.tag, "");
    updateStorageData.push(storedData);
  });
}

// header date
const taskDate = document.getElementById("date");
taskDate.innerHTML = date.toDateString(date).slice(3);

// toggle
function toggleSideBar(e) {
  const sideBar = e.currentTarget.parentElement;
  toggleMenuBtn.classList.toggle("active");
  sideBar.classList.toggle("active");
  if (sideBar.classList.contains("active")) {
    sideBar.children[3].children[1].focus();
  }
}

function changeTheme(e) {
  const darkThemeColor = {
    "--color": "#fff",
    "--color": "#000",
    "--bg-color": "#e3e3e3",
    "--bg-color": "#0e0b11",
    "--primary": "#1a171d",
    "--secondary": "#f7f7f726",
    "--text-color": "#b8b8b8",
  };
  document.body.classList.toggle("light");
}

// new task
function addNewTasks(e) {
  e.preventDefault();
  const inputTaskDetails = this.parentElement.children[3].children[1];
  const inputTagName = this.parentElement.children[4].children[1];

  if (!inputTaskDetails.value || !inputTagName.value) {
    if (!inputTaskDetails.value && !inputTagName.value) {
      inputTaskDetails.classList.add("not-valid");
      inputTagName.classList.add("not-valid");
    } else if (!inputTaskDetails.value) {
      inputTaskDetails.classList.add("not-valid");
    } else {
      inputTagName.classList.add("not-valid");
    }
    setTimeout(() => {
      inputTagName.classList.remove("not-valid");
      inputTaskDetails.classList.remove("not-valid");
    }, 400);
    return;
  }

  creteNewTask(inputTaskDetails.value, inputTagName.value, false);
  updateDataToLocalStorage(inputTaskDetails.value, inputTagName.value, false);
  inputTaskDetails.value = "";
  inputTagName.value = "";
  if (window.innerWidth > 800) {
    inputTaskDetails.focus();
  } else {
    toggleSideBar(e);
    inputTaskDetails.blur();
  }
}

function creteNewTask(taskDetail, tagName, complete) {
  const NewTaskEl = document.createElement("div");
  NewTaskEl.className = `task center transition ${complete}`;
  NewTaskEl.setAttribute("dragable", true);
  NewTaskEl.innerHTML = `
    <div class="complete-task-icon center transition-fast">
      <i class="fa-solid fa-check"></i>
    </div>
    <p class="task-details transition-fast">${taskDetail}</p>
    <p class="tag-name transition-fast">${tagName}</p>

    <div class="action-icons transition-fast center">
      <i class="fa-solid fa-ellipsis"></i>
    </div>
    <div class="more-icons transition-fast">
      <i class="fa-solid fa-pencil"></i>
      <i class="fa-solid fa-trash-can transition-fast"></i>
    </div>
    `;
  taskListContainer.insertAdjacentElement("afterbegin", NewTaskEl);
  taskAttachEvents();
  // for animation
  setTimeout(() => {
    NewTaskEl.classList.add("added");
  }, 10);
  filterTaskList("all");
}

function taskAttachEvents() {
  const actionBtn = document.querySelector(".action-icons");
  const expandMoreAction = document.querySelector(".more-icons");
  const completeTaskEl = document.querySelector(".complete-task-icon");

  actionBtn.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    if (e.currentTarget.classList.contains("active")) {
      closeActionBtns();
      e.currentTarget.classList.add("active");
      e.currentTarget.nextElementSibling.classList.add("active");
    } else {
      e.currentTarget.nextElementSibling.classList.remove("active");
    }
  });

  expandMoreAction.addEventListener("click", (e) => {
    if (e.currentTarget == e.target) return;
    if (e.target.classList.contains("fa-pencil")) {
      editTask(e);
    } else {
      removeTask(e);
    }
    // to reset class
    expandMoreAction.previousElementSibling.classList.remove("active");
  });

  completeTaskEl.addEventListener("click", (e) => {
    e.currentTarget.parentElement.classList.toggle("completed");
    // update local storage
    if (e.currentTarget.parentElement.classList.contains("completed")) {
      updateDataToLocalStorage(
        e.currentTarget.parentElement.children[1].innerHTML,
        e.currentTarget.parentElement.children[2].innerHTML,
        true
      );
    } else {
      updateDataToLocalStorage(
        e.currentTarget.parentElement.children[1].innerHTML,
        e.currentTarget.parentElement.children[2].innerHTML,
        false
      );
    }
    filterTaskList("completed");
    if (e.currentTarget.parentElement.children[1].nodeName == "TEXTAREA") {
      editingFinish(e.currentTarget.parentElement);
    }
  });
}

function closeActionBtns() {
  const allTask = Array.from(taskListContainer.getElementsByClassName("task"));
  allTask.forEach((task) => {
    task.children[3].classList.remove("active");
    task.children[4].classList.remove("active");
  });
}

// to edit task details
function editTask(e) {
  const currentTask = e.currentTarget.parentElement;

  async function taskEditing(newTextarea) {
    let isCorrectionDone = new Promise((resolve) => {
      newTextarea.addEventListener("blur", (e) => {
        let isDone = correctionDone(newTextarea, e);
        resolve(isDone);
      });
    });
    let isEditCompleted = await isCorrectionDone;

    if (isEditCompleted) {
      editingFinish(currentTask);
    } else {
      taskEditing(newTextarea);
    }
  }
  e.currentTarget.classList.remove("active");

  if (currentTask.classList.contains("completed")) {
    currentTask.classList.remove("completed");
  }

  if (currentTask.children[1].nodeName != "TEXTAREA") {
    const newTextarea = document.createElement("textarea");
    newTextarea.className = "task-details transition";
    newTextarea.name = "input-task-details";
    newTextarea.value = currentTask.children[1].textContent;
    currentTask.replaceChild(newTextarea, currentTask.children[1]);
    currentTask.children[1].focus();

    taskEditing(newTextarea);
  }
}

function correctionDone(textarea) {
  if (textarea.value.trim() === "") return false;
  let updateText = textarea.value.trim();
  // update local storage
  if (textarea.parentElement.classList.contains("completed")) {
    updateDataToLocalStorage(
      updateText,
      textarea.nextElementSibling.innerHTML,
      true
    );
  } else {
    updateDataToLocalStorage(
      textarea.value,
      textarea.nextElementSibling.innerHTML,
      false
    );
  }

  return updateText;
}

function editingFinish(task) {
  const newPara = document.createElement("p");
  newPara.className = "task-details transition";
  newPara.textContent = task.children[1].value;
  task.replaceChild(newPara, task.children[1]);
}

async function removeTask(e) {
  const currentTask = e.currentTarget.parentElement;
  e.currentTarget.classList.remove("active");
  verifyBox.classList.toggle("active");

  let removeCurrnetTask = new Promise((resolve) => {
    verifyBox.addEventListener(
      "click",
      (e) => {
        let shouldRemove = isRemove(e);
        resolve(shouldRemove);
      },
      { once: true }
    );
  });

  let isRemoveValue = await removeCurrnetTask;
  if (isRemoveValue != "true") return;
  currentTask.classList.remove("added");

  // remove from local storage
  updateStorageData.forEach((taskData, idx) => {
    if (
      taskData.name == currentTask.children[1].innerHTML ||
      currentTask.children[1].value
    ) {
      updateStorageData.splice(idx, 1);
    }
  });
  localStorage.setItem("task", JSON.stringify(updateStorageData));

  currentTask.addEventListener("transitionend", (e) => {
    e.currentTarget.remove();
    filterTaskList("all");
  });
}

function isRemove(e) {
  if (e.target.nodeName != "BUTTON") return;
  e.currentTarget.classList.remove("active");
  return e.target.value;
}

function filterTaskList(e) {
  const allTask = Array.from(document.getElementsByClassName("task"));
  const filterValue = typeof e == "string" ? e : e.target.value;
  const selectList = Array.from(taskCategoriFilter.children);

  let completedTask = allTask.filter((task) => {
    return task.classList.contains("completed");
  });

  let pendingTask = allTask.filter((task) => {
    return !task.classList.contains("completed");
  });

  switch (filterValue) {
    case "completed":
      allTask.forEach((task) => (task.style.display = "none"));
      completedTask.forEach((task) => (task.style.display = "flex"));
      break;
    case "pending":
      allTask.forEach((task) => (task.style.display = "none"));
      pendingTask.forEach((task) => (task.style.display = "flex"));
      break;
    default:
      allTask.forEach((task) => (task.style.display = "flex"));
  }

  selectList.forEach((list, idx) => {
    if (idx == 0) {
      list.innerHTML = `${list.value
        .slice(0, 1)
        .toUpperCase()}${list.value.slice(1)} ${allTask.length}`;
    } else if (idx == 1) {
      list.innerHTML = `${list.value
        .slice(0, 1)
        .toUpperCase()}${list.value.slice(1)} ${completedTask.length}`;
    } else if (idx == 2) {
      list.innerHTML = `${list.value
        .slice(0, 1)
        .toUpperCase()}${list.value.slice(1)} ${pendingTask.length}`;
    }
    list.value == filterValue ? (list.selected = true) : null;
  });
}

toggleMenuBtn.addEventListener("click", toggleSideBar);
toggleThemeBtn.addEventListener("click", changeTheme);
addNewTaskBtn.addEventListener("click", addNewTasks);
taskCategoriFilter.addEventListener("change", filterTaskList);
