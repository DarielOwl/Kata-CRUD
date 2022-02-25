import React from 'react'

//Funcion Flecha que muestra los datos de los ToDO
const TodoTable = (props) => {

    //Adentro del return devuelve la tabla
    return(
        <table>
        
        <thead>
          <tr>
            <th>ID</th>
            <th>ToDO</th>
            <th>Completado</th>
          </tr>
        </thead>

        <tbody> 
            {
                props.todos.length > 0 ?
                props.todos.map(todo => (
                    <tr key={todo.id}>
                    <td>{todo.id}</td>    
                    <td>{todo.name}</td>
                    <td>{todo.completed}</td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={3}>No toDO</td>
                    </tr>
                )
            }
        </tbody>
      </table>
    );

}

export default TodoTable;