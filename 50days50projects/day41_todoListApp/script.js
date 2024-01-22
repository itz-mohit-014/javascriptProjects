const toggleMenuBtn = document.getElementById("toggleMenu");
const addNewTaskBtn = document.getElementById("addTaskBtn");
const taskListContainer = document.querySelector(".task-list-container");
const verifyBox = document.querySelector(".verify-box");
const taskHeaderImg = document.querySelector(".task-header img");
const taskCategoriFilter = document.getElementById("task-categories-filter");
// remove loading effect
taskHeaderImg.addEventListener("load", (e) => {
  taskHeaderImg.parentElement.classList.remove("loading");
});

// local storage
const getTaskToLocalStorate = JSON.parse(localStorage.getItem("task"));
if (getTaskToLocalStorate != null) {
  getTaskToLocalStorate.forEach((storedData) => {
    storedData.complete == true
      ? creteNewTask(task.name, task.tag, true)
      : creteNewTask(task.name, task.tag, false);
  });
}

const updateStorageData = [];

function updateDataToLocalStorage(taskName, tagName, complete = false) {
  if (updateStorageData.length > 0) {
    updateStorageData.forEach((taskData) => {
      if (taskData.name == taskName) return;
    });
  }

  updateStorageData.push({ name: taskName, tag: tagName, complete: complete });
  console.log(updateStorageData);
  localStorage.setItem("task", JSON.stringify(updateStorageData));
}

// header date
let date = new Date();
const taskDate = document.getElementById("date");
taskDate.innerHTML = date.toDateString(date).slice(3);

// toggle
function toggleSideBar(e) {
  const toggleBtn =
    this.nodeName == "button"
      ? this
      : e.currentTarget.parentElement.children[0];
  const sideBar = this.parentElement1 || e.currentTarget.parentElement;
  toggleBtn.classList.toggle("active");
  sideBar.classList.toggle("active");
  if (sideBar.classList.contains("active")) {
    sideBar.children[2].children[1].focus();
  }
}
// new task
function addNewTasks(e) {
  const inputTaskDetails = this.parentElement.children[2].children[1];
  const inputTagName = this.parentElement.children[3].children[1];

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

  creteNewTask(inputTaskDetails.value, inputTagName.value);
  updateDataToLocalStorage(inputTaskDetails.value, inputTagName.value);

  taskAttachEvents();
  inputTaskDetails.value = "";
  inputTagName.value = "";
  inputTaskDetails.focus();
  if (window.innerWidth > 800) return;
  toggleSideBar(e);
  inputTaskDetails.blur();
}

function creteNewTask(taskName, tagName, complete = false) {
  const NewTaskEl = document.createElement("div");
  NewTaskEl.className = "task center transition";
  if (complete == true) {
    NewTaskEl.classList.add("completed");
  }
  NewTaskEl.setAttribute("dragable", true);
  NewTaskEl.innerHTML = `
  <div class="complete-task-icon center transition-fast">
  <i class="fa-solid fa-check"></i>
</div>
         <p class="task-details transition-fast">${taskName}</p>
        <p class="tag-name transition-fast">${tagName}</p>

        <div class="action-icons transition-fast center">
          <i class="fa-solid fa-ellipsis"></i>
        </div>

        <div class="more-icons transition-fast">
          <i class="fa-solid fa-pencil">
          </i>
  
          <i class="fa-solid fa-trash-can transition-fast">
          </i>
        </div>
    `;
  taskListContainer.insertAdjacentElement("afterbegin", NewTaskEl);
  taskAttachEvents();

  setTimeout(() => {
    NewTaskEl.classList.add("added");
  }, 10);
  filterTaskList("all");
  return NewTaskEl;
}

function taskAttachEvents() {
  const actionBtns = Array.from(
    document.getElementsByClassName("action-icons")
  );
  const expandMoreActions = Array.from(
    document.getElementsByClassName("more-icons")
  );
  const completeTaskEls = Array.from(
    document.getElementsByClassName("complete-task-icon")
  );

  actionBtns.forEach((actionBtn) => {
    actionBtn.addEventListener("click", (e) => {
      expandMoreActions.forEach((moreActionBtn) => {
        moreActionBtn.classList.remove("active");
      });
      e.currentTarget.classList.toggle("active");
      if (e.currentTarget.classList.contains("active")) {
        e.currentTarget.nextElementSibling.classList.add("active");
      } else {
        e.currentTarget.nextElementSibling.classList.remove("active");
      }
    });
  });

  expandMoreActions.forEach((moreActionBtn) => {
    moreActionBtn.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) return;
      if (e.target.classList.contains("fa-pencil")) {
        editTask(e);
      } else {
        removeTask(e);
      }
      moreActionBtn.previousElementSibling.classList.remove("active");
    });
  });

  completeTaskEls.forEach((completeTask) => {
    completeTask.addEventListener("click", (e) => {
      e.currentTarget.parentElement.classList.toggle("completed");
      filterTaskList("completed");

      if (e.currentTarget.parentElement.children[1].nodeName == "TEXTAREA") {
        editingFinish(e.currentTarget.parentElement);
      }
    });
  });
}

function editTask(e) {
  // const currentTask = e.currentTarget.parentElement || e;
  const currentTask = e.currentTarget.parentElement || e;
  e.currentTarget.classList.remove("active");

  let isCorrectionDone = false;
  if (currentTask.classList.contains("completed")) {
    currentTask.classList.remove("completed");
  }

  if (currentTask.children[1].nodeName != "P") {
    const newPara = document.createElement("p");
    newPara.className = "task-details transition";
    newPara.textContent = currentTask.children[1].value;
    currentTask.replaceChild(newPara, currentTask.children[1]);
  } else {
    const newTextarea = document.createElement("textarea");
    newTextarea.className = "task-details transition";
    newTextarea.value = currentTask.children[1].textContent;
    currentTask.replaceChild(newTextarea, currentTask.children[1]);
    currentTask.children[1].focus();

    currentTask.addEventListener("click", (e) => {
      setTimeout(() => {
        if (e.target == e.currentTarget.children[1]) return false;
        e.currentTarget.children[1].blur();
        editingFinish(currentTask);
      }, 1000);
    });
  }
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

  isRemoveValue = await removeCurrnetTask;
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
  });
}

toggleMenuBtn.addEventListener("click", toggleSideBar);
addNewTaskBtn.addEventListener("click", addNewTasks);
taskCategoriFilter.addEventListener("change", filterTaskList);
