import React, {useEffect, useState,} from 'react';

const Home = () => {
  const[userTask, setUserTask] = useState ({});
  const [todo, setTodo] = useState('');
useEffect(() =>{
 createUser()
 getUserTask()
 




}, []);



  const createUser = () => {
   fetch ('https://playground.4geeks.com/todo/users/alexisloorandrade23',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'


    },

    body: JSON.stringify({username:'alexisloorandrade23'}),

   })
   .then(respuesta=>{
    console.log('respuesta', respuesta);
    if(!respuesta.ok) throw new Error ('error creando usuario');
    return respuesta.json();
   })
   .then (datos => console.log('usuario creado', datos))
   .catch(error => console.log('error creando usuario', error));
}

const getUserTask = () => {
  fetch('https://playground.4geeks.com/todo/users/alexisloorandrade23')
  .then (respuesta =>{
    console.log('respuesta', respuesta);
    if(!respuesta.ok) throw new Error ('error pidiendo usruario');
  return respuesta.json();
})
  .then (datos =>{
    console.log('Datos del usuario', datos)
    setUserTask (datos)
  })
  .catch (error => console.log('error en tarea', error))
}

const createTask = () => {
  if (todo.trim().length == 0) return alert('task cant be empty')
    fetch('https://playground.4geeks.com/todo/todos/alexisloorandrade23',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
body: JSON.stringify({ label:todo, done:false }),

    })
    .then (respuesta =>{
      console.log('respuesta', respuesta)
      if(!respuesta.ok) throw new Error ('error pidiendo usuario');
      return respuesta.json();
    })
      .then (datos =>{
        console.log('datos', datos);
        getUserTask ();
        setTodo('');})
        .catch(error => console.log(error))}

        const handleSubmit = (e) =>{
          e.preventDefault ();
          createTask();
         
          

        }
        const handleDelete = (id) =>{
         
          fetch ('https://playground.4geeks.com/todo/todos/'+id,{
            method:'DELETE',
            headers:{
              'Content-Type' : 'application/json'
            }
          })
          .then((respuesta) => {
            console.log('respuesta', respuesta);
            if (!respuesta.ok) throw new Error('Error al eliminar la tarea');
            // return respuesta.json();
            getUserTask()
            
          })
          .catch((error) => console.log('Error en handleDelete:', error));
      };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <input className="" style={{width:"100px"}}
          type="text" style={{color:"black", backgroundColor:"#D3D3D3", fontWeight:"bold"}}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}

        />
       
      </form>
      <ul>
        {userTask.todos?.length > 0
          ? userTask.todos.map((tarea) => (
             <li key={tarea.id}>
  {tarea.label}
 <button style={{marginLeft:"30px", borderRadius:"40%", backgroundColor:"#00aae4"}} >
  <span onClick={() => handleDelete(tarea.id)}><i className="fa-solid fa-xmark" 
  style={{color:"white", fontSize:"15px"}} />
 
  </span></button>
</li>
            ))
          : 'No hay tareas'}
      </ul>
    </div>
  );
  


    }


export default Home;





