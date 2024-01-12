const button = document.getElementById("notificationBtn");
const showNotificationContainer = document.querySelector(
  ".show-notification-container"
);

function randomColor() {
  return ["denger", "info", "blue", "purple", "success", "sky"][
    Math.floor(Math.random() * 6)
  ];
}

function randomNotificationNumber() {
  return Math.floor(Math.random() * 9 + 1);
}
function showNotification() {
  const notificationDiv = document.createElement("div");
  notificationDiv.className = `notification ${randomColor()}`;
  notificationDiv.dataset.notifications = randomNotificationNumber();
  notificationDiv.innerText = `New Notification`;
  setTimeout(() => {
    notificationDiv.classList.add("show");
  }, 0);
  showNotificationContainer.append(notificationDiv);
  removeNotification(notificationDiv);
}

function removeNotification(notificationDiv) {
  let newNotifications = showNotificationContainer.children.length;
  if (newNotifications > 6) {
    notificationDiv.classList.remove("show");
    showNotificationContainer.children[newNotifications - 1].remove();
  }

  setTimeout(() => {
    notificationDiv.classList.remove("show");
    setTimeout(() => {
      notificationDiv.remove();
    }, 1000);
  }, 3000);
}

button.addEventListener("click", showNotification);
