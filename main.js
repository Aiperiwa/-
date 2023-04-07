const apiName = 'https://jsonplaceholder.typicode.com/users'
const apiTodos = 'https://jsonplaceholder.typicode.com/todos'

const loader = document.createElement('div')
loader.classList = 'loader'
loader.textContent = 'Загрузка приложения...'
document.body.append(loader)


const error = document.createElement('div')
error.classList = 'error'
error.textContent = 'Произошла ошибка при попытке загрузить пользователей'



fetch(apiName)
  .then(response => response.json())
  .then(userData => {
    const box = document.createElement('div')
    box.classList = 'box'
    const users = document.createElement('div')
    users.classList = 'users'
    box.appendChild(users)
    document.body.prepend(box)



    const todosBox = document.createElement('div')
    todosBox.classList = 'todos-box'
    const header = document.createElement('div')
    header.classList.add('todo-title')
    header.textContent = 'Список дел для'
    todosBox.appendChild(header)
    const todoDiv = document.createElement('ul')
    todoDiv.classList = 'todos'
    todosBox.appendChild(todoDiv)
    document.body.append(todosBox)

    const errorTd = document.createElement('div')
    errorTd.classList = 'errorTd'
    errorTd.textContent = 'Произошла ошибка'
  
    userData.forEach((user) => {
      const userBtn = document.createElement('button')
      userBtn.classList.add("userBtn")
      userBtn.textContent = user.name
      loader.remove()
      users.appendChild(userBtn)
      userBtn.addEventListener("click", () => {
        const ladingTd = document.createElement('div')
        ladingTd.textContent = 'Загрузка...'
        todoDiv.appendChild(ladingTd)
        ladingTd.style.fontSize = '20px'

        header.textContent = `Список дел для ${user.name}`

        getData(user.id)
      })
    })
  })
  .catch(() => {
    document.body.prepend(error)
    loader.remove()
  })





async function getData(userId) {
  try {
    const response = await fetch(`${apiTodos}?userId=${userId}`)
    const data = await response.json()
    const todoDiv = document.querySelector('.todos')
    todoDiv.textContent = ''
    data.forEach((v) => {
      const todoItem = document.createElement('li')
      todoItem.textContent = ` ${v.title}`
      todoDiv.appendChild(todoItem)
      if (!v.completed) {
        todoItem.classList.add('completed')
      }
    })
  } catch  {
  }
}