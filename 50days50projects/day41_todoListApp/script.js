const toggleMenuBtn = document.getElementById("toggleMenu");
const addNewTaskBtn = document.getElementById("addTaskBtn");
const taskListContainer = document.querySelector(".task-list-container");
const verifyBox = document.querySelector(".verify-box");

let date = new Date();
const taskDate = document.getElementById("date");
taskDate.innerHTML = date.toDateString(date).slice(3);

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

function addNewTasks(e) {
  const inputTaskDetails = this.parentElement.children[2].children[1];
  const inputTagName = this.parentElement.children[3].children[1];

  if (!inputTaskDetails.value || !inputTagName.value) {
    alert("Please fill all feild"); // need add an custom popup or msg required indicator.
    return;
  }
  const newTask = creteNewTask(inputTaskDetails, inputTagName);
  taskListContainer.appendChild(newTask);
  setTimeout(() => {
    newTask.classList.add("added");
  }, 10);
  taskAttachEvents();
  inputTaskDetails.value = "";
  inputTagName.value = "";
  ;
  if (window.innerWidth > 800) return;
  inputTaskDetails.focus()
  toggleSideBar(e);
}

function creteNewTask(task, tag) {
  const NewTaskEl = document.createElement("div");
  NewTaskEl.className = "task center transition";
  NewTaskEl.innerHTML = `
  <div class="complete-task-icon center transition">
  <i class="fa-solid fa-check"></i>
</div>
         <p class="task-details transition">${task.value}</p>
        <p class="tag-name transition">${tag.value}</p>

        <div class="action-icons transition center">
          <i class="fa-solid fa-ellipsis"></i>
        </div>

        <div class="more-icons transition">
          <i class="fa-solid fa-pencil">
          </i>
  
          <i class="fa-solid fa-trash-can transition">
          </i>
        </div>
    `;
  taskAttachEvents();
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
    });
  });

  completeTaskEls.forEach((completeTask) => {
    completeTask.addEventListener("click", (e) => {
      e.currentTarget.parentElement.classList.toggle("completed");
    });
  });
}

function editTask(e) {
  const currentTask = e.currentTarget.parentElement;
  e.currentTarget.classList.remove("active");

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
  }
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
  currentTask.addEventListener("transitionend", (e) => {
    e.currentTarget.remove();
  });
}

function isRemove(e) {
  if (e.target.nodeName != "BUTTON") return;
  e.currentTarget.classList.remove("active");
  return e.target.value;
}

toggleMenuBtn.addEventListener("click", toggleSideBar);
addNewTaskBtn.addEventListener("click", addNewTasks);
