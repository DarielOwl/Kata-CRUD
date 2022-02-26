import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';

//Esto es para establecer una constante que indica donde esta nuestro Backend
const HOST_API = "http://localhost:8080/api";

//Inicializamos como una array la lista de todo
const initialState = {
  todo: { list: [], item: {} }
};

//Creamos la instancia de la lista
const Store = createContext(initialState)

//El formulario con todas las funciones del ToDo
const Form = () => {

  const formRef = useRef(null); //Esto hace referencia al objeto cuando se crea
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item); //Sirve para manejar el estado adentro del objeto

  //Funcion de Añadir todo
  const onAdd = (event) => {
    event.preventDefault();

    //Realiza una request
    const request = {
      name: state.name,
      id: null,
      completed: false
    };

    //Mandamos al backend a Guardar(en formato json)
    fetch(HOST_API + "/Createtodo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    }) //Esperamos la respuesta del json
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  //Funcion para editar el todo
  const onEdit = (event) => {
    event.preventDefault();

    //Realiza una request
    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };

    //Mandamos al backend a Actualizar
    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    }) //Esperamos la respuesta del json
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  //Esto sirve para input de datos del todo
  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="Has tus Quehaceres!"
      defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input>
    {item.id && <button onClick={onEdit}>Actualizar</button>}
    {!item.id && <button onClick={onAdd}>Crear</button>}
  </form>
}

//Listar los ToDo´s
const List = () => {
  const { dispatch, state: { todo } } = useContext(Store); //Esto es un contexto (el contexto Store guarda el estado del objeto)
  const currentList = todo.list; //Obtener la lista actual de todo

  //El useEffect nos permite trabajar en background 
  //(hace que no se tranque cuando se hace una peticion al backend)

  useEffect(() => { //Muestra todos los todo
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);

  const onDelete = (id) => { //Borra un todo con determinado ID
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => { //Edita un todo determinado
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked
    };
    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
      });
  };

  const decorationDone = { //Esto hara para darle decoracion a la tarea completada
    textDecoration: 'line-through'
  };
  return <div>
    <table >
      <thead>
        <tr>
          <td>ID</td>
          <td>Tarea</td>
          <td>¿Completado?</td>
        </tr>
      </thead>
      <tbody>
        {currentList.map((todo) => {
          return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
            <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
            <td><button onClick={() => onEdit(todo)}>Editar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}


//Selecciona que componente utilizar
function reducer(state, action) {
  switch (action.type) {
    case 'update-item': //Editar item todo de la lista
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem }
    case 'delete-item': //Eliminar item todo
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete }
    case 'update-list': //Actualizar la lista de todo
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList }
    case 'edit-item': //Editar item todo
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }
    case 'add-item': //Añadir un todo a la lista
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: {list: todoUp, item: {}} }
    default:
      return state;
  }
}

//El Provider nos permite conectar diferentes componentes
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}

//Vista del navegador (Esto vendria ser como la funcion Main)
function App() {
  return <StoreProvider>

    <div className="container">
      <h3>Lista de Quehaceres - Por Dáriel</h3>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Crea tus Lista de Quehaceres</h2>
          <Form />
        </div>
        <div className="flex-large">
          <h2>Lista de Quehaceres</h2>
          <List />
        </div>
      </div>
    </div>
  </StoreProvider>
}

export default App;