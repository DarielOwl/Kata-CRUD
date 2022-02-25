package co.com.sofka.back.Services;

import co.com.sofka.back.Model.Todo;
import co.com.sofka.back.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//Servicios que nos permitiran hacer las acciones para modificar los datos
//En la base de datos
@Service
public class TodoServices {

    @Autowired
    private TodoRepository TDrepository; //Creamos la instancia de la interfaz del todo

    //Mostrar todos los Todos que haya
    public Iterable<Todo> list(){
        return TDrepository.findAll();
    }

    //Guardar el objeto en la BD
    public Todo save(Todo todo){
        return TDrepository.save(todo);
    }

    //Eliminar el objeto espeficicado por la ID
    public void delete(Long id){
        TDrepository.delete(getTodo(id));
    }

    //Busca el objeto por su ID y retorna si lo encontro, sino lanza una excepcion
    public Todo getTodo(Long id){
        return TDrepository.findById(id).orElseThrow();
    }

}
