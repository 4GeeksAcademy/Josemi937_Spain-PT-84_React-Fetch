import React, { useState, useEffect } from "react";

// create your first component

const Home = () => {
  const [newEntry, setNewEntry] = useState('');
  const [todoList, setToDoList] = useState([]);
  const [estate, setEstado] = useState(false);
  const ammountDutties = todoList.length;

  

  function getTodos() {
    fetch("https://playground.4geeks.com/todo/users/Josemi937")
      .then((response) => response.json())
      .then((data) => {
        setToDoList(data.todos); 
        console.log("Todos fetched:", data); 
      })
      .catch((err) => console.error('Error fetching todos:', err));
  }

  
  function deleteElement(todoId) {
    fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log("Todo deleted successfully");
          const updatedList = todoList.filter((todo) => todo.id !== todoId);
          setToDoList(updatedList); 
        } else {
          console.error("Failed to delete todo");
        }
      })
      .catch((err) => console.error('Error deleting todo:', err));
  }

  
  function createTodo() {
    if (!newEntry.trim()) {
      console.error('Todo content cannot be empty!');
      return;
    }

    const newTodo = {
      label: newEntry, 
      is_done: false 
    };

    
    fetch('https://playground.4geeks.com/todo/todos/Josemi937', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo), 
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Error: Failed to create todo', response);
          return;
        }
        return response.json(); 
      })
      .then((data) => {
        console.log("Todo created:", data); 
        if (data) {
          setToDoList((prevList) => [...prevList, data]); 
          setNewEntry(''); // Reset the input field
          console.log('Todo created successfully:', data);
        } else {
          console.error('Failed to create todo:', data);
        }
      })
      .catch((err) => {
        console.error('Error creating todo:', err); 
      });
  }
  
  
  function mouseOver(index) {
    setEstado(index);
  }

  function mouseOut() {
    setEstado(false);
  }

  
  function onSubmit(e) {
    e.preventDefault(); 
    createTodo(); 
  }

  useEffect(() => {
    getTodos(); 
  }, []);

  return (
    <div className="container w-50 text-center">
      <h1 className="tittle text-center mt-5"><strong>To-do List!</strong></h1>
      <div className="container-flex">
        <form onSubmit={onSubmit}>
          <div className="container-flex border-bottom p-1">
            <input
              onChange={(e) => setNewEntry(e.target.value)} 
              value={newEntry}
              type="text"
              className="form-control lavenderBlush inputStyle"
              placeholder="New task"
            />
          </div>
        </form>
        <ul className="list-group mt-2 list-group">
          {todoList.length === 0 ? (
            <p className="text-center pt-3">There are no tasks for today</p>
          ) : (
            todoList.map((item, index) => (
              <li
                key={index}
                className="list list-group-item lavenderBlush d-flex justify-content-between align-items-center"
                onMouseOver={() => mouseOver(index)}
                onMouseOut={() => mouseOut()}
              >
                {item.label}
                {estate === index && (
                  <button
                    className="btn"
                    onClick={() => deleteElement(item.id)}  
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
        <div className="pending pt-3 ps-2 border-top">
          {ammountDutties} Pending tasks
        </div>
      </div>
      <div style={{ height: "3px", borderRadius: "3px" }} className="lavenderBlush border mx-1"></div>
      <div style={{ height: "3px", borderRadius: "3px" }} className="lavenderBlush border mx-2"></div>
      <button  onClick={getTodos}>Get todos</button>
      
    </div>
  );
};

export default Home;
