package co.com.sofka.back.Repository;

import co.com.sofka.back.Model.Todo;
import org.springframework.data.repository.CrudRepository;

//Interfaz del Todo
public interface TodoRepository extends CrudRepository <Todo, Long>{
    /*Gracias a JPA, esta interfaz ya tiene funciones por defecto
    * que nos ayuda a que el desarrollo sea mas agil*/
}
