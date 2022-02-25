package co.com.sofka.back.Controller;


import co.com.sofka.back.Model.Todo;
import co.com.sofka.back.Services.TodoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//Controlador que sera intermediario entre el front y los servicios
@RestController
public class TodoController {

    @Autowired
    private TodoServices TDservices; //Creo la instancia del services

    //Mostrar todos los Todos que haya
    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return TDservices.findAll();
    }

    //Guardar el objeto en la BD
    @PostMapping(value = "api/todo")
    public Todo save(Todo todo){
        return TDservices.save(todo);
    }

    //Actualizar los datos, es igual al Post
    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo){

        if(todo.getId() != null)    //Si el objeto no es vacio, guarda!
            return TDservices.save(todo);

        throw new RuntimeException("No existe el ID para Actualizar!!!")
    }

    //Eliminar el objeto espeficicado por la ID
    @DeleteMapping("api/{id}/todo")
    public void delete(@PathVariable("id") Long id){
        TDservices.delete(id);
    }

    //Busca el objeto por su ID y retorna si lo encontro, sino lanza una excepcion
    @GetMapping(value = "api/{id}/todo")
    public Todo getTodo(@PathVariable("id") Long id){
        return TDservices.getTodo(id);
    }

}
