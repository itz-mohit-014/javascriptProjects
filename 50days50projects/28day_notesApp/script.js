const addNotesBtn = document.getElementById("addNote");
const noteSection = document.querySelector(".notes-section");
const localStorageData = [];

//  need work on store data at browser localstorge.
const fetchLocallyStoredData = localStorage.getItem("notes");
console.log(fetchLocallyStoredData);
function updateDataToLocalStorage(e) {
  const elName = e.target.dataset.value;
  const text = e.target.value;
  const existingEntryIndex = localStorageData.findIndex((entry) =>
    entry.hasOwnProperty(elName)
  );

  if (existingEntryIndex !== -1) {
    localStorageData[existingEntryIndex][elName] = text;
  } else {
    localStorageData.push({ [elName]: text });
  }

  localStorage.setItem("notes", JSON.stringify(localStorageData));
}

function inputNoteEvent() {
  const noteBody = Array.from(document.getElementsByClassName("notes-body"));
  noteBody[0].addEventListener("input", updateDataToLocalStorage);
  // const allTextarea = document.querySelectorAll("textarea");
  // allTextarea.forEach((textarea) => {
  //   textarea.addEventListener("input", updateDataToLocalStorage);
  // });
}

function notePerformAction(e) {
  const note = e.target.closest("div.notes");
  const titleEl = note.children[1].children[0];
  const detailsEl = note.children[1].children[1];
  const actionEl = e.target.classList;

  function saveNote() {
    if (titleEl.nodeName == "TEXTAREA") {
      const heading = document.createElement("h2");
      heading.textContent = titleEl.value;
      titleEl.replaceWith(heading);

      const details = document.createElement("p");
      details.textContent = detailsEl.value;
      detailsEl.replaceWith(details);
    }
  }

  function editNoteContent(e) {
    if (titleEl.nodeName == "H2") {
      const textareaHeading = document.createElement("textarea");
      textareaHeading.placeholder = "Title";
      textareaHeading.value = titleEl.textContent;
      titleEl.replaceWith(textareaHeading);

      const textareaDetails = document.createElement("textarea");
      textareaDetails.placeholder = "Enter details here..";
      textareaDetails.value = detailsEl.textContent;
      detailsEl.replaceWith(textareaDetails);
      textareaDetails.focus();
    }
  }

  function deleteNote(e) {
    note.classList.remove("show");
    note.addEventListener("transitionend", () => {
      note.remove();
    });
  }

  if (actionEl.contains("save-note")) {
    saveNote();
  } else if (actionEl.contains("edit-note")) {
    editNoteContent();
  } else if (actionEl.contains("remove-note")) {
    deleteNote();
  }
}

function attachEventsOnNote() {
  const allNotesHeader = Array.from(
    document.getElementsByClassName("notes-header")
  );
  allNotesHeader.forEach((noteHeader) => {
    noteHeader.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) return;

      const optionIconClass = e.target.classList;
      if (optionIconClass.contains("fa-solid")) {
        notePerformAction(e);
      }
    });
  });
}

function addNewNote() {
  const note = document.createElement("div");
  note.className = "notes transition show center";
  note.classList.add("show");
  note.innerHTML = `
        <header class="notes-header center">
          <i class="fa-solid fa-floppy-disk save-note"></i>
          <div class="right">
            <i class="fa-solid fa-pen-to-square edit-note transition"></i>
            <i class="fa-solid fa-trash-can remove-note transition"></i>
          </div>
        </header>
        <div class="notes-body center">
          <textarea
            name="Notes-text-title"
            id="title"
            placeholder="Title"
            id="title"
            data-value = 'heading'
          ></textarea>
          <textarea
            name="Notes-text-desc"
            id="description"
            placeholder="Enter details here.."
            data-value = 'heading'
          ></textarea>
        </div>      
    `;
  noteSection.append(note);
  attachEventsOnNote();
  inputNoteEvent();
}

addNotesBtn.addEventListener("click", addNewNote);
