const form = document.querySelector("#to-do-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#to-do-list");

let tasks = [];

function renderTasksOnHTML(taskTitle, done = false) {
  // Adicionando a anova tarefa no HTML
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;
    const spanToToggle = liToToggle.querySelector("span");
    const done = event.target.checked;

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (event) => {
    // Captura o elemento pai event.parentElemen
    const liToRemove = event.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent; // Captura o titulo da tarefa para remover

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);

  taskTitleInput.value = "";
}

window.onload = () => {
  const taskOnLocalStorage = localStorage.getItem("tasks");

  if (!taskOnLocalStorage) return;

  tasks = JSON.parse(taskOnLocalStorage);

  tasks.forEach((t) => {
    renderTasksOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    return;
  }
  // Adicionando a nova tarefa no array de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasksOnHTML(taskTitle);
});
