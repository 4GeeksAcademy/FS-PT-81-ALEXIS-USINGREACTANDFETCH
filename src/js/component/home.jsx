
import React, { useEffect, useState } from "react";


const Home = () => {
  const [username, setUsername] = useState(""); 
  const [responseMessage, setResponseMessage] = useState({ todos: [] });

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/user/alesanchezr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => {
        console.log("Respuesta:", respuesta);
        if (!respuesta.ok) throw new Error("Error creando usuario");
        return respuesta.json();
      })
      .then((datos) => console.log("Datos recibidos:", datos))
      .catch((error) => console.log("Error:", error));
  };

  const getUserData = () => {
    fetch("https://playground.4geeks.com/todo/alesanchezr")
      .then((respuesta) => {
        console.log("Usuario obtenido:", respuesta);
        if (!respuesta.ok) throw new Error("Error obteniendo usuario");
        return respuesta.json();
      })
      .then((datos) => setResponseMessage(datos)) 
      .catch((error) => console.log("Error:", error));
  };

  const createTask = () => {
    fetch("https://playground.4geeks.com/todo/user/alesanchezr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: "Prueba desde JS", done: false }),
    })
      .then((respuesta) => {
        console.log("Respuesta:", respuesta);
        if (!respuesta.ok) throw new Error("Error creando tarea");
        return respuesta.json();
      })
      .then((datos) => {
        console.log("Tarea creada:", datos);
        getUserData(); 
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => {
        console.log("Respuesta:", respuesta);
        if (!respuesta.ok) throw new Error("Error eliminando tarea");
        getUserData();
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  useEffect(() => {
    createUser(); 
    getUserData();
  }, []);

  return (
    <div className="text-center">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre del usuario"
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {responseMessage.todos && responseMessage.todos.length > 0 ? (
          responseMessage.todos.map((tarea, index) => (
            <li key={index}>
              {tarea.label}{" "}
              <span onClick={() => handleDelete(tarea.id)}>❌</span>
            </li>
          ))
        ) : (
          <li>No hay tareas</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
