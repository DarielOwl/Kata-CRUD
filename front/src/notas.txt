import React, {
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";

//Esto es para establecer una //constante que indica donde esta //nuestro server
const HOST_API = "http://localhost:8080/api";

//Inicializamos como una array
const initialState = {
  list: [],
};

//Creamos la instancia de la lista
const Store = createContext(initialState);

//Otro componente que nos permite añadir los todo
const Form = () => {
  //Esto hace referencia al objeto cuando se crea
  //Identifica las propiedades de un componente en //especifico
  const formRef = useRef(null);

  const { dispatch } = useContext(Store);
  const { state, setState } = useState({});

  const onAdd = (event) => {
    event.preventDefault();

    //Hacemos una request al ingresar ek todo
    const request = {
      name: state.name,
      description: state.description,
      id: null,
      isComplete: false,
    };

    //Mandamos al backend (en formato json)
    fetch(HOST_API + "/Createtodo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };

  //Esto sirve para input de datos del todo
  return (
    <form ref={formRef}>
      <input
        type="text"
        name="name"
        onChange={(event) => {
          setState({ ...state, name: event.target.value });
        }}
      ></input>
      <button onClick={onAdd}>Agregar</button>
    </form>
  );
};

//Listar los todos
const List = () => {
  //Esto es un contexto (el contexto Store guarda el estado del objeto)
  const { dispatch, state } = useContext(Store);

  //El useEffect nos permite trabajar en
  //background (hace que no se tranque cuando se hace una peticion al backend)
  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list });
      });
  }, [state.list.length, dispatch]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>¿Esta Completado?</td>
          </tr>
        </thead>
        <tbody>
          {state.list.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.isCompleted}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

//Hacer el reduce
function reducer(state, action) {
  switch (action.type) {
    case "update-list":
      return { ...state, list: action.list };
    case "add-item":
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList };
    default:
      return state;
  }
}

//El Provider nos permite conectar diferentes componentes
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

//Vista del navegador (Esto vendria ser como la funcion Main)
function App() {
  return (
    <StoreProvider>
      <h3>To-Do List - By Dáriel</h3>
      <Form />
      <List />
    </StoreProvider>
  );
}

export default App;
