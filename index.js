const newBtn = document.querySelector('.new-btn');
const taskContainer = document.querySelector('.task-container');
const content = document.querySelector('.content');
const addForm = document.querySelector('.add-item');
const taskForm = document.querySelector('.task-form');
const noteForm = document.querySelector('.note-form');
const projectForm = document.querySelector('.project-form');
const taskSelect = document.querySelector('.task-select');
const noteSelect = document.querySelector('.note-select');
const projectSelect = document.querySelector('.project-select');
const menuItems = document.querySelectorAll('.menu-item');
const submitBtn = document.querySelector('.submit-btn');
const taskTitle = document.querySelector('.task-title-input');
const taskDate = document.querySelector('.due-date-input');
const taskPriority = document.querySelector('.task-priority-input');
const taskProject = document.querySelector('.task-project-input');
const menuList = document.querySelector('.menu-list');
const projectName = document.querySelector('.project-name-input');
const notesMenu = document.querySelector('.notes-menu');
const notesContainer = document.querySelector('.notes-container');
const noteTitle = document.querySelector('.note-title-input');
const noteDetails = document.querySelector('.note-details-input');

const tasks = [
  {
    title: 'Go to the gym',
    date: '2023-03-22',
    project: 'exercise',
    priority: 'high',
  },
  {
    title: 'call Mum',
    date: '2023-03-22',
    project: 'family',
    priority: 'medium',
  },
  {
    title: "Annie's birthday",
    date: '2023-03-22',
    project: 'friends',
    priority: 'high',
  },
  {
    title: 'Complete Insurance paperwork',
    date: '2023-03-22',
    project: 'work',
    priority: 'low',
  },
  {
    title: 'Hang picture',
    date: '2023-03-22',
    project: 'home',
    priority: 'medium',
  },
];

const notes = [
  {
    title: 'need bread',
    details: 'Need to get bread before Tuesday',
  },
];

class Task {
  constructor(title, date, priority, project) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.project = project;
  }
}

class Note {
  constructor(title, details) {
    this.title = title;
    this.details = details;
  }
}

// Form Logic
// Change Type
taskSelect.addEventListener('click', () => {
  taskForm.classList.remove('hidden');
  noteForm.classList.add('hidden');
  projectForm.classList.add('hidden');
  taskSelect.classList.add('active');
  noteSelect.classList.remove('active');
  projectSelect.classList.remove('active');
});

projectSelect.addEventListener('click', () => {
  projectForm.classList.remove('hidden');
  taskForm.classList.add('hidden');
  noteForm.classList.add('hidden');
  projectSelect.classList.add('active');
  noteSelect.classList.remove('active');
  taskSelect.classList.remove('active');
});

noteSelect.addEventListener('click', () => {
  noteForm.classList.remove('hidden');
  taskForm.classList.add('hidden');
  projectForm.classList.add('hidden');
  noteSelect.classList.add('active');
  taskSelect.classList.remove('active');
  projectSelect.classList.remove('active');
});

