import React, { useState, useEffect } from "react";
import Todo from "./components/Todo.js";
import TodoForm from "./components/TodoForm.js";

function App() {

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, [])

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(item => item.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  }

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem("todos",
      JSON.stringify([updatedTodo, ...filteredTodos]));
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    if (todoText === "") {
      alert("Todo text can't be empty!")
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    }
    if (isEdit === true) {
      console.log(willUpdateTodo, "we will update the todo");
      const searchedTodo = todos.find(item => item.id === willUpdateTodo)
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem(
        "todos",
        JSON.stringify([...filteredTodos, updatedTodo])
      );
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
      setTodos([newTodo, ...todos]);
      localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
      setTodoText("");
    }
  }



  return (
    <div className="Container">
      <h1 className="text-center my-5">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />
      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have any todos yet</p>
      ) : (
        <>
          {todos.map(item => (
            <Todo
              item={item}
              deleteTodo={deleteTodo}
              setIsEdit={setIsEdit}
              setWillUpdateTodo={setWillUpdateTodo}
              setTodoText={setTodoText}
              changeIsDone={changeIsDone}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
