import React from 'react'

const AddTodoForm = () => {
    
   // const {register, errors, handleSubmit} = useForm();

    /*const onSubmit = (data, e) => {
        data.id = null
        console.log(data)
        props.addUser(data)
        e.target.reset();
    }*/

    return(
        <form>
            <label>Todo Text</label>
            <input type="text" name="name" value="" />
            <button>Add new Todo</button>
        </form>
    )

}

export default AddTodoForm; 