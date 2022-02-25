package co.com.sofka.back.Model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//En esta clase nos servira como entidad de la tabla
@Entity
public class Todo {

    //Utilizamos las anotaciones para que sea autoincrement
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private boolean isCompleted;

    //Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    //Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}
