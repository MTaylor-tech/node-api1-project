import React, {useState,useEffect} from 'react';
import Form from './components/Form.js';
import {Route} from 'react-router-dom';
import UserCard from './components/UserCard.js';
import styled from 'styled-components';
import axios from 'axios';


const AppDiv = styled.div`
  padding: 20px;
  text-align: center;

  h1, h2 {
    color: darkblue;
  }
`;

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    getUsers()
  },[]);

  const getUsers = () => {
    axios.get('http://localhost:4000/api/users')
      .then(res=>{
        console.log(res);
        setUsers(res.data)
      })
      .catch(err=>console.log(err))
  }

  const addUser = (user) => {
    let groupOfUsers = [];
    if (users.find(person=>person.id===user.id)) {
      axios.put(`http://localhost:4000/api/users/${user.id}`, user)
        .then(response=>{
          console.log(response);
          groupOfUsers = users.map(person=>{
            if (person.id===user.id) {
              return user;
            } else {
              return person;
            }
          });
          setUsers(groupOfUsers);
        })
        .catch(error=>console.log(error));
    } else {
      axios.post('http://localhost:4000/api/users', user)
        .then(response=>{
          console.log(response);
          groupOfUsers = [...users, user];
          setUsers(groupOfUsers);
        })
        .catch(error=>console.log(error));
    }
    getUsers()
    setIsEditing(false);
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:4000/api/users/${userId}`)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))

    getUsers()
    setIsEditing(false);
  }

  const newUser = () => {
    setIsEditing(false);
    setUserToEdit(null);
  }

  const editUser = (user) => {
    console.log(user);
    setUserToEdit(user);
    setIsEditing(true)
    getUsers()
  };

  return (
    <AppDiv>
      <h1>User System</h1>
      {isEditing?<Form addFunction={addUser} {...userToEdit} isEditing={isEditing} currentId={userToEdit.id} />:<Form addFunction={addUser} isEditing={isEditing} />}
      <button onClick={newUser}>Add New User (Reset Form)</button><br />
      {users.length>0?<h2>Users</h2>:<></>}
      {users.map(user=><UserCard user={user} key={user.id} editFunction={editUser} deleteFunction={deleteUser} />)}
    </AppDiv>
  );
}

export default App;
