const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const count = document.getElementById('count');
const copyBtn = document.getElementById('copy-btn');

let todos = [];
let nextId = 1;

function render() {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const span = document.createElement('span');
    span.textContent = todo.text;

    const del = document.createElement('button');
    del.textContent = '삭제';
    del.className = 'delete';
    del.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.done).length;
  count.textContent = `남은 할 일: ${remaining}개`;
}

function addTodo(text) {
  todos.push({ id: nextId++, text, done: false });
  render();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

async function copyTodos() {
  if (todos.length === 0) return;
  const text = todos.map((t) => `[${t.done ? 'x' : ' '}] ${t.text}`).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = '복사됨!';
  } catch {
    copyBtn.textContent = '복사 실패';
  }
  setTimeout(() => {
    copyBtn.textContent = '목록 복사';
  }, 1500);
}

copyBtn.addEventListener('click', copyTodos);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = '';
  input.focus();
});

render();
