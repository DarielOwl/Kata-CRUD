import React, {useState} from 'react';
import TodoTable from './components/TodoTable';
import AddTodoForm from './components/AddTodoForm';

function App() {

  /*Datos de pruebas (se considera como una array de objetos) */
  const todoData = [
    { id: 1, name: 'Todo1', completed: 'no' },
    { id: 2, name: 'Todo2', completed: 'yes' },
    { id: 3, name: 'Todo3', completed: 'no' },
  ]

  //State (Me permite manejar el estado del array (todoData)) 
  const [todos, setTodo] = useState(todoData);

  //Agregar un todo (Añade uno mas al array)
  const addTodo = (todo) => {
    todo.id = todo.length + 1
    setTodo([...todos, todo])
  }

  //Vista del navegador
  return (
    
    <div className="container">
    <h1>Kata CRUD - By Dáriel de Sosa</h1>
    

    <div className="flex-row">
      
      <div className="flex-large">
        <h2>Add ToDO</h2>
        <AddTodoForm/> 
      </div>
      
      <div className="flex-large">
        <h2>View ToDO</h2>
        <TodoTable todos={todos}/> 
      </div>

    </div>
  </div>
  );

}

export default App;
