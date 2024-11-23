import React, {useEffect, useState,} from 'react';

const Home = () => {
  const[userData, setUserData] = useState ({});
  const [todo, setTodo] = useState('');
useEffect = (() =>{
createUser();
getUserData();
}, []);



  const createUser = () => {
   fetch ('https://playground.4geeks.com/todo/users/alexis',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'


    }


   })
   .then(respuesta=>{
    console.log('respuesta', respuesta);
    if(!respuesta.ok) throw new Error ('error creando usuario');
    return respuesta.json
   })
   .then (datos => console.log('ahora en datos', datos))
   .catch(error => console.log(error))
}

const getUserData = () => {
  fetch('https://playground.4geeks.com/todo/users/alexis')
  .then (respuesta =>{
    console.log('respuesta', respuesta);
    if(!respuesta.ok) throw new Error ('error pidiendo usruario');
  return respuesta.json()  
})
  .then (datos =>{
    console.log('getuserdata', datos)
    setUserData (datos)
  })
  .catch (error => console.log(error))
}

const createTask = () => {
  if (todo.trim().length == 0) return alert('task cant be empty')
    fetch('https://playground.4geeks.com/todo/todos/alexis',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
body: JSON.stringify({label:todo, done:false})

    })
    .then (respuesta =>{
      console.log('respuesta', respuesta)
      if(!respuesta.ok) throw new Error ('error pidiendo usuario');
      return respuesta.json ();
    })
      .then (datos =>{
        console.log('datos', datos);
        getUserData ();
        setTodo('');})
        .catch(error => console.log(error))}

        const handleSubmit = (e) =>{
          e.preventDefault ();
          createTask();

        }
        const handleDelete = (id) =>{
          console.log(id)
          fetch ('https://playground.4geeks.com/todos/todos/${+id}',{
            method:'DELETE',
            headers:{
              'Content-Type' : 'application/json'
            }
          })
          then((respuesta) => {
            console.log('respuesta', respuesta);
            if (!respuesta.ok) throw new Error('Error al eliminar la tarea');
            return respuesta.json(); 
          })
          .then(() => {
            console.log('Tarea eliminada correctamente');
            getUserData(); 
          })
          .catch((error) => console.log('Error en handleDelete:', error));
      };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <ul>
        {userData.todos?.length > 0
          ? userData.todos.map((tarea) => (
              <li key={tarea.id}>
                {tarea.label}
                <span onClick={() => handleDelete(tarea.id)}> x </span>
              </li>
            ))
          : 'No hay tareas'}
      </ul>
    </div>
  );
  


    }


export default Home;