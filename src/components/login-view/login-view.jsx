import React from 'react';
import { useState } from 'react';


export const LoginView = ({onLoggedIn}) => { //onLoggedIn is a prop that will be passed from the MainView component
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => { //prevents default action to reload page
    event.preventDefault();

    const data = {
      Username: username, 
      Password: password 
    }
    fetch ('https://flixhive-cf7fbbd939d2.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json()) // JSON object will be used to extract the JWT token sent by API 
    .then((data) => {
        console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); 
        onLoggedIn(data.user, data.token); //onLoggedIn is a prop
      } else {
        alert('No such user');
      }
    })
      .catch((e) => {
        alert('Error logging in');
      })

  };

  return ( 
    //callback onSubmit tells the form to call the function handleSubmit when the form is submitted
    <form onSubmit= {handleSubmit}> 
      <label> 
        Username:
        <input 
        type="text" minLength="4"
        value= {username}
        onChange= {(e) => setUsername(e.target.value)} //updates the state of the username variable when the user types
        required
        />
      </label>
      <label>
        Password:
        <input 
        type="password" 
        value= {password}
        onChange= {(e) => setPassword(e.target.value)} 
        required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};