function renderTask(title, date, priority) {
  const task = document.createElement('div');
  const splitDate = date.split('-');
  const displayDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0].slice(
    -2
  )}`;
  task.classList.add('task');
  task.classList.add(`${priority}`);
  task.innerHTML = ` 
  <div class="task-left">
    <input type="checkbox" class="checkbox" />
    <span class="task-name"
    >${title}</span
  >
  </div>
  <div class="task-right">
    <span class="task-date">${displayDate}</span>
    <span class="task-edit"><img src="pencil.svg" alt="edit-icon"></span>
    <span class="task-delete"><img src="delete.svg" alt="edit-icon" class="delete-btn"></span>
  </div>`;

  taskContainer.appendChild(task);
}

function renderNote(title, details) {
  const note = document.createElement('div');
  note.classList.add('notes-item');
  note.innerHTML = `<span class="note-title">${title}</span>
  <img src="delete.svg" alt="edit-icon" class="note-delete-btn">
  <span class="note-details">${details}</span>`;

  notesContainer.appendChild(note);
}

function renderTaskArr(arr) {
  arr.forEach((item) => {
    renderTask(item.title, item.date, item.priority);
  });
}

function renderNotesArr(arr) {
  arr.forEach((item) => {
    renderNote(item.title, item.details);
  });
}

function addProject(title) {
  const newProjectMenu = document.createElement('li');
  const newProjectOption = document.createElement('option');

  newProjectMenu.classList.add('menu-item');
  newProjectMenu.dataset.project = `${title.toLowerCase()}`;
  newProjectMenu.textContent = `${title}`;
  newProjectOption.value = `${title.toLowerCase()}`;
  newProjectOption.textContent = `${title}`;

  // menuList.appendChild(newProjectMenu);
  notesMenu.before(newProjectMenu);
  taskProject.appendChild(newProjectOption);

  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      menuItems.forEach((item) => item.classList.remove('active'));
      e.target.classList.add('active');

      const project = item.dataset.project;

      if (project === 'all') {
        taskContainer.innerHTML = '';
        renderTaskArr(tasks);
      } else {
        const newTaskArr = tasks.filter((item) => {
          return item.project === project;
        });
        taskContainer.innerHTML = '';
        renderTaskArr(newTaskArr);
      }
    });
  });
}

submitBtn.addEventListener('click', () => {
  if (taskSelect.classList.contains('active')) {
    let newTask = new Task(
      taskTitle.value,
      taskDate.value,
      taskPriority.value,
      taskProject.value
    );

    tasks.push(newTask);
    renderTask(taskTitle.value, taskDate.value, taskPriority.value);
    hideModal();
  }

  if (projectSelect.classList.contains('active')) {
    addProject(projectName.value);
    hideModal();
  }

  if (noteSelect.classList.contains('active')) {
    let newNote = new Note(noteTitle.value, noteDetails.value);

    notes.push(newNote);
    console.log(notes);
    renderNote(noteTitle.value, noteDetails.value);
    hideModal();
  }
});

// Modal Logic
function showModal() {
  content.classList.add('is-blurred');
  addForm.classList.remove('hidden');
  taskTitle.value = '';
  taskDate.value = '';
  taskProject.value = '';
  taskPriority.value = 'High';
}

function hideModal() {
  content.classList.remove('is-blurred');
  addForm.classList.add('hidden');
}

newBtn.addEventListener('click', showModal);

content.addEventListener('click', (e) => {
  if (
    !addForm.classList.contains('hidden') &&
    !e.target.classList.contains('new-btn')
  )
    hideModal();
});

// Menu Logic
menuItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    menuItems.forEach((item) => item.classList.remove('active'));
    e.target.classList.add('active');

    const project = item.dataset.project;

    if (project === 'all') {
      taskContainer.innerHTML = '';
      renderTaskArr(tasks);
      notesContainer.classList.add('hidden');
      taskContainer.classList.remove('hidden');
    } else if (project === 'notes') {
      notesContainer.classList.remove('hidden');
      taskContainer.classList.add('hidden');
    } else {
      const newTaskArr = tasks.filter((item) => {
        return item.project === project;
      });
      taskContainer.innerHTML = '';
      renderTaskArr(newTaskArr);
      notesContainer.classList.add('hidden');
      taskContainer.classList.remove('hidden');
    }
  });
});

// Task Logic
window.addEventListener('click', (e) => {
  const task = e.target.closest('.task');

  // Toggle Done state
  if (e.target.classList.contains('checkbox')) {
    if (!task.classList.contains('done')) {
      task.classList.add('done');
    } else {
      task.classList.remove('done');
    }
  }

  // Delete Task
  if (e.target.classList.contains('delete-btn')) {
    task.remove();
  }

  // Delete Note
  if (e.target.classList.contains('note-delete-btn')) {
    const note = e.target.closest('.notes-item');
    note.remove();
  }
});

renderTaskArr(tasks);
renderNotesArr(notes);
console.log(tasks);
